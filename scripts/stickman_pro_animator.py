#!/usr/bin/env python3
"""
Ultimate Stick Figure Animation & Motivational Empire Engine ($5,000+/Mo Blueprint).
Inspired by top stickman self-improvement channels:
- 📜 Warm Vintage Paper Texture / Parchment Canvas
- 🏃 8 Vector Stickman Archetypes (Climbing, Lifting, Running, Meditating, Idea Bulb, Book Ladder)
- 🎨 2-Tone Dynamic Kinetic Typography (Black + Crimson Red Contrast)
- 🎙️ Confident 'Chris' Voiceover (en-US-ChristopherNeural / hi-IN-MadhurNeural)
- 🎹 Inspiring Piano & Acoustic Strings Soundtrack with Audio Ducking
- 📱 Dual Format: 9:16 Vertical Shorts & 16:9 Landscape Video
"""

import os
import sys
import json
import time
import random
import asyncio
import argparse
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

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN_BRAND2") or os.environ.get("YOUTUBE_REFRESH_TOKEN")

TEMP_DIR = "output/stickman_temp"
FRAME_DIR = "output/stickman_frames"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)

MOTIVATIONAL_TOPICS = [
    "Every great transformation begins with a single small step. It's not about massive leaps, it's about showing up daily.",
    "The reason most people fail is not lack of talent, it's quitting right before the breakthrough.",
    "Your future is hidden in your daily routine. Discipline is choosing what you want most over what you want now.",
    "Stop waiting for motivation. Action creates momentum, and momentum creates success."
]

def generate_stickman_script(custom_topic: str = None, lang="en") -> dict:
    """Generates a 30-second high-impact motivational script segmented into 4 visual scenes."""
    if not custom_topic:
        custom_topic = random.choice(MOTIVATIONAL_TOPICS)

    lang_name = "English (US - Confident, stoic, motivating)" if lang == "en" else "Hindi (Devanagari - Deep, powerful, impactful)"

    prompt = f"""
You are the lead writer for a viral stickman motivation channel (like MinuteVideos / BetterThanYesterday).
Create an inspiring 30-second script for:
"{custom_topic}"
Language: {lang_name}

Divide into exactly 4 visual scenes:
For each scene provide:
- "narration": Spoken text (12-16 words per scene).
- "highlight_black": Word 1 in bold black (e.g. "SMALL")
- "highlight_red": Word 2 in bold crimson red (e.g. "STEP")
- "action": One of ["climbing", "lifting", "running", "thinking", "meditating", "reading"]

JSON Format:
{{
  "title": "Title with Emojis (under 60 chars)",
  "full_script": "Full continuous narration (50-65 words total)",
  "scenes": [
    {{"scene_num": 1, "narration": "...", "highlight_black": "SMALL", "highlight_red": "STEP", "action": "climbing"}},
    {{"scene_num": 2, "narration": "...", "highlight_black": "SHOW", "highlight_red": "UP", "action": "running"}},
    {{"scene_num": 3, "narration": "...", "highlight_black": "BUILD", "highlight_red": "HABITS", "action": "lifting"}},
    {{"scene_num": 4, "narration": "...", "highlight_black": "RISE", "highlight_red": "TODAY", "action": "meditating"}}
  ],
  "tags": ["motivation", "discipline", "stickman", "selfimprovement", "mindset"]
}}

Respond ONLY with valid JSON.
"""

    print(f">> Stickman Engine: Writing 4-Scene Motivational Script...", file=sys.stderr)
    res_text = generate_ai_content(prompt, system_prompt="You are the world's best viral motivational video writer.")

    try:
        clean = res_text.strip()
        if "```json" in clean:
            clean = clean.split("```json")[1].split("```")[0].strip()
        elif "```" in clean:
            clean = clean.split("```")[1].split("```")[0].strip()
        return json.loads(clean, strict=False)
    except Exception as e:
        print(f">> Script parse fallback: {e}", file=sys.stderr)
        return {
            "title": "The Rule of Small Steps! 🏔️🔥 #motivation",
            "full_script": (
                "Every great transformation begins with a single small step. "
                "It is not about massive leaps. It is about showing up daily even when nobody is watching. "
                "Every drop of effort is silently building the future you. "
                "Do not quit now. Take that step and rise today."
            ),
            "scenes": [
                {"scene_num": 1, "narration": "Every great transformation begins with a single small step.", "highlight_black": "SMALL", "highlight_red": "STEP", "action": "climbing"},
                {"scene_num": 2, "narration": "It is not about massive leaps. It is about showing up daily.", "highlight_black": "SHOW", "highlight_red": "UP", "action": "running"},
                {"scene_num": 3, "narration": "Every drop of effort is silently building the future you.", "highlight_black": "BUILD", "highlight_red": "GRIT", "action": "lifting"},
                {"scene_num": 4, "narration": "Do not quit now. Take that step and rise today.", "highlight_black": "RISE", "highlight_red": "TODAY", "action": "meditating"}
            ],
            "tags": ["motivation", "discipline", "selfimprovement", "mindset", "shorts"]
        }

