#!/usr/bin/env python3
"""
YouTube Automation Flywheel Engine — Based on Matt Parr's Symbiotic Mastermind Strategy.
1. High-RPM Niche Targeting (Finance, Tech, Medical Mysteries, Film Analysis).
2. Tier-1 Audience Optimization (US peak posting, American English, High-CTR Hooks).
3. Session Time & Retention Loops (8-12 min Pillar Videos, Midroll Placements, Synchronized B-Roll).
4. Category-Wise YouTube Distribution & Multi-Tier Monetization Descriptions.
"""

import os
import sys
import json
import time
import random
import asyncio
import argparse
import requests
import subprocess
from datetime import datetime

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

sys.path.insert(0, os.path.dirname(__file__))
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

try:
    from nvidia_ai_engine import call_nvidia_nim
except ImportError:
    from scripts.nvidia_ai_engine import call_nvidia_nim

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

TEMP_DIR = "output/flywheel_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

# Matt Parr's High-RPM Frameworks
HIGH_RPM_NICHES = {
    "software_ai": {
        "category_id": "28", # Science & Technology
        "name": "AI & Software Wealth",
        "cpm_tier": "$35-$60",
        "voice": "en-US-ChristopherNeural",
        "keywords": ["ai video editing", "automation software", "wealth building code", "high tech future"]
    },
    "business_finance": {
        "category_id": "27", # Education
        "name": "Passive Income & Empire",
        "cpm_tier": "$40-$80",
        "voice": "en-US-GuyNeural",
        "keywords": ["finance money growth", "luxury empire architecture", "stock market chart", "business success"]
    },
    "movie_breakdown": {
        "category_id": "1", # Film & Animation
        "name": "Cinematic Analysis",
        "cpm_tier": "$15-$25",
        "voice": "en-US-ChristopherNeural",
        "keywords": ["cinematic suspense", "film camera set", "dark movie theater", "neon cyberpunk thriller"]
    },
    "medical_science": {
        "category_id": "27", # Education
        "name": "Hidden Science Mysteries",
        "cpm_tier": "$25-$45",
        "voice": "en-US-ChristopherNeural",
        "keywords": ["laboratory research microscope", "ancient medical archives", "dna biotechnology", "hospital clinic"]
    }
}

def generate_flywheel_script(niche_key: str, topic: str, target_minutes=8) -> dict:
    """Uses NVIDIA Llama 3.1 to construct a full retention-optimized pillar video script."""
    niche_data = HIGH_RPM_NICHES.get(niche_key, HIGH_RPM_NICHES["software_ai"])
    target_words = target_minutes * 135 # 135 words per minute spoken pace

    prompt = f"""
You are creating a top-tier YouTube Automation pillar video based on Matt Parr's Symbiotic Flywheel System.
Niche: {niche_data['name']} (CPM Tier: {niche_data['cpm_tier']})
Topic: {topic}
Target Word Count: ~{target_words} words (Pillar length for multiple midrolls).

Format Requirements:
1. "title": A god-tier viral curiosity hook title (under 80 chars, e.g. "The Secret AI System Making $10,000/Mo in 2026").
2. "hook_first_30s": A gripping opening 30 seconds that prevents drop-off and promises high-value payoff.
3. "script": The complete spoken script with 4-5 progressive chapters, psychological open loops, and high information gain.
4. "broll_queries": 8-12 specific Pexels HD stock video queries.
5. "timestamps": Chapter breakdown for YouTube description.
6. "tags": 8-10 high-CPM search tags.

Respond ONLY with valid JSON.
"""

    messages = [
        {"role": "system", "content": "You are a world-class YouTube script director specializing in high-session-time pillar content."},
        {"role": "user", "content": prompt}
    ]

    print(f">> Generating {target_minutes}-Minute Pillar Script via NVIDIA NIM...", file=sys.stderr)
    res_text = call_nvidia_nim(messages, model="meta/llama-3.1-70b-instruct", max_tokens=3500)

    try:
        clean = res_text.strip()
        if "```json" in clean:
            clean = clean.split("```json")[1].split("```")[0].strip()
        elif "```" in clean:
            clean = clean.split("```")[1].split("```")[0].strip()
        return json.loads(clean, strict=False)
    except Exception as e:
        print(f">> Parsing fallback: {e}", file=sys.stderr)
        return {
            "title": f"The Ultimate {topic} Masterclass in 2026",
            "script": res_text,
            "broll_queries": niche_data["keywords"],
            "timestamps": "0:00 - Introduction\n1:30 - Core System\n4:00 - Scaling",
            "tags": ["youtubeautomation", "makemoneyonline", "passiveincome", "business"]
        }

