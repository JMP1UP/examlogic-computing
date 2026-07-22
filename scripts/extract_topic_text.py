import os
import sys
from pypdf import PdfReader

def extract_text_from_pdfs(query_keywords, output_path, limit_pages=30):
    resources_dir = "resources"
    if not os.path.exists(resources_dir):
        print(f"Error: {resources_dir} directory not found.")
        return

    output_content = []
    
    # Scan all PDF files in the resources directory
    pdf_files = [f for f in os.listdir(resources_dir) if f.lower().endswith('.pdf')]
    if not pdf_files:
        print("No PDF files found in resources directory.")
        return

    print(f"Scanning {len(pdf_files)} PDF files for keywords: {query_keywords}...")

    total_extracted_pages = 0
    for file_name in pdf_files:
        file_path = os.path.join(resources_dir, file_name)
        try:
            reader = PdfReader(file_path)
            num_pages = len(reader.pages)
            print(f"Reading {file_name} ({num_pages} pages)...")
            
            for page_num in range(num_pages):
                page = reader.pages[page_num]
                text = page.extract_text()
                
                # Check if page contains any of the query keywords
                if any(kw.lower() in text.lower() for kw in query_keywords):
                    header = f"=== FILE: {file_name} | PAGE: {page_num + 1} ==="
                    output_content.append(header)
                    output_content.append(text)
                    output_content.append("\n" + "="*40 + "\n")
                    
                    total_extracted_pages += 1
                    if total_extracted_pages >= limit_pages:
                        print(f"Reached page extraction limit ({limit_pages}). Stopping search.")
                        break
            
            if total_extracted_pages >= limit_pages:
                break
        except Exception as e:
            print(f"Error reading {file_name}: {e}")

    # Write to output file
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("\n".join(output_content))

    print(f"Extracted {total_extracted_pages} relevant pages to {output_path}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python extract_topic_text.py <keyword1> <keyword2> ...")
        sys.exit(1)
    
    keywords = sys.argv[1:]
    output_file = os.path.join("scratch", "extracted_topic_content.txt")
    extract_text_from_pdfs(keywords, output_file)