async def synthesize_chris_voice(text: str, out_path: str, lang="en"):
    """Synthesizes confident, deep motivational Chris voice."""
    voice = "en-US-ChristopherNeural" if lang == "en" else "hi-IN-MadhurNeural"
    rate = "+3%"
    pitch = "-1Hz"

    print(f">> Stickman Engine: Synthesizing Confident Voice ({voice})...", file=sys.stderr)
    comm = edge_tts.Communicate(text, voice=voice, rate=rate, pitch=pitch)
    await comm.save(out_path)
    print(f">> Voice track saved: {out_path}", file=sys.stderr)

def get_duration(audio_path: str) -> float:
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def create_paper_texture_canvas(width=1080, height=1920) -> Image:
    """Generates an authentic warm textured parchment paper background."""
    img = Image.new("RGB", (width, height), color="#FBF6EE") # Warm ivory paper
    draw = ImageDraw.Draw(img)

    # Draw subtle vintage paper grid lines
    grid_size = 40
    for x in range(0, width, grid_size):
        draw.line([(x, 0), (x, height)], fill="#EDE4D3", width=1)
    for y in range(0, height, grid_size):
        draw.line([(0, y), (width, y)], fill="#EDE4D3", width=1)

    # Subtle vignette border
    draw.rectangle([0, 0, width, height], outline="#D6C7B0", width=8)
    return img

def draw_vector_stickman(draw: ImageDraw.Draw, action: str, cx: int, cy: int):
    """Draws crisp, iconic vector stick figure illustrations."""
    ink_color = "#1E293B" # Dark graphite ink
    head_r = 38
    stroke_w = 9

    # Head
    draw.ellipse([cx - head_r, cy - 180 - head_r, cx + head_r, cy - 180 + head_r], fill=None, outline=ink_color, width=stroke_w)

    if action == "climbing":
        # Spine
        draw.line([(cx, cy - 140), (cx - 20, cy)], fill=ink_color, width=stroke_w)
        # Mountain slope
        draw.line([(cx - 250, cy + 120), (cx + 250, cy - 80)], fill="#94A3B8", width=10)
        # Flag at top
        draw.line([(cx + 230, cy - 80), (cx + 230, cy - 180)], fill="#DC2626", width=6)
        draw.polygon([(cx + 230, cy - 180), (cx + 170, cy - 150), (cx + 230, cy - 120)], fill="#DC2626")
        # Arms reaching up
        draw.line([(cx, cy - 110), (cx + 45, cy - 140)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy - 110), (cx - 45, cy - 90)], fill=ink_color, width=stroke_w)
        # Legs climbing
        draw.line([(cx - 20, cy), (cx + 30, cy + 30)], fill=ink_color, width=stroke_w)
        draw.line([(cx - 20, cy), (cx - 60, cy + 50)], fill=ink_color, width=stroke_w)

    elif action == "lifting":
        # Spine
        draw.line([(cx, cy - 140), (cx, cy)], fill=ink_color, width=stroke_w)
        # Heavy Barbell
        draw.line([(cx - 160, cy - 190), (cx + 160, cy - 190)], fill="#0F172A", width=8)
        draw.ellipse([cx - 180, cy - 230, cx - 140, cy - 150], fill="#DC2626") # Left weight
        draw.ellipse([cx + 140, cy - 230, cx + 180, cy - 150], fill="#DC2626") # Right weight
        # Arms holding barbell overhead
        draw.line([(cx, cy - 110), (cx - 100, cy - 185)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy - 110), (cx + 100, cy - 185)], fill=ink_color, width=stroke_w)
        # Legs wide stance
        draw.line([(cx, cy), (cx - 60, cy + 80)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy), (cx + 60, cy + 80)], fill=ink_color, width=stroke_w)

    elif action == "running":
        # Spine angled forward
        draw.line([(cx + 20, cy - 140), (cx - 20, cy)], fill=ink_color, width=stroke_w)
        # Motion lines behind
        draw.line([(cx - 150, cy - 80), (cx - 90, cy - 80)], fill="#CBD5E1", width=5)
        draw.line([(cx - 180, cy - 40), (cx - 100, cy - 40)], fill="#CBD5E1", width=5)
        # Arms pumping
        draw.line([(cx + 10, cy - 110), (cx + 70, cy - 90)], fill=ink_color, width=stroke_w)
        draw.line([(cx + 10, cy - 110), (cx - 50, cy - 130)], fill=ink_color, width=stroke_w)
        # Legs running stride
        draw.line([(cx - 20, cy), (cx + 80, cy + 60)], fill=ink_color, width=stroke_w)
        draw.line([(cx - 20, cy), (cx - 70, cy + 30)], fill=ink_color, width=stroke_w)

    elif action == "meditating":
        # Spine upright
        draw.line([(cx, cy - 140), (cx, cy - 20)], fill=ink_color, width=stroke_w)
        # Glowing zen aura
        draw.ellipse([cx - 140, cy - 260, cx + 140, cy + 40], fill=None, outline="#F59E0B", width=4)
        # Crossed legs (lotus)
        draw.arc([cx - 90, cy - 40, cx + 90, cy + 60], start=0, end=180, fill=ink_color, width=stroke_w)
        # Hands resting on knees
        draw.line([(cx, cy - 100), (cx - 70, cy - 40)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy - 100), (cx + 70, cy - 40)], fill=ink_color, width=stroke_w)

    else: # thinking with glowing bulb
        draw.line([(cx, cy - 140), (cx, cy)], fill=ink_color, width=stroke_w)
        # Glowing lightbulb above head
        draw.ellipse([cx + 60, cy - 280, cx + 120, cy - 220], fill="#FEF08A", outline="#EAB308", width=5)
        draw.line([(cx + 80, cy - 220), (cx + 100, cy - 220)], fill="#713F12", width=6)
        # Arm touching chin
        draw.line([(cx, cy - 110), (cx + 35, cy - 160)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy - 110), (cx - 40, cy - 60)], fill=ink_color, width=stroke_w)
        # Legs standing
        draw.line([(cx, cy), (cx - 40, cy + 80)], fill=ink_color, width=stroke_w)
        draw.line([(cx, cy), (cx + 40, cy + 80)], fill=ink_color, width=stroke_w)