async def synthesize_audio(text: str, voice: str, out_path: str):
    print(f">> Synthesizing Full Pillar Voiceover ({voice})...", file=sys.stderr)
    comm = edge_tts.Communicate(text, voice=voice, rate="+3%")
    await comm.save(out_path)
    print(f">> Audio track saved: {out_path}", file=sys.stderr)

def get_duration(audio_path: str) -> float:
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def download_broll_library(queries: list, target_count=8) -> list:
    print(f">> Downloading {target_count} HD B-Roll Video Clips from Pexels...", file=sys.stderr)
    headers = {"Authorization": PEXELS_API_KEY}
    clips = []

    for i, q in enumerate(queries):
        if len(clips) >= target_count:
            break
        try:
            url = f"https://api.pexels.com/videos/search?query={q}&orientation=landscape&per_page=3"
            r = requests.get(url, headers=headers, timeout=15)
            videos = r.json().get("videos", [])
            if videos:
                best_url = None
                for vf in videos[0].get("video_files", []):
                    if vf.get("width", 0) >= 1280 or vf.get("quality") == "hd":
                        best_url = vf.get("link")
                        break
                if not best_url:
                    best_url = videos[0]["video_files"][0]["link"]

                clip_path = os.path.join(TEMP_DIR, f"flywheel_clip_{len(clips)}.mp4")
                v_res = requests.get(best_url, stream=True, timeout=30)
                with open(clip_path, "wb") as f:
                    for chunk in v_res.iter_content(chunk_size=1024*1024):
                        if chunk:
                            f.write(chunk)
                clips.append(clip_path)
        except Exception as e:
            print(f"  -> B-roll warning for '{q}': {e}", file=sys.stderr)

    return clips

