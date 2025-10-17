from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pdf2docx import Converter
import fitz  # PyMuPDF for PDF merging
import os
import uuid
from werkzeug.utils import secure_filename
import logging
import time

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Configure CORS to allow requests from your React app
CORS(app, origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173", "https://docxpress.co", "https://www.docxpress.co"])

# Configuration for PDF to Word conversion
UPLOAD_FOLDER = 'temp_uploads'
ALLOWED_EXTENSIONS = {'pdf'}

# Configuration for PDF merging
MERGE_UPLOAD_FOLDER = 'temp_merge_uploads'
MERGE_ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 100 * 1024 * 1024  # 100MB max file size

# Create uploads directories if they don't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(MERGE_UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def allowed_merge_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in MERGE_ALLOWED_EXTENSIONS

# ========== EXISTING PDF TO WORD CONVERSION FUNCTIONS (UNCHANGED) ==========

def convert_pdf_to_docx(pdf_path, docx_path):
    """
    Convert PDF to DOCX using pdf2docx - this is your working code!
    """
    try:
        logger.info(f"Starting conversion: {pdf_path} -> {docx_path}")
        
        # This is exactly your working code!
        converter = Converter(pdf_file=pdf_path)
        converter.convert(docx_file=docx_path)
        converter.close()
        
        logger.info("Conversion completed successfully!")
        return True
        
    except Exception as e:
        logger.error(f"Conversion error: {str(e)}")
        return False

def cleanup_old_files(max_age_minutes=60):
    """
    Clean up files older than max_age_minutes
    """
    try:
        current_time = time.time()
        for filename in os.listdir(app.config['UPLOAD_FOLDER']):
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            if os.path.isfile(file_path):
                # Check if file is older than max_age_minutes
                if current_time - os.path.getctime(file_path) > max_age_minutes * 60:
                    os.remove(file_path)
                    logger.info(f"Cleaned up old file: {filename}")
    except Exception as e:
        logger.warning(f"Error during cleanup: {str(e)}")

@app.route('/api/convert', methods=['POST'])
def convert_pdf():
    """
    Handle PDF to Word conversion from React frontend
    """
    try:
        # Check if file is present
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
        
        file = request.files['file']
        
        # Check if file is selected
        if file.filename == '':
            return jsonify({'error': 'No file selected'}), 400
        
        # Check if file is PDF
        if not allowed_file(file.filename):
            return jsonify({'error': 'Only PDF files are allowed'}), 400
        
        # Generate unique filenames
        file_id = str(uuid.uuid4())
        original_filename = secure_filename(file.filename)
        pdf_filename = f"{file_id}_{original_filename}"
        docx_filename = f"{file_id}_{original_filename.replace('.pdf', '.docx')}"
        
        pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_filename)
        docx_path = os.path.join(app.config['UPLOAD_FOLDER'], docx_filename)
        
        # Save uploaded PDF
        file.save(pdf_path)
        logger.info(f"PDF saved: {pdf_path}")
        
        # Convert PDF to DOCX using your working method
        success = convert_pdf_to_docx(pdf_path, docx_path)
        
        # Delete the original PDF file immediately (we don't need it anymore)
        try:
            if os.path.exists(pdf_path):
                os.remove(pdf_path)
                logger.info(f"Cleaned up PDF: {pdf_path}")
        except Exception as e:
            logger.warning(f"Could not delete PDF {pdf_path}: {str(e)}")
        
        if not success:
            # Clean up DOCX if conversion failed
            try:
                if os.path.exists(docx_path):
                    os.remove(docx_path)
            except:
                pass
            return jsonify({'error': 'Conversion failed. Please check if the PDF is valid.'}), 500
        
        # Check if output file was created
        if not os.path.exists(docx_path):
            return jsonify({'error': 'Conversion failed - no output file created'}), 500
        
        file_size = os.path.getsize(docx_path)
        logger.info(f"DOCX file created: {docx_path} ({file_size} bytes)")
        
        # Run cleanup of old files
        cleanup_old_files()
        
        # Return success response with download info
        return jsonify({
            'success': True,
            'message': 'Conversion completed successfully',
            'download_url': f'/api/download/{docx_filename}',
            'filename': docx_filename,
            'original_name': original_filename.replace('.pdf', '.docx')
        })
        
    except Exception as e:
        logger.error(f"Server error during conversion: {str(e)}")
        return jsonify({'error': f'Internal server error: {str(e)}'}), 500

