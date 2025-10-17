import fitz  # PyMuPDF
import os
import uuid
import logging
import time
from flask import Blueprint, request, jsonify, send_file
from werkzeug.utils import secure_filename

# Create blueprint for merge routes
merge_bp = Blueprint('merge', __name__)

# Configure logging
logger = logging.getLogger(__name__)

# Merge-specific configuration
MERGE_ALLOWED_EXTENSIONS = {'pdf'}
MERGE_UPLOAD_FOLDER = 'temp_merge_uploads'

# Create merge uploads directory
os.makedirs(MERGE_UPLOAD_FOLDER, exist_ok=True)

def allowed_merge_file(filename):
    """Check if file is allowed for merging"""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in MERGE_ALLOWED_EXTENSIONS

def merge_pdfs(pdf_paths, output_path):
    """
    Merge multiple PDFs into a single PDF using PyMuPDF
    """
    try:
        logger.info(f"Starting PDF merge: {len(pdf_paths)} files -> {output_path}")
        
        # Validate all input files exist
        for pdf_path in pdf_paths:
            if not os.path.exists(pdf_path):
                raise FileNotFoundError(f"PDF file not found: {pdf_path}")
        
        # Create a new PDF document
        merged_pdf = fitz.open()
        
        # Append each PDF to the merged document
        for pdf_path in pdf_paths:
            try:
                logger.info(f"Processing PDF: {pdf_path}")
                pdf_doc = fitz.open(pdf_path)
                merged_pdf.insert_pdf(pdf_doc)
                pdf_doc.close()
                logger.info(f"Successfully added: {os.path.basename(pdf_path)}")
            except Exception as e:
                logger.error(f"Error adding {pdf_path}: {str(e)}")
                # Clean up before raising error
                merged_pdf.close()
                raise Exception(f"Failed to process {os.path.basename(pdf_path)}: {str(e)}")
        
        # Save the merged PDF
        merged_pdf.save(output_path)
        merged_pdf.close()
        
        # Verify the output was created
        if not os.path.exists(output_path):
            raise Exception("Merge completed but output file was not created")
        
        output_size = os.path.getsize(output_path)
        logger.info(f"PDF merge successful! Output file size: {output_size} bytes")
        
        return True
        
    except Exception as e:
        logger.error(f"PDF merge error: {str(e)}")
        import traceback
        logger.error(traceback.format_exc())
        return False