def generate_subtitles(full_text: str, total_duration: float, srt_path: str):
    words = full_text.split()
    chunk_size = 5
    chunks = [" ".join(words[i:i+chunk_size]) for i in range(0, len(words), chunk_size)]
    time_per_chunk = total_duration / len(chunks)

    with open(srt_path, "w", encoding="utf-8") as f:
        for idx, chunk in enumerate(chunks):
            start_sec = idx * time_per_chunk
            end_sec = (idx + 1) * time_per_chunk
            hrs = int(start_sec // 3600)
            mins = int((start_sec % 3600) // 60)
            secs = int(start_sec % 60)
            ms = int((start_sec - int(start_sec)) * 1000)
            
            e_hrs = int(end_sec // 3600)
            e_mins = int((end_sec % 3600) // 60)
            e_secs = int(end_sec % 60)
            e_ms = int((end_sec - int(end_sec)) * 1000)

            f.write(f"{idx + 1}\n")
            f.write(f"{hrs:02d}:{mins:02d}:{secs:02d},{ms:03d} --> {e_hrs:02d}:{e_mins:02d}:{e_secs:02d},{e_ms:03d}\n")
            f.write(f"{chunk}\n\n")

def compile_pillar_video(clips: list, audio_path: str, srt_path: str, out_video: str):
    print(f">> Rendering Full 1080p Master Video with 100% Timing Sync...", file=sys.stderr)
    duration = get_duration(audio_path)
    clip_dur = (duration / len(clips)) + 0.5

    norm_clips = []
    for i, clip in enumerate(clips):
        norm = os.path.join(TEMP_DIR, f"norm_fw_{i}.mp4")
        subprocess.run([
            "ffmpeg", "-y", "-stream_loop", "-1", "-i", clip, "-t", str(clip_dur),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30",
            "-an", "-c:v", "libx264", "-preset", "fast", "-pix_fmt", "yuv420p", norm
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    concat_file = os.path.join(TEMP_DIR, "fw_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    raw = os.path.join(TEMP_DIR, "fw_raw.mp4")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_file, "-c", "copy", raw],
                   check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=Trebuchet MS,FontSize=16,PrimaryColour=&H00FFFFFF&,BackColour=&H80000000&,"
        f"BorderStyle=3,Outline=1.5,Shadow=2,Alignment=2,MarginV=50'"
    )

    subprocess.run([
        "ffmpeg", "-y", "-i", raw, "-i", audio_path, "-t", str(duration),
        "-vf", subtitle_filter,
        "-c:v", "libx264", "-preset", "fast", "-crf", "19", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k", "-shortest", out_video
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Master Video Rendered ({duration:.1f}s / {duration/60:.1f} min): {out_video}", file=sys.stderr)

def upload_pillar_video(video_path: str, title: str, description: str, tags: list, category_id: str):
    print(f">> Uploading Pillar Video to YouTube [Category: {category_id}]...", file=sys.stderr)
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
        "snippet": {"title": title[:100], "description": description[:5000], "tags": tags, "categoryId": category_id},
        "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": False}
    }

    media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype="video/*")
    req = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    res = None
    while res is None:
        status, res = req.next_chunk()
        if status:
            print(f"Uploading... {int(status.progress() * 100)}%", file=sys.stderr)

    vid_id = res.get("id")
    url = f"https://youtu.be/{vid_id}"
    print(f">> LIVE on YouTube: {url}", file=sys.stderr)
    return {"videoId": vid_id, "videoUrl": url}

def run_matt_parr_flywheel(niche="software_ai", topic="How to Build a Faceless YouTube Empire with AI in 2026"):
    niche_cfg = HIGH_RPM_NICHES[niche]
    print(f"\n=======================================================")
    print(f"💎 RUNNING MATT PARR YOUTUBE AUTOMATION FLYWHEEL")
    print(f"📌 Niche: {niche_cfg['name']} | Est. CPM: {niche_cfg['cpm_tier']}")
    print(f"=======================================================\n")

    # 1. Script
    data = generate_flywheel_script(niche, topic, target_minutes=4)

    # 2. Voice
    audio_path = os.path.join(TEMP_DIR, "pillar_voice.mp3")
    asyncio.run(synthesize_audio(data["script"], niche_cfg["voice"], audio_path))
    duration = get_duration(audio_path)

    # 3. Subtitles
    srt_path = os.path.join(TEMP_DIR, "pillar_subs.srt")
    generate_subtitles(data["script"], duration, srt_path)

    # 4. HD B-roll
    broll_queries = data.get("broll_queries", niche_cfg["keywords"])
    clips = download_broll_library(broll_queries, target_count=8)

    # 5. Render
    out_video = os.path.join("output", f"flywheel_{niche}_{int(time.time())}.mp4")
    compile_pillar_video(clips, audio_path, srt_path, out_video)

    # 6. Description with High-Converting Affiliate & Timestamps
    desc = (
        f"{data['title']}\n\n"
        f"{data.get('hook_first_30s', '')}\n\n"
        f"TIMESTAMPS:\n"
        f"{data.get('timestamps', '0:00 - Introduction\n1:30 - Core Strategy\n3:00 - Action Plan')}\n\n"
        f"🔗 RESOURCES & MASTERMIND:\n"
        f"• Free Automation Blueprint & Checklist: https://swasthya-katha.vercel.app\n"
        f"• Recommended High-CPM Tools: https://tubeacelerator.com/go\n\n"
        f"🔔 Subscribe for weekly masterclasses on building scalable YouTube automation empires!\n\n"
        f"{' '.join(['#' + t for t in data.get('tags', [])])}"
    )

    result = upload_pillar_video(out_video, data["title"], desc, data.get("tags", []), niche_cfg["category_id"])
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Matt Parr YouTube Flywheel Engine")
    parser.add_argument("--niche", default="software_ai", choices=list(HIGH_RPM_NICHES.keys()), help="Target high-RPM niche")
    parser.add_argument("--topic", default="How to Build a Faceless YouTube Empire with AI in 2026", help="Video topic")
    args = parser.parse_args()

    res = run_matt_parr_flywheel(niche=args.niche, topic=args.topic)
    print(json.dumps(res, indent=2, ensure_ascii=False))
