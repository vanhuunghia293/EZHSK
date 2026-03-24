import json
import re

def clean_ocr_text(text):
    # Basic cleanup for common OCR errors in HSK textbooks
    text = text.replace("Thamh dieu", "Thanh điệu")
    text = text.replace("Tu moi", "Từ mới")
    text = text.replace("Chu thich", "Chú thích")
    # Fix Pinyin tones if possible (manual rules or heuristic)
    return text

def parse_vocabulary(ocr_blocks):
    vocab = []
    current_item = {}
    
    # Heuristic: Vocabulary items often start with a number like "1. ", "2. "
    # or have a Chinese character followed by pinyin and meaning.
    
    for block in ocr_blocks:
        text = block['text'].strip()
        
        # Look for "Number. Hanzi" pattern
        match = re.match(r"(\d+)[。.\s]+([\u4e00-\u9fa5]+)", text)
        if match:
            if current_item: vocab.append(current_item)
            current_item = {
                "id": f"v_{match.group(1)}",
                "hanzi": match.group(2),
                "pinyin": "",
                "type": "",
                "meaning": ""
            }
            continue
        
        # If we have a current item, look for pinyin/meaning in subsequent blocks
        if current_item:
            # Simple heuristic for pinyin (contains latin characters, often in parentheses or after hanzi)
            if not current_item["pinyin"] and re.search(r"[a-záàảãạéèẻẽẹíìỉĩịóòỏõọôốồổỗộơớờởỡợúùủũụưứừửữựýỳỷỹỵ]", text.lower()):
                current_item["pinyin"] = text
            elif not current_item["meaning"]:
                current_item["meaning"] = text
                
    if current_item: vocab.append(current_item)
    return vocab

# Load OCR results
def process_ocr_to_data(ocr_file, output_file):
    with open(ocr_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    lessons = []
    for page, blocks in data.items():
        # Check if page contains "第一课" or similar to start a new lesson
        # For now, let's just extract all vocab found
        vocab = parse_vocabulary(blocks)
        if vocab:
            lessons.append({
                "page": page,
                "vocabulary": vocab
            })
            
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(lessons, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # Test with focused results
    process_ocr_to_data("ocr_focused_38_40.json", "parsed_vocab_test.json")
    print("Parsing test complete. Check parsed_vocab_test.json")
