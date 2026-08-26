#!/usr/bin/env python3
"""
Movie Web Scene & High-Resolution Still Scraper.
Searches the web for official movie stills, press photos, and HD scene captures
for any movie title, and animates them with Ken Burns dynamic camera motion.
"""

import os
import sys
import json
import time
import re
import urllib.parse
import requests
import subprocess
from PIL import Image

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

TEMP_SCENES_DIR = "output/movie_scenes_temp"
os.makedirs(TEMP_SCENES_DIR, exist_ok=True)

def scrape_movie_stills_from_web(movie_title: str, max_images=12) -> list:
    """
    Searches Bing Images / Public Media for HD movie scene stills.
    Downloads clean 1080p stills of the actual movie characters and key moments.
    """
    print(f">> Web Scraper: Searching for official HD movie scenes for '{movie_title}'...", file=sys.stderr)
    clean_title = re.sub(r'\(.*?\)|\[.*?\]|Explained.*|Hindi.*|Urdu.*|Movie.*', '', movie_title, flags=re.IGNORECASE).strip()
    if not clean_title:
        clean_title = movie_title.split("|")[0].split("-")[0].strip()

    search_query = f"{clean_title} movie scenes stills HD"
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8"
    }

    downloaded_images = []

    try:
        # Query Bing Images endpoint
        bing_url = f"https://www.bing.com/images/search?q={urllib.parse.quote(search_query)}&form=HDRSC2&first=1"
        res = requests.get(bing_url, headers=headers, timeout=15)
        if res.status_code == 200:
            # Extract image URLs from murl attributes in HTML
            matches = re.findall(r'murl&quot;:&quot;(https?://[^&]+)&quot;', res.text)
            print(f"  -> Found {len(matches)} potential movie scene URLs on the web.", file=sys.stderr)

            for img_url in matches:
                if len(downloaded_images) >= max_images:
                    break
                if any(bad in img_url.lower() for bad in ["logo", "icon", "banner", "clipart", "vector"]):
                    continue

                try:
                    img_res = requests.get(img_url, headers=headers, timeout=10, stream=True)
                    if img_res.status_code == 200:
                        img_ext = "jpg" if ".png" not in img_url else "png"
                        save_path = os.path.join(TEMP_SCENES_DIR, f"scene_{len(downloaded_images)}_{int(time.time())}.{img_ext}")
                        with open(save_path, "wb") as f:
                            for chunk in img_res.iter_content(chunk_size=64*1024):
                                if chunk:
                                    f.write(chunk)

                        # Verify image integrity and dimensions
                        with Image.open(save_path) as im:
                            w, h = im.size
                            if w >= 600 and h >= 350:
                                downloaded_images.append(save_path)
                                print(f"  [✓] Scraped Movie Scene: {w}x{h} ({clean_title})", file=sys.stderr)
                            else:
                                os.remove(save_path)
                except Exception:
                    pass
    except Exception as e:
        print(f"  -> Web scraper notice: {e}", file=sys.stderr)

    return downloaded_images

def convert_still_to_cinematic_motion_clip(image_path: str, duration_sec=5, out_clip=None) -> str:
    """
    Applies Ken Burns zoom and cinematic anti-copyright color grading
    to turn a static movie photo into an active cinematic video clip.
    """
    if not out_clip:
        out_clip = os.path.splitext(image_path)[0] + "_motion.mp4"

    # Ken Burns subtle slow pan and zoom + cinematic color grade
    zoom_effects = [
        "scale=2000:1125,zoompan=z='min(zoom+0.0012,1.08)':d=150:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1920x1080,fps=30",
        "scale=2000:1125,zoompan=z='min(zoom+0.0010,1.06)':d=150:x='0':y='0':s=1920x1080,fps=30",
        "scale=2000:1125,zoompan=z='min(zoom+0.0014,1.10)':d=150:x='iw-(iw/zoom)':y='ih-(ih/zoom)':s=1920x1080,fps=30"
    ]
    import random
    filter_chain = f"{random.choice(zoom_effects)},eq=saturation=1.15:contrast=1.05"

    cmd = [
        "ffmpeg", "-y",
        "-loop", "1", "-i", image_path,
        "-t", str(duration_sec),
        "-vf", filter_chain,
        "-an",
        "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
        out_clip
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return out_clip

if __name__ == "__main__":
    test_movie = "The Dictator 2012"
    images = scrape_movie_stills_from_web(test_movie, max_images=5)
    print(f"\nScraped {len(images)} scenes successfully:")
    for img in images:
        motion_clip = convert_still_to_cinematic_motion_clip(img)
        print("  -> Converted to Motion Clip:", motion_clip)
