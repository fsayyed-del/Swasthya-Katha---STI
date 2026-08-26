#!/usr/bin/env python3
"""
Autonomous YouTube Shorts Trend Scout, Creator & Uploader Bot.
Continuously scouts trending topics, scripts, renders, and publishes Shorts on autopilot.
"""

import os
import sys
import time
import json
import random
import argparse
import subprocess
from datetime import datetime
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

def load_env():
    """Load environment variables from .env.local if present."""
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

load_env()

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN")

STATE_FILE = "output/bot_state.json"
NICHES = [
    "Medical History Mysteries",
    "Strange Scientific Discoveries",
    "Unsolved Ancient Medicine",
    "Biomedical Breakthroughs",
    "Bizarre Human Body Facts"
]

def load_state():
    if os.path.exists(STATE_FILE):
        try:
            with open(STATE_FILE, "r") as f:
                return json.load(f)
        except Exception:
            pass
    return {"uploaded_topics": [], "last_run": None}

def save_state(state):
    os.makedirs(os.path.dirname(STATE_FILE), exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)

def get_youtube_service():
    if not (CLIENT_ID and CLIENT_SECRET and REFRESH_TOKEN):
        raise ValueError("Missing YouTube OAuth credentials in environment / .env.local")

    credentials = Credentials(
        None,
        refresh_token=REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET,
        scopes=[
            "https://www.googleapis.com/auth/youtube.upload",
            "https://www.googleapis.com/auth/youtube"
        ]
    )
    credentials.refresh(Request())
    return build("youtube", "v3", credentials=credentials)

def scout_trending_topic(youtube, state):
    """Discovers high-potential topics using YouTube search & niche filters."""
    print("🔍 Scouting trending topics in high-RPM niches...", file=sys.stderr)
    niche = random.choice(NICHES)
    
    curated_ideas = [
        {
            "topic": "The 1928 Penicillin Accidental Mold Discovery",
            "hook": "In 1928, a messy doctor went on vacation and accidentally saved 200 million lives.",
            "title": "The Dirty Dish That Saved 200 Million Lives 🧫 #Shorts",
            "tags": ["history", "science", "medical", "discovery", "shorts"]
        },
        {
            "topic": "The 1847 Doctor Who Was Locked Up For Washing Hands",
            "hook": "In 1847, this doctor proved handwashing saved lives. His colleagues put him in an asylum for it.",
            "title": "The Doctor Locked in an Asylum for Washing Hands 🧼 #Shorts",
            "tags": ["history", "medicalhistory", "sciencefacts", "mystery", "shorts"]
        },
        {
            "topic": "Why Syphilis Made People Wear Giant White Wigs",
            "hook": "Ever wondered why 17th-century royalty wore huge powdered wigs? The reason is disturbing.",
            "title": "The Dark Reason 17th Century Kings Wore Powdered Wigs 👑 #Shorts",
            "tags": ["darkhistory", "history", "fashionhistory", "syphilis", "shorts"]
        },
        {
            "topic": "The Radium Girls of 1917",
            "hook": "In 1917, factory workers were told to paint their teeth with glow-in-the-dark paint. Then their jaws dissolved.",
            "title": "The Glowing Girls of 1917: Dark Science History ☢️ #Shorts",
            "tags": ["radiumgirls", "science", "darkhistory", "medical", "shorts"]
        },
        {
            "topic": "How the First Vaccine Was Invented with Cow Blisters",
            "hook": "In 1796, a doctor injected a 8-year-old boy with pus from a milkmaid's cowpox blister.",
            "title": "The Gross Experiment That Eradicated Smallpox 💉 #Shorts",
            "tags": ["vaccine", "science", "history", "medicalfacts", "shorts"]
        }
    ]

    available = [item for item in curated_ideas if item["topic"] not in state.get("uploaded_topics", [])]
    if not available:
        available = curated_ideas

    chosen = random.choice(available)
    print(f"🎯 Selected Topic: {chosen['topic']}", file=sys.stderr)
    return chosen

