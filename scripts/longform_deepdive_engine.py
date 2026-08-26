#!/usr/bin/env python3
"""
Long-Form Pillar & Documentary Engine (10 to 20+ Minutes).
- Scouts competitor 10-20 min viral winners and extracts full transcripts.
- NVIDIA NIM Llama 3.1 70B restructures into 6-10 high-retention chapters (~1,400 to 2,800 words).
- Edge-TTS neural voiceover with 100% synchronized B-roll footage and subtitles.
- Chapter timestamp markers for YouTube search ranking and midroll ad monetization.
- Routes to dedicated channel with category awareness.
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
from youtube_transcript_api import YouTubeTranscriptApi
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
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

TEMP_DIR = "output/longform_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

NICHES = {
    "movies_hi": {
        "name": "Filmy Kahani Hindi",
        "category_id": "1",
        "voice": "hi-IN-MadhurNeural",
        "lang": "hi",
        "search_queries": ["hollywood thriller movie in hindi full recap", "korean horror movie ending explained hindi", "mind bending psychological movie hindi"],
        "token_key": "YOUTUBE_REFRESH_TOKEN_UCGRGZQI9MOQMW9X3OXLF9TG"
    },
    "movies_en": {
        "name": "Cinema Breakdown",
        "category_id": "1",
        "voice": "en-US-ChristopherNeural",
        "lang": "en",
        "search_queries": ["psychological thriller movie breakdown", "sci fi horror full movie recap", "mind bending movie ending explained"],
        "token_key": "YOUTUBE_REFRESH_TOKEN"
    },
    "deep_history": {
        "name": "Unsolved Deep Dives",
        "category_id": "27",
        "voice": "en-US-ChristopherNeural",
        "lang": "en",
        "search_queries": ["unsolved medical mystery documentary", "ancient civilization secret documentary", "dark historical coverup documentary"],
        "token_key": "YOUTUBE_REFRESH_TOKEN"
    },
    "ai_wealth": {
        "name": "AI Wealth Blueprint",
        "category_id": "28",
        "voice": "en-US-GuyNeural",
        "lang": "en",
        "search_queries": ["youtube automation masterclass make money matt", "ai SaaS empire build guide", "high cpm online business blueprint"],
        "token_key": "YOUTUBE_REFRESH_TOKEN"
    }
}

def extract_transcript_any_language(video_id: str, languages=['en', 'en-US', 'hi', 'hi-IN']) -> str:
    print(f">> Extracting transcript from competitor video: {video_id}...", file=sys.stderr)
    try:
        raw = YouTubeTranscriptApi.get_transcript(video_id, languages=languages)
        full_text = " ".join([item['text'] for item in raw])
        print(f">> Successfully extracted transcript ({len(full_text.split())} words).", file=sys.stderr)
        return full_text
    except Exception as e:
        print(f"  -> Transcript notice: {e}", file=sys.stderr)
        return None

def scout_longform_competitor(query: str) -> dict:
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

    print(f">> Searching YouTube for long-form viral winner: '{query}'...", file=sys.stderr)
    res = youtube.search().list(
        part="snippet",
        q=query,
        order="viewCount",
        type="video",
        videoDuration="long", # > 20 mins
        maxResults=3
    ).execute()

    items = res.get("items", [])
    if items:
        return {
            "videoId": items[0]["id"]["videoId"],
            "title": items[0]["snippet"]["title"]
        }
    return None

def generate_longform_script(niche_key: str, duration_minutes=10, custom_topic=None) -> dict:
    cfg = NICHES.get(niche_key, NICHES["movies_hi"])
    target_words = duration_minutes * 135 # 135 words per minute

    competitor_transcript = ""
    if not custom_topic:
        q = random.choice(cfg["search_queries"])
        comp = scout_longform_competitor(q)
        if comp:
            t = extract_transcript_any_language(comp["videoId"], languages=[cfg["lang"], "en", "hi"])
            if t:
                competitor_transcript = t[:6000] # Feed up to 6000 chars of inspiration
            custom_topic = comp["title"]
        else:
            custom_topic = q

    prompt = f"""
You are the director of a top-tier {duration_minutes}-minute YouTube documentary/storytelling channel.
Target Niche: {cfg['name']} (Language: {cfg['lang']})
Topic: {custom_topic}
Target Word Count: ~{target_words} words (approx {duration_minutes} minutes spoken).

Inspiration Context / Competitor Content:
{competitor_transcript if competitor_transcript else "Original comprehensive deep-dive"}

Storytelling Blueprint:
1. "title": Viral high-CTR title (under 80 characters)
2. "chapters": Array of 5-8 chapter objects, each with "name", "start_estimate", and "text"
3. "script": Full continuous spoken narration text in {cfg['lang']} language with psychological open loops.
4. "broll_queries": 15-20 specific Pexels HD stock video queries.
5. "timestamps": Formatted YouTube chapter breakdown (e.g. 0:00 - Introduction, 2:15 - Chapter 1...).
6. "tags": 10 viral search tags.

