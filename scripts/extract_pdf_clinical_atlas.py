import fitz
import os
from PIL import Image
import io

pdf_path = r"C:\Users\fsayyed\.gemini\antigravity\brain\25062032-1d87-46cd-bb00-6cd5cf334320\.user_uploaded\media_1787639238891.pdf"
output_dir = r"d:\OneDrive - INDIA HIV AIDS ALLIANCE\Desktop\STI Magazine\public\images\clinical"
os.makedirs(output_dir, exist_ok=True)

doc = fitz.open(pdf_path)
print(f"Total Pages in PDF: {len(doc)}")

extracted_count = 0
for i, page in enumerate(doc):
    image_list = page.get_images(full=True)
    print(f"\n--- Page {i+1} ({len(image_list)} images) ---")
    for img_idx, img in enumerate(image_list):
        xref = img[0]
        base_image = doc.extract_image(xref)
        image_bytes = base_image["image"]
        image_ext = base_image["ext"]
        width = base_image["width"]
        height = base_image["height"]
        
        # Open with PIL
        pil_img = Image.open(io.BytesIO(image_bytes))
        
        # Save raw extracted image
        raw_name = f"page_{i+1:02d}_img_{img_idx+1}_{width}x{height}.{image_ext}"
        print(f"  Found image: {raw_name} ({width}x{height})")
        
        # If it's a substantive clinical photo (skip tiny logos/icons < 80px)
        if width >= 100 and height >= 100:
            webp_name = f"extracted_p{i+1:02d}_{img_idx+1}.webp"
            webp_path = os.path.join(output_dir, webp_name)
            pil_img.convert("RGB").save(webp_path, "WEBP", quality=90)
            print(f"    Saved: {webp_name}")
            extracted_count += 1

print(f"\nTotal extracted clinical images: {extracted_count}")