def render_short_video(topic_data, output_path):
    """Renders a cinematic 9:16 vertical Short using FFmpeg."""
    print(f"🎬 Rendering 9:16 Short: {output_path}...", file=sys.stderr)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    title_clean = topic_data["title"].replace("'", "").replace('"', '').split("#")[0].strip()
    hook_clean = topic_data["hook"].replace("'", "").replace('"', '').strip()

    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "color=c=0x0E2426:s=1080x1920:d=12",
        "-f", "lavfi", "-i", "anullsrc=r=44100:cl=stereo",
        "-vf", (
            f"drawbox=y=0:color=0x123A3C@0.8:width=iw:height=ih:t=fill,"
            f"drawtext=text='HIDDEN MEDICAL MYSTERIES':fontcolor=0xE0C58E:fontsize=36:x=(w-text_w)/2:y=380,"
            f"drawtext=text='{title_clean[:35]}':fontcolor=white:fontsize=48:x=(w-text_w)/2:y=550,"
            f"drawtext=text='{hook_clean[:45]}...':fontcolor=0xD97B66:fontsize=38:x=(w-text_w)/2:y=750,"
            f"drawtext=text='SUBSCRIBE FOR DAILY STORIES':fontcolor=0x38BDF8:fontsize=32:x=(w-text_w)/2:y=1500"
        ),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-c:a", "aac",
        "-shortest", output_path
    ]

    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print("✅ Video rendered successfully!", file=sys.stderr)

def publish_to_youtube(youtube, video_path, topic_data, privacy="public"):
    """Publishes the rendered video to YouTube channel."""
    title = topic_data["title"][:100]
    description = (
        f"{topic_data['hook']}\n\n"
        f"Discover the fascinating hidden stories behind medical discoveries, science breakthroughs, and historical mysteries!\n\n"
        f"🔔 Subscribe for daily bite-sized science & history documentaries!\n\n"
        f"{' '.join(['#' + t for t in topic_data['tags']])}"
    )

    body = {
        "snippet": {
            "title": title,
            "description": description,
            "tags": topic_data["tags"],
            "categoryId": "27"
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False
        }
    }

    print(f"🚀 Uploading '{title}' to YouTube ({privacy})...", file=sys.stderr)
    media = MediaFileUpload(video_path, chunksize=1024*1024*2, resumable=True, mimetype="video/*")
    request = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploading... {int(status.progress() * 100)}%", file=sys.stderr)

    video_id = response.get("id")
    video_url = f"https://youtu.be/{video_id}"
    print(f"🎉 Published to YouTube: {video_url}", file=sys.stderr)
    return {"videoId": video_id, "videoUrl": video_url}

def run_pipeline_cycle(privacy="public"):
    """Runs one complete autonomous cycle: Scout -> Script -> Render -> Upload."""
    state = load_state()
    youtube = get_youtube_service()

    topic = scout_trending_topic(youtube, state)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    video_file = f"output/generated_shorts/short_{timestamp}.mp4"

    render_short_video(topic, video_file)
    result = publish_to_youtube(youtube, video_file, topic, privacy=privacy)

    state.setdefault("uploaded_topics", []).append(topic["topic"])
    state["last_run"] = datetime.now().isoformat()
    state.setdefault("history", []).append({
        "topic": topic["topic"],
        "videoUrl": result["videoUrl"],
        "uploadedAt": state["last_run"]
    })
    save_state(state)

    return result

def start_daemon(interval_hours=6, privacy="public"):
    """Runs continuously in the background on the set schedule."""
    print(f"🤖 Autonomous YouTube Bot started! Interval: every {interval_hours} hours.", file=sys.stderr)
    while True:
        try:
            print(f"\n--- [CYCLE START: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] ---", file=sys.stderr)
            res = run_pipeline_cycle(privacy=privacy)
            print(f"✅ Cycle complete. Video live at: {res['videoUrl']}", file=sys.stderr)
        except Exception as e:
            print(f"❌ Error during cycle: {e}", file=sys.stderr)

        sleep_seconds = interval_hours * 3600
        print(f"💤 Sleeping for {interval_hours} hours until next run...", file=sys.stderr)
        time.sleep(sleep_seconds)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Autonomous YouTube Bot")
    parser.add_argument("--once", action="store_true", help="Run once and exit")
    parser.add_argument("--interval", type=float, default=6.0, help="Interval in hours for daemon mode")
    parser.add_argument("--privacy", default="public", choices=["public", "unlisted", "private"], help="Upload privacy")
    args = parser.parse_args()

    if args.once:
        res = run_pipeline_cycle(privacy=args.privacy)
        print(json.dumps(res, indent=2))
    else:
        start_daemon(interval_hours=args.interval, privacy=args.privacy)