@app.route('/api/download/<filename>')
def download_file(filename):
    """
    Serve converted file for download and then delete it
    """
    try:
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        if not os.path.exists(file_path):
            logger.error(f"File not found for download: {file_path}")
            return jsonify({'error': 'File not found. It may have expired or been deleted.'}), 404
        
        # Get original filename for download
        original_name = filename.split('_', 1)[1] if '_' in filename else filename
        
        logger.info(f"Serving file for download: {file_path}")
        
        # Send the file
        response = send_file(
            file_path,
            as_attachment=True,
            download_name=original_name,
            mimetype='application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        )
        
        # Delete the file after sending (but don't wait for it)
        try:
            if os.path.exists(file_path):
                os.remove(file_path)
                logger.info(f"Cleaned up after download: {file_path}")
        except Exception as e:
            logger.warning(f"Could not delete file after download {file_path}: {str(e)}")
        
        return response
        
    except Exception as e:
        logger.error(f"Download error: {str(e)}")
        return jsonify({'error': 'Download failed'}), 500

# ========== NEW PDF MERGING FUNCTIONALITY ==========

def merge_pdfs(pdf_paths, output_path):
    """
    Merge multiple PDFs into a single PDF using PyMuPDF
    """
    try:
        logger.info(f"Starting PDF merge: {len(pdf_paths)} files -> {output_path}")
        
        # Create a new PDF document
        merged_pdf = fitz.open()
        
        # Append each PDF to the merged document
        for pdf_path in pdf_paths:
            try:
                pdf_doc = fitz.open(pdf_path)
                merged_pdf.insert_pdf(pdf_doc)
                pdf_doc.close()
                logger.info(f"Successfully added: {pdf_path}")
            except Exception as e:
                logger.error(f"Error adding {pdf_path}: {str(e)}")
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

@app.route('/api/merge-pdf', methods=['POST'])
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
        for file in files:
            if file.filename == '':
                continue
            if not allowed_merge_file(file.filename):
                return jsonify({'error': f'Only PDF files are allowed. Invalid file: {file.filename}'}), 400
            valid_files.append(file)
        
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
            return jsonify({'error': 'PDF merge failed. Please check if the PDFs are valid.'}), 500
        
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

@app.route('/api/download-merge/<filename>')
def download_merge_file(filename):
    """
    Serve merged PDF file for download and then delete it
    """
    try:
        file_path = os.path.join(MERGE_UPLOAD_FOLDER, filename)
        
        if not os.path.exists(file_path):
            logger.error(f"Merged file not found for download: {file_path}")
            return jsonify({'error': 'File not found. It may have expired or been deleted.'}), 404
        
        logger.info(f"Serving merged file for download: {file_path}")
        
        # Send the file
        response = send_file(
            file_path,
            as_attachment=True,
            download_name='merged_document.pdf',
            mimetype='application/pdf'
        )
        
        # Delete the file after sending
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

@app.route('/api/merge-health', methods=['GET'])
def merge_health_check():
    """Health check endpoint for merge service"""
    return jsonify({
        'status': 'healthy', 
        'service': 'PDF Merge Service',
        'upload_folder': MERGE_UPLOAD_FOLDER,
        'max_files': 20
    })

# ========== EXISTING HEALTH AND HOME ROUTES (UPDATED WITH MERGE INFO) ==========

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'PDF to Word Converter'})

@app.route('/')
def home():
    """Simple home page to verify server is running"""
    return jsonify({
        'message': 'PDF to Word Converter API is running!',
        'endpoints': {
            'health': '/api/health',
            'convert': '/api/convert (POST)',
            'download': '/api/download/<filename> (GET)',
            'merge_pdf': '/api/merge-pdf (POST)',
            'download_merge': '/api/download-merge/<filename> (GET)',
            'merge_health': '/api/merge-health (GET)'
        }
    })

if __name__ == '__main__':
    logger.info("Starting PDF to Word conversion server...")
    logger.info("PDF Merge service is also available")
    logger.info("Server will run on: http://localhost:5000")
    logger.info("Make sure your React app points to this URL")
    app.run(debug=True, port=5000, host='0.0.0.0')