@merge_bp.route('/api/merge-pdf', methods=['POST'])
def merge_pdf():
    """
    Handle PDF merging from React frontend
    """
    try:
        # Check if files are present
        if 'files' not in request.files:
            return jsonify({'error': 'No files provided'}), 400
        
        files = request.files.getlist('files')
        
        # Check if at least 2 files are selected
        if len(files) < 2:
            return jsonify({'error': 'Please select at least 2 PDF files to merge'}), 400
        
        # Check if too many files
        if len(files) > 20:
            return jsonify({'error': 'Maximum 20 PDF files allowed for merging'}), 400
        
        # Validate all files
        valid_files = []
        invalid_files = []
        
        for file in files:
            if file.filename == '':
                continue
            if not allowed_merge_file(file.filename):
                invalid_files.append(file.filename)
                continue
            valid_files.append(file)
        
        if invalid_files:
            return jsonify({'error': f'Only PDF files are allowed. Invalid files: {", ".join(invalid_files)}'}), 400
        
        if len(valid_files) < 2:
            return jsonify({'error': 'Please select at least 2 valid PDF files'}), 400
        
        # Generate unique filenames
        merge_id = str(uuid.uuid4())
        pdf_paths = []
        
        # Save uploaded PDFs
        for i, file in enumerate(valid_files):
            original_filename = secure_filename(file.filename)
            pdf_filename = f"{merge_id}_{i}_{original_filename}"
            pdf_path = os.path.join(MERGE_UPLOAD_FOLDER, pdf_filename)
            file.save(pdf_path)
            pdf_paths.append(pdf_path)
            logger.info(f"PDF saved for merging: {pdf_path}")
        
        # Generate output filename
        output_filename = f"{merge_id}_merged.pdf"
        output_path = os.path.join(MERGE_UPLOAD_FOLDER, output_filename)
        
        # Merge PDFs
        success = merge_pdfs(pdf_paths, output_path)
        
        # Clean up individual PDF files regardless of success/failure
        for pdf_path in pdf_paths:
            try:
                if os.path.exists(pdf_path):
                    os.remove(pdf_path)
                    logger.info(f"Cleaned up individual PDF: {pdf_path}")
            except Exception as e:
                logger.warning(f"Could not delete PDF {pdf_path}: {str(e)}")
        
        if not success:
            # Clean up output if merge failed
            try:
                if os.path.exists(output_path):
                    os.remove(output_path)
            except:
                pass
            return jsonify({'error': 'PDF merge failed. Please check if the PDFs are valid and not password protected.'}), 500
        
        # Check if output file was created
        if not os.path.exists(output_path):
            return jsonify({'error': 'Merge failed - no output file created'}), 500
        
        file_size = os.path.getsize(output_path)
        logger.info(f"Merged PDF created: {output_path} ({file_size} bytes)")
        
        # Run cleanup of old files
        cleanup_old_merge_files()
        
        # Return success response with download info
        return jsonify({
            'success': True,
            'message': f'Successfully merged {len(valid_files)} PDF files',
            'download_url': f'/api/download-merge/{output_filename}',
            'filename': output_filename,
            'original_name': 'merged_document.pdf',
            'files_merged': len(valid_files)
        })
        
    except Exception as e:
        logger.error(f"Server error during PDF merge: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@merge_bp.route('/api/download-merge/<filename>')
def download_merge_file(filename):
    """
    Serve merged PDF file for download and then delete it
    """
    try:
        file_path = os.path.join(MERGE_UPLOAD_FOLDER, filename)
        
        if not os.path.exists(file_path):
            logger.error(f"Merged file not found for download: {file_path}")
            return jsonify({'error': 'File not found. It may have expired or been deleted.'}), 404
        
        # Security check: ensure filename is safe
        if '..' in filename or filename.startswith('/'):
            return jsonify({'error': 'Invalid filename'}), 400
        
        logger.info(f"Serving merged file for download: {file_path}")
        
        # Send the file
        response = send_file(
            file_path,
            as_attachment=True,
            download_name='merged_document.pdf',
            mimetype='application/pdf'
        )
        
        # Delete the file after sending (but don't wait for it)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Cleaned up merged file after download: {file_path}")
        except Exception as e:
            logger.warning(f"Could not delete merged file after download {file_path}: {str(e)}")
        
        return response
        
    except Exception as e:
        logger.error(f"Download error for merged file: {str(e)}")
        return jsonify({'error': 'Download failed'}), 500

@merge_bp.route('/api/merge-health', methods=['GET'])
def merge_health_check():
    """Health check endpoint for merge service"""
    return jsonify({
        'status': 'healthy', 
        'service': 'PDF Merge Service',
        'upload_folder': MERGE_UPLOAD_FOLDER,
        'max_files': 20
    })

def cleanup_old_merge_files(max_age_minutes=30):
    """
    Clean up old merge files
    """
    try:
        current_time = time.time()
        cleaned_count = 0
        
        for filename in os.listdir(MERGE_UPLOAD_FOLDER):
            file_path = os.path.join(MERGE_UPLOAD_FOLDER, filename)
            if os.path.isfile(file_path):
                file_age = current_time - os.path.getctime(file_path)
                if file_age > max_age_minutes * 60:
                    try:
                        os.remove(file_path)
                        cleaned_count += 1
                        logger.info(f"Cleaned up old merge file: {filename}")
                    except Exception as e:
                        logger.warning(f"Failed to clean up merge file {filename}: {str(e)}")
        
        if cleaned_count > 0:
            logger.info(f"Merge cleanup completed: {cleaned_count} files removed")
        
    except Exception as e:
        logger.error(f"Error during merge cleanup: {str(e)}")

# Scheduled cleanup function (you can call this periodically)
def init_merge_cleanup():
    """Initialize merge cleanup on startup"""
    logger.info("Initializing merge PDF cleanup...")
    cleanup_old_merge_files()