#!/usr/bin/env python3
"""
Professional Cinematic YouTube Shorts Generator & Uploader.
Uses Real Pexels 4K/HD Video Footage + Neural Studio TTS + Styled Animated Captions + FFmpeg Engine.
"""

import os
import sys
import json
import time
import asyncio
import requests
import subprocess
from datetime import datetime

# Configure UTF-8 encoding for Windows console
if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

import edge_tts
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

def load_env():
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

load_env()

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "3TogwWmYgyzfA4miPBy1m2qRjSwMIpYLvT0lUi8K4lQdHnebUjNdv7Ns")
CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN")

TEMP_DIR = "output/render_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

# 1. Studio Quality Voiceover Generation
async def generate_voiceover(script_text: str, output_audio_path: str):
    print(">> Generating Neural Voiceover with Edge TTS...", file=sys.stderr)
    voice = "en-US-ChristopherNeural"
    communicate = edge_tts.Communicate(script_text, voice=voice, rate="+5%", pitch="+0Hz")
    await communicate.save(output_audio_path)
    print(f">> Voiceover saved: {output_audio_path}", file=sys.stderr)

def get_audio_duration(audio_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

# 2. Real HD B-Roll Video Downloader from Pexels
def download_pexels_broll(queries: list, target_count=4) -> list:
    print(">> Fetching Real HD Video Footage from Pexels...", file=sys.stderr)
    headers = {"Authorization": PEXELS_API_KEY}
    downloaded_clips = []

    for i, q in enumerate(queries):
        if len(downloaded_clips) >= target_count:
            break
        try:
            url = f"https://api.pexels.com/videos/search?query={q}&orientation=portrait&per_page=3"
            r = requests.get(url, headers=headers, timeout=15)
            data = r.json()
            videos = data.get("videos", [])
            if not videos:
                continue

            best_file = None
            for vf in videos[0].get("video_files", []):
                if vf.get("width", 0) >= 720 or vf.get("quality") == "hd":
                    best_file = vf.get("link")
                    break
            if not best_file and videos[0].get("video_files"):
                best_file = videos[0]["video_files"][0]["link"]

            if best_file:
                clip_path = os.path.join(TEMP_DIR, f"clip_{i}.mp4")
                print(f"  -> Downloading footage for '{q}'...", file=sys.stderr)
                v_res = requests.get(best_file, stream=True, timeout=30)
                with open(clip_path, "wb") as f:
                    for chunk in v_res.iter_content(chunk_size=1024*1024):
                        if chunk:
                            f.write(chunk)
                downloaded_clips.append(clip_path)
        except Exception as e:
            print(f"  -> Error fetching clip for '{q}': {e}", file=sys.stderr)

    return downloaded_clips

# 3. Create Styled Subtitles / Captions (.srt)
def generate_srt_captions(script_text: str, total_duration: float, srt_path: str):
    words = script_text.split()
    chunk_size = 4
    chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    
    time_per_chunk = total_duration / len(chunks)
    
    with open(srt_path, "w", encoding="utf-8") as f:
        for idx, chunk in enumerate(chunks):
            start_sec = idx * time_per_chunk
            end_sec = (idx + 1) * time_per_chunk
            
            start_ts = format_srt_time(start_sec)
            end_ts = format_srt_time(end_sec)
            
            f.write(f"{idx + 1}\n")
            f.write(f"{start_ts} --> {end_ts}\n")
            f.write(f"{chunk.upper()}\n\n")

def format_srt_time(seconds: float) -> str:
    hrs = int(seconds // 3600)
    mins = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hrs:02d}:{mins:02d}:{secs:02d},{millis:03d}"

# 4. Cinematic Composition with FFmpeg
def render_cinematic_short(clip_paths: list, voiceover_path: str, srt_path: str, output_path: str):
    print(">> Compiling Cinematic 9:16 Video with FFmpeg...", file=sys.stderr)
    duration = get_audio_duration(voiceover_path)
    
    # 1. Normalize and scale each clip to 1080x1920 @ 30fps
    norm_clips = []
    clip_duration = (duration / len(clip_paths)) + 0.5
    for i, clip in enumerate(clip_paths):
        norm_path = os.path.join(TEMP_DIR, f"norm_{i}.mp4")
        cmd = [
            "ffmpeg", "-y", "-i", clip,
            "-t", str(clip_duration),
            "-vf", "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30",
            "-an", "-c:v", "libx264", "-pix_fmt", "yuv420p", norm_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm_path)

    # 2. Concat video clips
    concat_list = os.path.join(TEMP_DIR, "concat.txt")
    with open(concat_list, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    raw_video = os.path.join(TEMP_DIR, "raw_merged.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
        "-c", "copy", raw_video
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 3. Final Master Pass: Merge B-roll + Voiceover + High-Contrast Subtitles
    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=Arial Black,FontSize=20,PrimaryColour=&H00FFFF&,BackColour=&H80000000&,"
        f"BorderStyle=3,Outline=2,Shadow=2,Alignment=2,MarginV=120'"
    )

    final_cmd = [
        "ffmpeg", "-y",
        "-i", raw_video,
        "-i", voiceover_path,
        "-t", str(duration),
        "-vf", subtitle_filter,
        "-c:v", "libx264", "-preset", "fast", "-crf", "18", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest", output_path
    ]

    print(">> Burning subtitles and rendering final master...", file=sys.stderr)
    subprocess.run(final_cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Final Production Video Ready: {output_path}", file=sys.stderr)

# 5. YouTube Uploader
def upload_to_youtube(video_path: str, title: str, description: str, tags: list, privacy="public"):
    print(f">> Publishing to YouTube Channel ({privacy})...", file=sys.stderr)
    creds = Credentials(
        None,
        refresh_token=REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube"]
    )
    creds.refresh(Request())
    youtube = build("youtube", "v3", credentials=creds)

    body = {
        "snippet": {
            "title": title[:100],
            "description": description[:5000],
            "tags": tags,
            "categoryId": "27"
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False
        }
    }

    media = MediaFileUpload(video_path, chunksize=1024*1024*2, resumable=True, mimetype="video/*")
    request = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploading... {int(status.progress() * 100)}%", file=sys.stderr)

    vid_id = response.get("id")
    url = f"https://youtu.be/{vid_id}"
    print(f"Published to YouTube: {url}", file=sys.stderr)
    return {"videoId": vid_id, "videoUrl": url}

# 6. End-to-End Pipeline Execution
def run_full_production(topic: str, script: str, broll_keywords: list, title: str, tags: list, privacy="public"):
    print("\n==========================================")
    print("STARTING PRO CINEMATIC SHORTS PIPELINE")
    print(f"Topic: {topic}")
    print("==========================================\n")

    audio_file = os.path.join(TEMP_DIR, "voiceover.mp3")
    srt_file = os.path.join(TEMP_DIR, "captions.srt")
    final_video = os.path.join("output", f"cinematic_short_{int(time.time())}.mp4")

    # 1. Voiceover
    asyncio.run(generate_voiceover(script, audio_file))
    duration = get_audio_duration(audio_file)
    print(f">> Audio Duration: {duration:.1f} seconds")

    # 2. Captions
    generate_srt_captions(script, duration, srt_file)

    # 3. Real B-Roll Video Clips from Pexels
    clips = download_pexels_broll(broll_keywords, target_count=4)
    if not clips:
        raise RuntimeError("No stock video footage could be downloaded from Pexels.")

    # 4. Render Video
    render_cinematic_short(clips, audio_file, srt_file, final_video)

    # 5. Upload to YouTube
    description = (
        f"{script}\n\n"
        f"Discover the incredible true stories of science, medicine, and human discovery!\n\n"
        f"Subscribe for daily bite-sized cinematic history!\n\n"
        f"{' '.join(['#' + t for t in tags])}"
    )
    result = upload_to_youtube(final_video, title, description, tags, privacy=privacy)
    return result

if __name__ == "__main__":
    story_topic = "The 1932 Untreated Syphilis Mystery"
    story_script = (
        "In 1932, six hundred men were promised free healthcare for a condition called bad blood. "
        "But they were never being treated. Scientists were secretly tracking what untreated syphilis does to the human body over forty years. "
        "Even when penicillin became the universal cure in 1947, doctors withheld it. "
        "It took a courageous whistleblower in 1972 to expose the truth and change modern bioethics forever."
    )
    story_keywords = [
        "doctor examining patient",
        "laboratory microscope",
        "vintage medicine bottles",
        "medical research lab"
    ]
    story_title = "In 1932, Doctors Promised a Cure... But Did This Instead 🤫 #Shorts"
    story_tags = ["history", "medicalhistory", "sciencefacts", "mystery", "documentary", "shorts"]

    res = run_full_production(
        topic=story_topic,
        script=story_script,
        broll_keywords=story_keywords,
        title=story_title,
        tags=story_tags,
        privacy="public"
    )
    print(json.dumps(res, indent=2))
