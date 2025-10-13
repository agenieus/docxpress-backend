from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pdf2docx import Converter
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
CORS(app, origins=[
    "http://localhost:3000", 
    "http://localhost:5173"
    ])

# Configuration
UPLOAD_FOLDER = 'temp_uploads'
ALLOWED_EXTENSIONS = {'pdf'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['MAX_CONTENT_LENGTH'] = 50 * 1024 * 1024  # 50MB max file size

# Create uploads directory if it doesn't exist
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
            'download': '/api/download/<filename> (GET)'
        }
    })

if __name__ == '__main__':
    logger.info("Starting PDF to Word conversion server...")
    logger.info("Server will run on: http://localhost:5000")
    logger.info("Make sure your React app points to this URL")
    app.run(debug=True, port=5000, host='0.0.0.0')