from pdf2docx import Converter


pdf_file = 'BENEDICT UDEH.pdf'

output_file = 'output_BENEDICT UDEH.docx'

converter = Converter(pdf_file=pdf_file)
converter.convert(output_file)
converter.close()