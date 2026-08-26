#!/usr/bin/env python3
"""
Auto-Thumbnail Generator for High-CTR YouTube Videos & Shorts.
Generates 1280x720 (Landscape) and 1080x1920 (Portrait) high-contrast thumbnails
with bold typography, neon glows, and gradient backgrounds.
"""

import os
import sys
import random
from PIL import Image, ImageDraw, ImageFont, ImageFilter

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

TEMP_DIR = "output/thumbnails"
os.makedirs(TEMP_DIR, exist_ok=True)

def create_high_ctr_thumbnail(title_text: str, is_portrait=False, bg_image_path=None, output_path=None) -> str:
    """Generates a viral YouTube thumbnail."""
    width, height = (1080, 1920) if is_portrait else (1280, 720)
    
    if bg_image_path and os.path.exists(bg_image_path):
        bg = Image.open(bg_image_path).convert("RGB")
        bg = bg.resize((width, height), Image.Resampling.LANCZOS)
        # Apply dark vignette overlay
        overlay = Image.new("RGBA", (width, height), (11, 19, 21, 140))
        bg.paste(overlay, (0, 0), overlay)
    else:
        # Create dark gradient background
        bg = Image.new("RGB", (width, height), color="#080E10")
        draw_grad = ImageDraw.Draw(bg)
        for y in range(height):
            r = int(10 + (y / height) * 20)
            g = int(20 + (y / height) * 35)
            b = int(25 + (y / height) * 45)
            draw_grad.line([(0, y), (width, y)], fill=(r, g, b))

    draw = ImageDraw.Draw(bg)

    # Ambient neon glow in center
    cx, cy = width // 2, height // 2
    for r in range(250, 0, -20):
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=(13, 148, 136, int(20 * (1 - r/250))))

    # Font setup
    try:
        font_size = 64 if not is_portrait else 80
        font = ImageFont.truetype("arialbd.ttf", font_size)
    except Exception:
        try:
            font = ImageFont.truetype("arial.ttf", 60)
        except Exception:
            font = ImageFont.load_default()

    # Split text into 2-3 punchy lines
    words = title_text.upper().replace("#SHORTS", "").strip().split()
    mid = len(words) // 2
    line1 = " ".join(words[:mid]) if mid > 0 else title_text.upper()
    line2 = " ".join(words[mid:]) if mid > 0 else ""

    # Box coordinates
    if is_portrait:
        box_y = 600
        # Line 1 Banner
        draw.rectangle([80, box_y, width - 80, box_y + 110], fill="#0F172A")
        draw.rectangle([75, box_y - 5, width - 75, box_y + 115], outline="#38BDF8", width=4)
        draw.text((width // 2, box_y + 55), line1, fill="#F8FAFC", font=font, anchor="mm")

        # Line 2 Banner (Yellow / Red accent)
        if line2:
            draw.rectangle([80, box_y + 140, width - 80, box_y + 250], fill="#E11D48")
            draw.text((width // 2, box_y + 195), line2, fill="#FFFFFF", font=font, anchor="mm")
    else:
        box_y = 260
        # Landscape Banner
        draw.rectangle([100, box_y, width - 100, box_y + 100], fill="#0F172A")
        draw.rectangle([95, box_y - 5, width - 95, box_y + 105], outline="#2DD4BF", width=4)
        draw.text((width // 2, box_y + 50), line1, fill="#FFFFFF", font=font, anchor="mm")

        if line2:
            draw.rectangle([100, box_y + 120, width - 100, box_y + 220], fill="#D97706")
            draw.text((width // 2, box_y + 170), line2, fill="#FFFFFF", font=font, anchor="mm")

    if not output_path:
        output_path = os.path.join(TEMP_DIR, f"thumb_{int(random.random()*10000)}.jpg")

    bg.save(output_path, "JPEG", quality=95)
    print(f">> High-CTR Thumbnail Generated: {output_path}", file=sys.stderr)
    return output_path

if __name__ == "__main__":
    out = create_high_ctr_thumbnail("THE SECRET AI EMPIRE 2026", is_portrait=False)
    print("Created thumbnail:", out)