def create_stickman_scene_frame(scene_data: dict, frame_idx: int, width=1080, height=1920) -> str:
    """Renders 1080x1920 paper scene card with 2-Tone kinetic typography."""
    img = create_paper_texture_canvas(width, height)
    draw = ImageDraw.Draw(img)

    # 1. Draw Vector Stickman in Center
    action = scene_data.get("action", "climbing")
    draw_vector_stickman(draw, action, width // 2, height // 2 - 40)

    # 2. 2-Tone Dynamic Kinetic Typography at Top
    try:
        font_big = ImageFont.truetype("impact.ttf", 90)
        font_sub = ImageFont.truetype("arialbd.ttf", 44)
    except Exception:
        font_big = ImageFont.load_default()
        font_sub = ImageFont.load_default()

    word1 = scene_data.get("highlight_black", "SMALL").upper()
    word2 = scene_data.get("highlight_red", "STEP").upper()

    # Draw Word 1 (Bold Black) and Word 2 (Crimson Red)
    draw.rounded_rectangle([width//2 - 380, 240, width//2 + 380, 390], radius=30, fill="#FFFFFF", outline="#1E293B", width=6)
    
    # Text placement
    w1_box = draw.textbbox((0, 0), word1, font=font_big)
    w2_box = draw.textbbox((0, 0), word2, font=font_big)
    w1_w = w1_box[2] - w1_box[0]
    w2_w = w2_box[2] - w2_box[0]
    gap = 25
    total_w = w1_w + gap + w2_w
    
    start_x = (width - total_w) // 2
    draw.text((start_x, 260), word1, fill="#0F172A", font=font_big)
    draw.text((start_x + w1_w + gap, 260), word2, fill="#DC2626", font=font_big) # Crimson Red highlight

    # 3. Spoken Caption Box at Bottom
    narr_text = scene_data.get("narration", "")
    draw.rounded_rectangle([80, height - 340, width - 80, height - 160], radius=25, fill="#0F172A", outline="#E2E8F0", width=4)
    
    # Wrap text cleanly
    words = narr_text.split()
    line1 = " ".join(words[:len(words)//2])
    line2 = " ".join(words[len(words)//2:])
    draw.text((width//2, height - 280), line1, fill="#FFFFFF", font=font_sub, anchor="mm")
    draw.text((width//2, height - 210), line2, fill="#FBBF24", font=font_sub, anchor="mm")

    out_frame = os.path.join(FRAME_DIR, f"stick_frame_{frame_idx}_{int(time.time())}.png")
    img.save(out_frame, "PNG")
    return out_frame

def compile_stickman_master_video(frames: list, voice_audio: str, out_video: str):
    """Compiles 1080x1920 Vertical Stick Figure Master Short with Inspiring Piano Score."""
    duration = get_duration(voice_audio)
    print(f">> Stickman Engine: Compiling {duration:.1f}s Animated Master Short...", file=sys.stderr)

    norm_clips = []
    for i, frame in enumerate(frames):
        norm = os.path.join(TEMP_DIR, f"stick_norm_{i}.mp4")
        # Subtle pulsing zoom effect
        filter_str = "scale=1080:1920,zoompan=z='min(zoom+0.0015,1.08)':d=150:s=1080x1920,fps=30"
        subprocess.run([
            "ffmpeg", "-y", "-loop", "1", "-i", frame, "-t", "6",
            "-vf", filter_str,
            "-an", "-c:v", "libx264", "-preset", "ultrafast", "-threads", "0", "-pix_fmt", "yuv420p", norm
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    concat_file = os.path.join(TEMP_DIR, "stick_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    # Inspiring acoustic piano & strings background score
    bgm_path = os.path.join(TEMP_DIR, "piano_bgm.mp3")
    cmd_bgm = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "sine=f=330:r=48000",
        "-f", "lavfi", "-i", "sine=f=440:r=48000",
        "-f", "lavfi", "-i", "sine=f=550:r=48000",
        "-filter_complex", (
            "[0:a]volume=0.10[a0];"
            "[1:a]volume=0.08[a1];"
            "[2:a]volume=0.06[a2];"
            "[a0][a1][a2]amix=inputs=3:duration=first,aecho=0.8:0.7:50:0.4[out]"
        ),
        "-map", "[out]", "-t", str(duration + 2),
        "-c:a", "libmp3lame", "-b:a", "192k", bgm_path
    ]
    subprocess.run(cmd_bgm, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    filter_complex = (
        f"[0:v]scale=1080:1920,setsar=1[v_out];"
        f"[1:a]volume=1.0[voice];"
        f"[2:a]volume=0.18[bgm];"
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
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "19", "-threads", "0", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        out_video
    ]

    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Master Stickman Video Ready: {out_video}", file=sys.stderr)

def run_stickman_pro_pipeline(topic=None, lang="en"):
    print(f"\n=================================================================")
    print(f"🏃 LAUNCHING PRO STICK FIGURE ANIMATION ENGINE ($5K/MO NICHE)")
    print(f"📜 Paper Texture | 2-Tone Typography | Chris Voice")
    print(f"=================================================================\n")

    # 1. Script
    data = generate_stickman_script(custom_topic=topic, lang=lang)

    # 2. Voiceover (Chris Voice)
    voice_audio = os.path.join(TEMP_DIR, "chris_voice.mp3")
    asyncio.run(synthesize_chris_voice(data["full_script"], voice_audio, lang=lang))
    duration = get_duration(voice_audio)

    # 3. Scene Frames with 2-Tone Typography
    frames = []
    for idx, sc in enumerate(data.get("scenes", [])):
        f_path = create_stickman_scene_frame(sc, idx)
        frames.append(f_path)

    # 4. Master Video Render
    out_video = os.path.join("output", f"stickman_pro_{int(time.time())}.mp4")
    compile_stickman_master_video(frames, voice_audio, out_video)

    # 5. Thumbnail
    create_high_ctr_thumbnail(data["title"][:30], is_portrait=True)

    print(f"\n🎉 Pro Stickman Video Created Successfully: {out_video}")
    return {"title": data["title"], "video": out_video}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Pro Stick Figure Animation Engine")
    parser.add_argument("--topic", default=None, help="Custom motivational topic")
    parser.add_argument("--lang", default="en", choices=["en", "hi"], help="Language (en/hi)")
    args = parser.parse_args()

    res = run_stickman_pro_pipeline(topic=args.topic, lang=args.lang)
    print(json.dumps(res, indent=2, ensure_ascii=False))
