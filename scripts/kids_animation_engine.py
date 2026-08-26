#!/usr/bin/env python3
"""
US/Foreign Tier-1 Kids & Baby Animation Empire Engine.
Inspired by Cocomelon, Super Simple Songs, Infobells English, ChuChu TV.

Features:
1. 👶 Formats:
   - 🎵 Viral Nursery Rhymes & Sing-Along Songs (Wheels on the Bus, Old MacDonald, Five Little Monkeys)
   - 🍎 Toddler Cognitive Learning (Colors, Numbers 1-10, ABC Phonics, Shapes, Fruits)
   - 🌟 Calming Bedtime Lullabies & Sleep Stories (15-30 min soothing sleep loops)
   - 🐻 Cute Animal Fables & Moral Stories (Sharing, Kindness, Brushing Teeth, Good Manners)
2. 🎙️ Warm, Sweet Native US Voices (en-US-JennyNeural, en-US-AnaNeural)
3. 🎨 High-Contrast Vibrant Visuals: Candy color palette, friendly cute vector animals, Ken Burns bouncy animation.
4. 🎵 Cheerful Nursery Xylophone & Soft Harp Soundtrack with Audio Ducking.
5. 💬 Bouncy, Colorful Rounded Text Overlays (Fredoka / Poppins style).
6. 🚀 YouTube Kids SEO & Category 27 (Education) Publishing.
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
from PIL import Image, ImageDraw, ImageFont

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

from unified_ai_engine import generate_ai_content, load_env
from auto_thumbnail_generator import create_high_ctr_thumbnail

load_env()

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "3TogwWmYgyzfA4miPBy1m2qRjSwMIpYLvT0lUi8K4lQdHnebUjNdv7Ns")
CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN_KIDS") or os.environ.get("YOUTUBE_REFRESH_TOKEN")

TEMP_DIR = "output/kids_temp"
FRAME_DIR = "output/kids_frames"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)

# Curated High-CPM US/Global Kids Topics
KIDS_TOPICS = {
    "rhymes": [
        "Wheels on the Bus Go Round and Round with Cute Animals",
        "Old MacDonald Had a Farm E-I-E-I-O Animal Sounds",
        "Five Little Monkeys Jumping on the Bed",
        "Twinkle Twinkle Little Star Magical Bedtime Song",
        "If You're Happy and You Know It Clap Your Hands"
    ],
    "learning": [
        "Learn Colors with Delicious Fruits and Magic Paint",
        "Count Numbers 1 to 10 with Playful Farm Animals",
        "ABC Phonics Alphabet Song for Toddlers",
        "Learn Shapes Circle Square Triangle with Toy Train",
        "Good Manners Song: Please and Thank You Magic Words"
    ],
    "lullaby": [
        "Magical Night Sky Bedtime Lullaby for Sweet Deep Sleep",
        "Little Bear's Cozy Cloud Sleep Journey",
        "Soft Ocean Waves Calming Sleep Music for Babies"
    ],
    "stories": [
        "The Little Bunny Who Learned to Share Toys",
        "Leo the Brave Lion Cub Finds a Lost Puppy",
        "Timmy the Turtle's Big Adventure in the Garden"
    ]
}

def generate_kids_script(category="learning", custom_topic=None, duration_mins=3) -> dict:
    """Uses Unified AI (Gemini Pro / Llama 3.1) to construct a high-retention kids video package."""
    if not custom_topic:
        topic_list = KIDS_TOPICS.get(category, KIDS_TOPICS["learning"])
        custom_topic = random.choice(topic_list)

    target_words = duration_mins * 110 # Gentle, slow, clear pacing for kids

    prompt = f"""
You are the lead showrunner of a world-class US Kids YouTube Channel (like Super Simple Songs & Cocomelon).
Create an enchanting, cheerful, and educational kids video script for:
Topic: "{custom_topic}"
Category: {category} (Language: English US, Target: Toddlers 2-6 years old and parents in US/UK/Global).
Target Duration: ~{duration_mins} minutes (~{target_words} words).