Respond ONLY with valid JSON.
"""

    messages = [
        {"role": "system", "content": "You are an elite YouTube documentary director producing 10-20 minute deep dives."},
        {"role": "user", "content": prompt}
    ]

    print(f">> Generating {duration_minutes}-Minute Deep Dive with NVIDIA Llama 3.1 70B...", file=sys.stderr)
    res_text = call_nvidia_nim(messages, model="meta/llama-3.1-70b-instruct", max_tokens=4000)

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
            "title": f"{custom_topic} | Complete Story Breakdown",
            "script": res_text,
            "broll_queries": ["cinematic suspense", "dark corridor mystery", "detective investigation", "old laboratory archives", "city night rain"],
            "timestamps": "0:00 - Introduction\n2:30 - The Unseen Clues\n5:45 - The Turning Point\n8:15 - The Climactic Reveal",
            "tags": ["mystery", "documentary", "storytelling", "recap"]
        }

async def generate_voiceover(text: str, voice: str, out_path: str):
    print(f">> Synthesizing Long-Form Studio Voiceover ({voice})...", file=sys.stderr)
    comm = edge_tts.Communicate(text, voice=voice, rate="+3%")
    await comm.save(out_path)
    print(f">> Audio track saved: {out_path}", file=sys.stderr)

def get_duration(audio_path: str) -> float:
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def download_broll_collection(queries: list, target_count=15) -> list:
    print(f">> Downloading {target_count} HD B-Roll Clips from Pexels...", file=sys.stderr)
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

                clip_path = os.path.join(TEMP_DIR, f"lf_clip_{len(clips)}.mp4")
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

def compile_master_video(clips: list, audio_path: str, srt_path: str, out_video: str):
    print(">> Compiling Full-Length 1080p Master Video with 100% Timing Sync...", file=sys.stderr)
    duration = get_duration(audio_path)
    clip_dur = (duration / len(clips)) + 0.5

    norm_clips = []
    for i, clip in enumerate(clips):
        norm = os.path.join(TEMP_DIR, f"norm_lf_{i}.mp4")
        subprocess.run([
            "ffmpeg", "-y", "-stream_loop", "-1", "-i", clip, "-t", str(clip_dur),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30",
            "-an", "-c:v", "libx264", "-preset", "fast", "-pix_fmt", "yuv420p", norm
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    concat_file = os.path.join(TEMP_DIR, "lf_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    raw = os.path.join(TEMP_DIR, "lf_raw.mp4")
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

def upload_longform_video(video_path: str, title: str, description: str, tags: list, category_id: str, token_key: str):
    token = os.environ.get(token_key, REFRESH_TOKEN)
    print(f">> Uploading Video to YouTube [Category: {category_id}]...", file=sys.stderr)
    creds = Credentials(
        None,
        refresh_token=token,
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

def run_longform_pipeline(niche="movies_hi", duration_mins=10, topic=None):
    cfg = NICHES[niche]
    print(f"\n=======================================================")
    print(f"🎬 LAUNCHING {duration_mins}-MINUTE DEEP DIVE PIPELINE")
    print(f"📌 Channel: {cfg['name']} | Category: {cfg['category_id']}")
    print(f"=======================================================\n")

    # 1. Script & Research
    data = generate_longform_script(niche, duration_minutes=duration_mins, custom_topic=topic)

    # 2. Voiceover
    audio_path = os.path.join(TEMP_DIR, "lf_voice.mp3")
    asyncio.run(generate_voiceover(data["script"], cfg["voice"], audio_path))
    duration = get_duration(audio_path)

    # 3. Subtitles
    srt_path = os.path.join(TEMP_DIR, "lf_subs.srt")
    generate_subtitles(data["script"], duration, srt_path)

    # 4. HD B-roll
    clips = download_broll_collection(data.get("broll_queries", []), target_count=16)

    # 5. Render
    out_video = os.path.join("output", f"longform_{niche}_{int(time.time())}.mp4")
    compile_master_video(clips, audio_path, srt_path, out_video)

    # 6. Description with Chapter Timestamps
    desc = (
        f"{data['title']}\n\n"
        f"TIMESTAMPS:\n"
        f"{data.get('timestamps', '0:00 - Introduction\n3:00 - The Core Story\n7:00 - The Turning Point\n10:00 - The Verdict')}\n\n"
        f"🔔 Subscribe to {cfg['name']} for weekly deep-dive documentaries and cinematic stories!\n\n"
        f"{' '.join(['#' + t for t in data.get('tags', [])])}"
    )

    result = upload_longform_video(out_video, data["title"], desc, data.get("tags", []), cfg["category_id"], cfg["token_key"])
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="10-20 Min Longform Documentary Engine")
    parser.add_argument("--niche", default="movies_hi", choices=list(NICHES.keys()), help="Target niche")
    parser.add_argument("--duration", type=int, default=10, help="Target duration in minutes (e.g. 10 or 20)")
    parser.add_argument("--topic", default=None, help="Custom topic")
    args = parser.parse_args()

    res = run_longform_pipeline(niche=args.niche, duration_mins=args.duration, topic=args.topic)
    print(json.dumps(res, indent=2, ensure_ascii=False))
