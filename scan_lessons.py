import fitz
import easyocr
import json
import os

pdf_path = r"D:\Antigravity\EZHSK\[hanka.edu.vn] - GT Hán Ngữ 1 (Tập 1 - Quyển thượng) (1).pdf"

def extract_and_ocr(start_page, end_page):
    doc = fitz.open(pdf_path)
    reader = easyocr.Reader(['ch_sim', 'en'], verbose=False)
    
    all_results = {}
    
    for page_num in range(start_page, min(end_page, len(doc))):
        print(f"Processing page {page_num+1}...")
        page = doc.load_page(page_num)
        pix = page.get_pixmap()
        img_path = f"temp_page_{page_num+1}.png"
        pix.save(img_path)
        
        results = reader.readtext(img_path)
        all_results[page_num+1] = [{"text": text, "confidence": float(prob)} for (_, text, prob) in results]
        
        os.remove(img_path)
        
    return all_results

if __name__ == "__main__":
    # Scan pages 30-45 (likely where Lesson 1-3 content is)
    results = extract_and_ocr(30, 45)
    with open("ocr_results_30_45.json", "w", encoding="utf-8") as f:
        json.dump(results, f, ensure_ascii=False, indent=2)
    print("OCR for pages 30-45 complete.")