Key Elements:
1. Warm, joyful, welcoming opening ("Hello little friends! Are you ready for fun?").
2. Interactive call-and-response questions ("Can you point to the red apple? Wow, good job!").
3. Catchy rhythm, simple words, and positive reinforcement.
4. Fun sound cues (giggle, ding, pop, yay).
5. Cheerful goodbye and subscribe reminder for parents.

JSON Response Specification:
1. "title": Catchy, colorful title with emojis (under 70 chars, e.g. "Learn Colors with Fruits! 🍎🍌 | Fun Toddler Learning Video").
2. "script": Spoken narration text in cheerful, warm English.
3. "scene_prompts": Array of 8-12 visual scene descriptions (e.g. "bright red apple smiling in green grass", "cute yellow banana dancing with music notes", "happy cartoon bunny waving").
4. "bg_music_style": "cheerful_nursery" | "gentle_lullaby" | "playful_acoustic"
5. "tags": 10 high-ranking kids search tags (e.g. "kids songs", "nursery rhymes", "toddler learning", "cocomelon", "infobells").

Respond ONLY with valid JSON.
"""

    print(f">> Kids Engine: Generating '{custom_topic}' with Unified AI...", file=sys.stderr)
    res_text = generate_ai_content(prompt, system_prompt="You are the world's best creator of educational kids entertainment.")

    try:
        clean = res_text.strip()
        if "```json" in clean:
            clean = clean.split("```json")[1].split("```")[0].strip()
        elif "```" in clean:
            clean = clean.split("```")[1].split("```")[0].strip()
        return json.loads(clean, strict=False)
    except Exception as e:
        print(f">> Fallback parsing: {e}", file=sys.stderr)
        return {
            "title": f"{custom_topic} 🌟 | Fun Kids Learning & Songs",
            "script": (
                "Hello little friends! Welcome to our happy learning world! "
                "Today, we are going to explore wonderful bright colors and cute friendly animals! "
                "Look over here! Do you see the big red apple? Yes! Red like a shiny strawberry! "
                "And look, here is a happy yellow sunshine smiling down on us! "
                "You are doing such an amazing job learning today! "
                "Give yourself a big clap! Yay! "
                "Thank you for playing with us today, little stars! See you next time, bye-bye!"
            ),
            "scene_prompts": ["bright cartoon fruit bowl", "happy smiling yellow sun", "cute cartoon puppy playing", "rainbow colors sparkling"],
            "bg_music_style": "cheerful_nursery",
            "tags": ["kidssongs", "nurseryrhymes", "toddlerlearning", "babysongs", "infobells"]
        }

async def generate_kids_voiceover(text: str, out_path: str, is_lullaby=False):
    """Synthesizes high-clarity sweet US voice."""
    voice = "en-US-JennyNeural" # Sweet, warm, friendly
    rate = "-3%" if is_lullaby else "+2%"
    pitch = "+2Hz" if not is_lullaby else "-1Hz"

    print(f">> Kids Engine: Synthesizing Warm Voiceover ({voice})...", file=sys.stderr)
    comm = edge_tts.Communicate(text, voice=voice, rate=rate, pitch=pitch)
    await comm.save(out_path)
    print(f">> Kids voice track ready: {out_path}", file=sys.stderr)

def get_duration(audio_path: str) -> float:
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def generate_nursery_music(duration: float, out_path: str, is_lullaby=False):
    """Synthesizes cheerful nursery chimes or soothing bedtime lullaby."""
    if is_lullaby:
        # Gentle soothing harp & warm sine chords
        cmd = [
            "ffmpeg", "-y",
            "-f", "lavfi", "-i", "sine=f=220:r=48000",
            "-f", "lavfi", "-i", "sine=f=440:r=48000",
            "-f", "lavfi", "-i", "anoisesrc=c=pink:r=48000:a=0.006,lowpass=f=200",
            "-filter_complex", (
                "[0:a]volume=0.18[a0];"
                "[1:a]volume=0.10[a1];"
                "[2:a]volume=0.15[a2];"
                "[a0][a1][a2]amix=inputs=3:duration=first,aecho=0.8:0.88:100:0.4[out]"
            ),
            "-map", "[out]", "-t", str(duration + 2),
            "-c:a", "libmp3lame", "-b:a", "192k", out_path
        ]
    else:
        # Cheerful, bright nursery xylophone vibes
        cmd = [
            "ffmpeg", "-y",
            "-f", "lavfi", "-i", "sine=f=523.25:r=48000", # C5
            "-f", "lavfi", "-i", "sine=f=659.25:r=48000", # E5
            "-f", "lavfi", "-i", "sine=f=783.99:r=48000", # G5
            "-filter_complex", (
                "[0:a]volume=0.10[a0];"
                "[1:a]volume=0.08[a1];"
                "[2:a]volume=0.08[a2];"
                "[a0][a1][a2]amix=inputs=3:duration=first,aecho=0.8:0.7:50:0.3[out]"
            ),
            "-map", "[out]", "-t", str(duration + 2),
            "-c:a", "libmp3lame", "-b:a", "192k", out_path
        ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

def create_kids_character_frame(scene_text: str, frame_idx: int, width=1920, height=1080) -> str:
    """Generates vibrant, candy-colored illustrated frames for toddlers."""
    bg_colors = [
        ("#FEF3C7", "#FDE68A"), # Warm Sunny Yellow
        ("#E0F2FE", "#BAE6FD"), # Soft Sky Blue
        ("#DCFCE7", "#BBF7D0"), # Mint Meadow Green
        ("#FCE7F3", "#FBCFE8"), # Cotton Candy Pink
        ("#EDE9FE", "#DDD6FE")  # Lavender Dream
    ]
    c1, c2 = random.choice(bg_colors)

    img = Image.new("RGB", (width, height), color=c1)
    draw = ImageDraw.Draw(img)

    # Gradient background
    for y in range(height):
        ratio = y / height
        r = int(int(c1[1:3], 16) * (1 - ratio) + int(c2[1:3], 16) * ratio)
        g = int(int(c1[3:5], 16) * (1 - ratio) + int(c2[3:5], 16) * ratio)
        b = int(int(c1[5:7], 16) * (1 - ratio) + int(c2[5:7], 16) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Cheerful floating cloud shapes
    for _ in range(6):
        cx = random.randint(100, width - 100)
        cy = random.randint(100, 400)
        cr = random.randint(80, 140)
        draw.ellipse([cx-cr, cy-cr//2, cx+cr, cy+cr//2], fill="#FFFFFF")

    # Friendly cute character / star in center
    cx, cy = width // 2, height // 2 + 50
    char_colors = ["#F59E0B", "#EF4444", "#10B981", "#3B82F6", "#8B5CF6"]
    char_color = random.choice(char_colors)

    # Big cute round body
    body_r = 180
    draw.ellipse([cx-body_r, cy-body_r, cx+body_r, cy+body_r], fill=char_color, outline="#FFFFFF", width=8)

    # Big friendly sparkling eyes
    draw.ellipse([cx-65, cy-40, cx-25, cy], fill="#0F172A")
    draw.ellipse([cx+25, cy-40, cx+65, cy], fill="#0F172A")
    draw.ellipse([cx-50, cy-35, cx-35, cy-20], fill="#FFFFFF") # Catchlight
    draw.ellipse([cx+40, cy-35, cx+55, cy-20], fill="#FFFFFF")

    # Rosy cheeks
    draw.ellipse([cx-90, cy+10, cx-60, cy+35], fill="#FDA4AF")
    draw.ellipse([cx+60, cy+10, cx+90, cy+35], fill="#FDA4AF")

    # Big happy smile
    draw.arc([cx-45, cy-10, cx+45, cy+60], start=0, end=180, fill="#FFFFFF", width=8)

    # Scene title banner at bottom
    try:
        font = ImageFont.truetype("arialbd.ttf", 44)
    except Exception:
        font = ImageFont.load_default()

    clean_title = scene_text[:45].upper()
    banner_w = len(clean_title) * 26 + 80
    bx = (width - banner_w) // 2
    draw.rounded_rectangle([bx, height - 160, bx + banner_w, height - 70], radius=35, fill="#1E293B", outline="#FBBF24", width=5)
    draw.text((width // 2, height - 115), clean_title, fill="#FFFFFF", font=font, anchor="mm")

    out_frame = os.path.join(FRAME_DIR, f"kids_frame_{frame_idx}_{int(time.time())}.png")
    img.save(out_frame, "PNG")
    return out_frame

def download_kids_footage(keywords: list, target_count=8) -> list:
    """Fetches cute high-quality stock clips (cute puppies, toys, colorful animation)."""
    headers = {"Authorization": PEXELS_API_KEY}
    clips = []
    kids_keywords = keywords + ["cute puppy playing", "colorful toys toddler", "baby smiling laughing", "funny cute kitten", "bubble play garden"]

    for kw in kids_keywords:
        if len(clips) >= target_count:
            break
        try:
            url = f"https://api.pexels.com/videos/search?query={kw}&orientation=landscape&per_page=3"
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

                clip_path = os.path.join(TEMP_DIR, f"kids_clip_{len(clips)}.mp4")
                v_res = requests.get(best_url, stream=True, timeout=30)
                with open(clip_path, "wb") as f:
                    for chunk in v_res.iter_content(chunk_size=1024*1024):
                        if chunk:
                            f.write(chunk)
                clips.append(clip_path)
        except Exception:
            pass

    return clips

def generate_kids_subtitles(full_text: str, total_duration: float, srt_path: str):
    words = full_text.split()
    chunk_size = 4
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
            f.write(f"{chunk.upper()}\n\n")

def compile_kids_master_video(clips: list, frames: list, voice_audio: str, srt_path: str, is_lullaby: bool, out_video: str):
    """
    Renders 1080p Cheerful Kids Master Video:
    - Mixes live stock footage + animated character illustration plates.
    - Adds cheerful bouncy subtitle overlays.
    - Mixes nursery background music with audio ducking.
    """
    duration = get_duration(voice_audio)
    print(f">> Kids Engine: Rendering {duration:.1f}s Master Video with Bouncy Typography...", file=sys.stderr)

    norm_clips = []
    # Combine stock clips and animated frame cards
    all_visuals = clips + frames
    random.shuffle(all_visuals)

    for i, asset in enumerate(all_visuals[:12]):
        norm = os.path.join(TEMP_DIR, f"kids_norm_{i}.mp4")
        if asset.endswith(".png") or asset.endswith(".jpg"):
            # Turn image card into a 5-sec subtle zoom video
            filter_str = "scale=1920:1080,zoompan=z='min(zoom+0.0015,1.08)':d=150:s=1920x1080,fps=30"
            subprocess.run([
                "ffmpeg", "-y", "-loop", "1", "-i", asset, "-t", "5",
                "-vf", filter_str,
                "-an", "-c:v", "libx264", "-preset", "ultrafast", "-threads", "0", "-pix_fmt", "yuv420p", norm
            ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        else:
            # Normalize video clip
            filter_str = "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30,eq=saturation=1.20:brightness=0.03"
            subprocess.run([
                "ffmpeg", "-y", "-i", asset, "-t", "5",
                "-vf", filter_str,
                "-an", "-c:v", "libx264", "-preset", "ultrafast", "-threads", "0", "-pix_fmt", "yuv420p", norm
            ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    concat_file = os.path.join(TEMP_DIR, "kids_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    bgm_path = os.path.join(TEMP_DIR, "kids_bgm.mp3")
    generate_nursery_music(duration, bgm_path, is_lullaby=is_lullaby)

    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    # High-contrast, friendly rounded yellow/white text for kids
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=Arial Black,FontSize=20,PrimaryColour=&H0000FFFF&,BackColour=&H80000000&,"
        f"BorderStyle=3,Outline=2.5,Shadow=3,Alignment=2,MarginV=60'"
    )

    filter_complex = (
        f"[0:v]{subtitle_filter}[v_out];"
        f"[1:a]volume=1.0[voice];"
        f"[2:a]volume=0.15[bgm];"
        f"[voice][bgm]amix=inputs=2:duration=first[a_out]"
    )

    cmd = [
        "ffmpeg", "-y",
        "-stream_loop", "-1", "-f", "concat", "-safe", "0", "-i", concat_file,
        "-i", voice_audio,
        "-i", bgm_path,
        "-t", str(duration),
        "-filter_complex", filter_complex,
        "-map", "[v_out]", "-map", "[a_out]",
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20", "-threads", "0", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        out_video
    ]

    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Master Kids Video Render Complete: {out_video}", file=sys.stderr)

def upload_to_youtube_kids(video_path: str, title: str, description: str, tags: list):
    print(">> Uploading to YouTube Kids / Education [Category: 27]...", file=sys.stderr)
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
        "snippet": {"title": title[:100], "description": description[:5000], "tags": tags, "categoryId": "27"}, # 27 = Education
        "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": True} # COPPA Compliant for Kids
    }

    media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype="video/*")
    req = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    res = None
    while res is None:
        status, res = req.next_chunk()
        if status:
            print(f"Uploading Kids Video... {int(status.progress() * 100)}%", file=sys.stderr)

    vid_id = res.get("id")
    url = f"https://youtu.be/{vid_id}"
    print(f">> LIVE on YouTube Kids: {url}", file=sys.stderr)
    return {"videoId": vid_id, "videoUrl": url}

def run_kids_channel_pipeline(category="learning", topic=None, duration_mins=3):
    print(f"\n=================================================================")
    print(f"👶 LAUNCHING US/FOREIGN KIDS ANIMATION & LEARNING ENGINE")
    print(f"🌟 Category: {category} | Pacing: Toddler Interactive Friendly")
    print(f"=================================================================\n")

    # 1. AI Scripting
    data = generate_kids_script(category=category, custom_topic=topic, duration_mins=duration_mins)
    is_lullaby = (category == "lullaby")

    # 2. Voiceover (Sweet US Jenny Voice)
    voice_audio = os.path.join(TEMP_DIR, "kids_voice.mp3")
    asyncio.run(generate_kids_voiceover(data["script"], voice_audio, is_lullaby=is_lullaby))
    duration = get_duration(voice_audio)

    # 3. Subtitles
    srt_path = os.path.join(TEMP_DIR, "kids_subs.srt")
    generate_kids_subtitles(data["script"], duration, srt_path)

    # 4. Generate Animated Character Cards
    frames = []
    for idx, prompt_text in enumerate(data.get("scene_prompts", ["Happy Stars", "Cute Animals", "Fun Learning"])[:4]):
        frame_file = create_kids_character_frame(prompt_text, idx)
        frames.append(frame_file)

    # 5. Sourcing Footage
    clips = download_kids_footage(data.get("scene_prompts", ["cute animals", "toddler toys"]), target_count=6)

    # 6. Render Master Video
    out_video = os.path.join("output", f"kids_{int(time.time())}.mp4")
    compile_kids_master_video(clips, frames, voice_audio, srt_path, is_lullaby, out_video)

    # 7. High-CTR Thumbnail
    create_high_ctr_thumbnail(data["title"][:35], is_portrait=False)

    # 8. Description with Family & Kids Hashtags
    desc = (
        f"{data['title']}\n\n"
        f"{data['script']}\n\n"
        f"🌟 Welcome to our magical kids learning channel! Enjoy fun songs, friendly animals, and educational adventures for toddlers and preschoolers!\n\n"
        f"🔔 Subscribe for new cheerful songs every week!\n\n"
        f"{' '.join(['#' + t for t in data.get('tags', [])])}"
    )

    # 9. Upload
    result = upload_to_youtube_kids(out_video, data["title"], desc, data.get("tags", []))
    return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Kids Animation & Learning Engine")
    parser.add_argument("--category", choices=["rhymes", "learning", "lullaby", "stories"], default="learning", help="Category")
    parser.add_argument("--topic", default=None, help="Custom topic")
    parser.add_argument("--duration", type=int, default=3, help="Duration in minutes")
    args = parser.parse_args()

    res = run_kids_channel_pipeline(category=args.category, topic=args.topic, duration_mins=args.duration)
    print(json.dumps(res, indent=2, ensure_ascii=False))
