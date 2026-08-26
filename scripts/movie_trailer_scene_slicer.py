#!/usr/bin/env python3
"""
Direct Movie Trailer & Real Scene Slicer.
Downloads official HD movie trailer / teaser clips, chops them into
3-4 second rapid cuts, and applies anti-copyright fair-use filters:
- Horizontal mirror flip (hflip)
- 12% Center Zoom/Crop (removes logos/watermarks)
- Cinematic Color Grade
- 100% Original Audio Stripped & Replaced by Hindi Voiceover
"""

import os
import sys
import re
import subprocess
import yt_dlp

TEMP_DIR = "output/movie_trailer_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

def download_and_slice_movie_trailer(movie_title: str, max_duration=120) -> list:
    """
    Finds the official HD movie trailer on YouTube and slices it into 3-4s anti-copyright clips.
    """
    clean_title = re.sub(r'\(.*?\)|\[.*?\]|Explained.*|Hindi.*|Urdu.*|Movie.*', '', movie_title, flags=re.IGNORECASE).strip()
    if not clean_title:
        clean_title = movie_title.split("|")[0].split("-")[0].strip()

    search_term = f"ytsearch1:{clean_title} official trailer hd"
    print(f">> Trailer Slicer: Searching & downloading official trailer for '{clean_title}'...", file=sys.stderr)

    raw_trailer = os.path.join(TEMP_DIR, "raw_trailer.mp4")
    if os.path.exists(raw_trailer):
        try:
            os.remove(raw_trailer)
        except Exception:
            pass

    ydl_opts = {
        'format': 'bestvideo[height<=720][ext=mp4]+bestaudio[ext=m4a]/best[height<=720][ext=mp4]/best',
        'outtmpl': raw_trailer,
        'quiet': True,
        'no_warnings': True,
        'noplaylist': True
    }

    try:
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([search_term])
    except Exception as e:
        print(f"  -> Trailer search notice: {e}", file=sys.stderr)
        return []

    if not os.path.exists(raw_trailer) or os.path.getsize(raw_trailer) < 100000:
        print(f"  -> Trailer file not downloaded or empty.", file=sys.stderr)
        return []

    # Get trailer duration
    cmd_dur = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", raw_trailer]
    res = subprocess.run(cmd_dur, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    try:
        t_dur = float(res.stdout.strip())
    except Exception:
        t_dur = 60.0

    print(f">> Trailer downloaded ({t_dur:.1f}s). Slicing into anti-copyright scene clips...", file=sys.stderr)

    # Slice into 3.5s segments with anti-copyright transforms
    clip_paths = []
    seg_length = 3.5
    num_segs = min(20, int(t_dur // seg_length))

    for i in range(num_segs):
        start_t = i * seg_length
        out_clip = os.path.join(TEMP_DIR, f"real_scene_{i}.mp4")

        # Anti-copyright filter chain: hflip + crop + color grade
        filter_str = (
            "scale=1920:1080:force_original_aspect_ratio=increase,"
            "crop=1920:1080,"
            "hflip,"
            "crop=in_w*0.90:in_h*0.90,"
            "scale=1920:1080,"
            "eq=saturation=1.12:contrast=1.04:brightness=0.01,"
            "fps=30"
        )

        cmd_slice = [
            "ffmpeg", "-y",
            "-ss", str(start_t),
            "-i", raw_trailer,
            "-t", str(seg_length),
            "-vf", filter_str,
            "-an",
            "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p",
            out_clip
        ]

        try:
            subprocess.run(cmd_slice, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
            if os.path.exists(out_clip) and os.path.getsize(out_clip) > 10000:
                clip_paths.append(out_clip)
        except Exception:
            pass

    print(f">> Extracted {len(clip_paths)} Authentic Anti-Copyright Movie Scene Clips!", file=sys.stderr)
    return clip_paths

if __name__ == "__main__":
    clips = download_and_slice_movie_trailer("The Dictator 2012")
    print(f"Generated {len(clips)} movie scene clips:")
    for c in clips:
        print(" -", c)
