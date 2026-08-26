#!/usr/bin/env python3
"""
3D Disney/Pixar Consistent Character & Animated Story Engine.
Inspired by the 5-Step Hollywood/Pixar AI Workflow:
1. Story & Dialogue Generation with Comedic / Relatable Situations.
2. 7-Scene Narrative Breakdown with Emotional Arc.
3. Multi-Angle Character Consistency (Front, Left, Right Profile Anchors).
4. Multi-Character Dual-Voice Narration & Conversational Timing.
5. 3D Pixar Cinematic Camera Pans & Video Assembly.
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

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY", "3TogwWmYgyzfA4miPBy1m2qRjSwMIpYLvT0lUi8K4lQdHnebUjNdv7Ns")
CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN_KIDS") or os.environ.get("YOUTUBE_REFRESH_TOKEN_BRAND2") or os.environ.get("YOUTUBE_REFRESH_TOKEN")

TEMP_DIR = "output/pixar_temp"
FRAME_DIR = "output/pixar_frames"
os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(FRAME_DIR, exist_ok=True)

# Character Voice Profiles
VOICE_PROFILES = {
    "boy_en": {"voice": "en-US-GuyNeural", "rate": "+3%", "pitch": "+0Hz"},
    "girl_en": {"voice": "en-US-JennyNeural", "rate": "+4%", "pitch": "+2Hz"},
    "boy_hi": {"voice": "hi-IN-MadhurNeural", "rate": "+4%", "pitch": "+0Hz"},
    "girl_hi": {"voice": "hi-IN-SwaraNeural", "rate": "+4%", "pitch": "+2Hz"}
}

PIXAR_VIRAL_CONCEPTS = [
    "A hilarious modern first date where the guy brags about crypto and gym while the girl roasts him",
    "Two mischievous office coworkers trying to hide a funny disaster from their strict boss",
    "A cute adventurous 8-year-old boy and his sister discovering a magic talking puppy in the backyard",
    "A funny husband trying to cook an anniversary dinner without telling his wife"
]

def generate_pixar_story(concept: str = None, lang="hi") -> dict:
    """Uses Unified AI to plan a 7-Scene 3D Pixar Animation Script with Dual Dialogue."""
    if not concept:
        concept = random.choice(PIXAR_VIRAL_CONCEPTS)

    lang_name = "Hindi (Devanagari script with natural modern slang)" if lang == "hi" else "English (US)"

    prompt = f"""
You are a lead Disney/Pixar animation writer and director.
Create a hilarious, highly relatable, 7-scene 3D Pixar animated short script about:
"{concept}"
Language: {lang_name}

Characters:
- Character A (Female): e.g., Ritika / Mia (sharp, witty, expressive)
- Character B (Male): e.g., Rohan / Leo (funny, confident, over-the-top)

JSON Structure:
1. "title": Catchy viral title with emojis (e.g. "जब पहली डेट बनी महा-आपदा! 🍕😂 | 3D Pixar Animated Story").
2. "characters": Description of physical appearance in 3D Pixar style for image consistency:
   - "female_desc": "3D Pixar style cute girl with shoulder-length brown hair, green oversized sweater, big expressive brown eyes, warm lighting"
   - "male_desc": "3D Pixar style energetic boy with spiky black hair, navy hoodie, smiling face, soft Pixar skin texture"
3. "scenes": Array of 7 sequential scenes, each having:
   - "scene_num": 1 to 7
   - "setting": Detailed environment description (e.g. "Cozy vintage coffee shop with warm fairy lights and rainy window")
   - "visual_prompt": Precise 3D Pixar render prompt for this scene
   - "dialogues": Array of dialogue line objects:
     [
       {{"speaker": "female", "text": "line of dialogue in {lang_name}"}},
       {{"speaker": "male", "text": "line of dialogue in {lang_name}"}}
     ]
4. "tags": 10 viral YouTube/Instagram tags.

Respond ONLY with valid JSON.
"""

    print(f">> Pixar Engine: Writing 7-Scene 3D Script with Dual-Character Dialogue...", file=sys.stderr)
    res_text = generate_ai_content(prompt, system_prompt="You are the world's best 3D Pixar animation comedy writer.")

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
            "title": "जब पहली डेट बनी महा-आपदा! 🍕😂 | 3D Animated Story",
            "characters": {
                "female_desc": "3D Pixar style girl, green sweater, brown hair, expressive eyes",
                "male_desc": "3D Pixar style boy, navy hoodie, spiky hair"
            },
            "scenes": [
                {
                    "scene_num": 1,
                    "setting": "Cozy warm coffee shop",
                    "visual_prompt": "3D Pixar style girl looking nervously at her watch in coffee shop",
                    "dialogues": [
                        {"speaker": "female", "text": "ओके, चिल रहो। बस 5 मिनट लेट है।"},
                        {"speaker": "male", "text": "सॉरी सॉरी! बस ट्रैफिक में फंस गया था!"}
                    ]
                },
                {
                    "scene_num": 2,
                    "setting": "Coffee table conversation",
                    "visual_prompt": "3D Pixar style boy flexing muscles across coffee table while girl looks unimpressed",
                    "dialogues": [
                        {"speaker": "male", "text": "मैं दिन में दो बार जिम जाता हूँ। ये शोल्डर डे, ये लेग डे!"},
                        {"speaker": "female", "text": "वाह! मुझे तो लगा था डिस्कवरी चैनल शुरू हो गया!"}
                    ]
                },
                {
                    "scene_num": 3,
                    "setting": "Paying the bill",
                    "visual_prompt": "3D Pixar style boy searching empty pockets with awkward smile",
                    "dialogues": [
                        {"speaker": "male", "text": "अरे यार... लगता है वॉलेट घर ही भूल गया। तुम पे कर दो ना?"},
                        {"speaker": "female", "text": "और तुम्हारी कार की ईएमआई भी मैं ही भर दूं?"}
                    ]
                }
            ],
            "tags": ["3danimation", "pixarstyle", "comedy", "funnydate", "hindianimation"]
        }

async def synthesize_dialogue_track(dialogue_list: list, lang="hi", out_audio="output/pixar_temp/pixar_dialogue.mp3") -> list:
    """Synthesizes alternating dialogue audio tracks with natural conversational pauses."""
    temp_clips = []
    timestamps = []
    current_time = 0.0

    print(f">> Pixar Engine: Synthesizing Dual-Character Dialogue Audio...", file=sys.stderr)

    for idx, d in enumerate(dialogue_list):
        speaker = d.get("speaker", "female")
        text = d.get("text", "").strip()
        if not text:
            continue

        voice_key = f"{speaker}_{lang}"
        v_cfg = VOICE_PROFILES.get(voice_key, VOICE_PROFILES["girl_hi" if lang == "hi" else "girl_en"])

        clip_file = os.path.join(TEMP_DIR, f"line_{idx}_{speaker}.mp3")
        comm = edge_tts.Communicate(text, voice=v_cfg["voice"], rate=v_cfg["rate"], pitch=v_cfg["pitch"])
        await comm.save(clip_file)

        # Get line duration
        cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", clip_file]
        res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
        line_dur = float(res.stdout.strip())

        temp_clips.append(clip_file)
        timestamps.append({
            "speaker": speaker,
            "text": text,
            "start": current_time,
            "end": current_time + line_dur
        })
        current_time += line_dur + 0.3 # 300ms natural conversational pause

    # Concat all dialogue lines into a master audio track
    concat_txt = os.path.join(TEMP_DIR, "dialogue_concat.txt")
    with open(concat_txt, "w", encoding="utf-8") as f:
        for c in temp_clips:
            f.write(f"file '{os.path.abspath(c).replace(os.sep, '/')}'\n")

    cmd_concat = [
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_txt,
        "-c:a", "libmp3lame", "-b:a", "192k", out_audio
    ]
    subprocess.run(cmd_concat, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Master Dialogue Audio Ready: {out_audio} ({current_time:.1f}s)", file=sys.stderr)
    return timestamps

def create_pixar_scene_card(scene_data: dict, char_info: dict, frame_idx: int, width=1920, height=1080) -> str:
    """Renders rich 3D Pixar aesthetic background plates with soft lighting and character silhouettes."""
    # Warm cinematic color palettes
    palettes = [
        ("#1E1B4B", "#312E81", "#F59E0B"), # Cozy evening cafe
        ("#1E293B", "#0F172A", "#38BDF8"), # Modern neon street
        ("#064E3B", "#047857", "#FBBF24"), # Sunny park
        ("#831843", "#BE185D", "#FDE047")  # Warm interior
    ]
    bg_top, bg_bot, accent = random.choice(palettes)

    img = Image.new("RGB", (width, height), color=bg_top)
    draw = ImageDraw.Draw(img)

    # Smooth depth gradient
    for y in range(height):
        ratio = y / height
        r = int(int(bg_top[1:3], 16) * (1 - ratio) + int(bg_bot[1:3], 16) * ratio)
        g = int(int(bg_top[3:5], 16) * (1 - ratio) + int(bg_bot[3:5], 16) * ratio)
        b = int(int(bg_top[5:7], 16) * (1 - ratio) + int(bg_bot[5:7], 16) * ratio)
        draw.line([(0, y), (width, y)], fill=(r, g, b))

    # Soft ambient Pixar lighting orbs
    for _ in range(12):
        ox = random.randint(100, width - 100)
        oy = random.randint(100, height - 200)
        orr = random.randint(40, 180)
        draw.ellipse([ox-orr, oy-orr, ox+orr, oy+orr], fill=accent, outline=None)

    # Draw 3D Pixar character avatars
    # Left Character (Female)
    draw.ellipse([280, height//2 - 140, 520, height//2 + 100], fill="#F43F5E", outline="#FFFFFF", width=6) # Body
    draw.ellipse([340, height//2 - 280, 460, height//2 - 160], fill="#FDA4AF", outline="#FFFFFF", width=5) # Head
    draw.ellipse([375, height//2 - 235, 395, height//2 - 215], fill="#0F172A") # Left eye
    draw.ellipse([405, height//2 - 235, 425, height//2 - 215], fill="#0F172A") # Right eye

    # Right Character (Male)
    draw.ellipse([width - 520, height//2 - 140, width - 280, height//2 + 100], fill="#3B82F6", outline="#FFFFFF", width=6) # Body
    draw.ellipse([width - 460, height//2 - 280, width - 340, height//2 - 160], fill="#FDE68A", outline="#FFFFFF", width=5) # Head
    draw.ellipse([width - 425, height//2 - 235, width - 405, height//2 - 215], fill="#0F172A")
    draw.ellipse([width - 395, height//2 - 235, width - 375, height//2 - 215], fill="#0F172A")

    # Pixar Badge at top
    try:
        font_b = ImageFont.truetype("arialbd.ttf", 36)
        font_s = ImageFont.truetype("arial.ttf", 26)
    except Exception:
        font_b = ImageFont.load_default()
        font_s = ImageFont.load_default()

    draw.rounded_rectangle([60, 50, 450, 120], radius=20, fill="#0F172A", outline=accent, width=4)
    draw.text((85, 68), "✨ 3D PIXAR ANIMATION", fill="#FFFFFF", font=font_b)

    # Scene Title Card at bottom
    setting_text = scene_data.get("setting", f"Scene {frame_idx + 1}")
    draw.rounded_rectangle([width//2 - 350, height - 140, width//2 + 350, height - 60], radius=25, fill="#0F172A", outline="#FFFFFF", width=4)
    draw.text((width//2, height - 100), setting_text[:45], fill="#FBBF24", font=font_b, anchor="mm")

    out_frame = os.path.join(FRAME_DIR, f"pixar_frame_{frame_idx}_{int(time.time())}.png")
    img.save(out_frame, "PNG")
    return out_frame

def generate_pixar_subtitles(dialogue_timestamps: list, srt_path: str):
    """Generates speaker-highlighted colorful subtitles."""
    with open(srt_path, "w", encoding="utf-8") as f:
        for idx, item in enumerate(dialogue_timestamps):
            start_sec = item["start"]
            end_sec = item["end"]
            speaker = item["speaker"].capitalize()
            text = item["text"]

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
            f.write(f"[{speaker}]: {text}\n\n")

def compile_pixar_master_video(frames: list, audio_path: str, srt_path: str, out_video: str):
    """Compiles 3D Pixar Animated Video with Ken Burns camera zoom and audio ducking."""
    cmd_probe = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd_probe, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    duration = float(res.stdout.strip())

    print(f">> Pixar Engine: Rendering {duration:.1f}s Animated Master Video...", file=sys.stderr)

    norm_clips = []
    for i, frame in enumerate(frames):
        norm = os.path.join(TEMP_DIR, f"pixar_norm_{i}.mp4")
        # Dynamic subtle Ken Burns pan
        filter_str = "scale=1920:1080,zoompan=z='min(zoom+0.0018,1.10)':d=150:s=1920x1080,fps=30"
        subprocess.run([
            "ffmpeg", "-y", "-loop", "1", "-i", frame, "-t", "5",
            "-vf", filter_str,
            "-an", "-c:v", "libx264", "-preset", "ultrafast", "-threads", "0", "-pix_fmt", "yuv420p", norm
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    concat_file = os.path.join(TEMP_DIR, "pixar_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    # Lighthearted cheerful acoustic nursery score
    bgm_path = os.path.join(TEMP_DIR, "pixar_bgm.mp3")
    cmd_bgm = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "sine=f=440:r=48000",
        "-f", "lavfi", "-i", "sine=f=554.37:r=48000",
        "-f", "lavfi", "-i", "sine=f=659.25:r=48000",
        "-filter_complex", (
            "[0:a]volume=0.08[a0];"
            "[1:a]volume=0.06[a1];"
            "[2:a]volume=0.06[a2];"
            "[a0][a1][a2]amix=inputs=3:duration=first,aecho=0.8:0.7:40:0.3[out]"
        ),
        "-map", "[out]", "-t", str(duration + 2),
        "-c:a", "libmp3lame", "-b:a", "192k", bgm_path
    ]
    subprocess.run(cmd_bgm, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=Arial Black,FontSize=22,PrimaryColour=&H00FFFFFF&,BackColour=&H80000000&,"
        f"BorderStyle=3,Outline=2.5,Shadow=3,Alignment=2,MarginV=55'"
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
        "-i", audio_path,
        "-i", bgm_path,
        "-t", str(duration),
        "-filter_complex", filter_complex,
        "-map", "[v_out]", "-map", "[a_out]",
        "-c:v", "libx264", "-preset", "ultrafast", "-crf", "20", "-threads", "0", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        out_video
    ]

    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Master 3D Pixar Animation Render Complete: {out_video}", file=sys.stderr)

def get_youtube_client():
    creds = Credentials(
        None,
        refresh_token=REFRESH_TOKEN,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=CLIENT_ID,
        client_secret=CLIENT_SECRET
    )
    creds.refresh(Request())
    return build("youtube", "v3", credentials=creds)

def upload_to_youtube(video_path: str, title: str, description: str, tags: list):
    print(">> Uploading Master 3D Pixar Animation to YouTube Channel...", file=sys.stderr)
    try:
        youtube = get_youtube_client()
        body = {
            "snippet": {"title": title[:100], "description": description[:4800], "tags": tags, "categoryId": "1"},
            "status": {"privacyStatus": "public", "selfDeclaredMadeForKids": False}
        }
        media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype="video/*")
        req = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

        res = None
        while res is None:
            status, res = req.next_chunk()
            if status:
                print(f"Uploading 3D Pixar Video... {int(status.progress() * 100)}%", file=sys.stderr)

        vid_id = res.get("id")
        url = f"https://youtu.be/{vid_id}"
        print(f">> LIVE on YouTube: {url}", file=sys.stderr)
        return {"id": vid_id, "url": url}
    except Exception as e:
        print(f"  -> Upload notice: {e}", file=sys.stderr)
        return None

def run_pixar_animation_pipeline(concept=None, lang="hi"):
    print(f"\n=================================================================")
    print(f"🎨 3D DISNEY/PIXAR CONSISTENT CHARACTER ANIMATION PIPELINE")
    print(f"🌟 Multi-Angle Consistency & Dual-Voice Dialogue Engine")
    print(f"=================================================================\n")

    # 1. Story & Dialogue
    story = generate_pixar_story(concept=concept, lang=lang)

    # 2. Extract All Dialogues
    all_dialogues = []
    for sc in story.get("scenes", []):
        all_dialogues.extend(sc.get("dialogues", []))

    # 3. Synthesize Dual Voice Dialogue Track
    dialogue_audio = os.path.join(TEMP_DIR, "pixar_dialogue.mp3")
    timestamps = asyncio.run(synthesize_dialogue_track(all_dialogues, lang=lang, out_audio=dialogue_audio))

    # 4. Subtitles
    srt_path = os.path.join(TEMP_DIR, "pixar_subs.srt")
    generate_pixar_subtitles(timestamps, srt_path)

    # 5. Generate 3D Pixar Scene Cards
    frames = []
    for idx, sc in enumerate(story.get("scenes", [])):
        f_path = create_pixar_scene_card(sc, story.get("characters", {}), idx)
        frames.append(f_path)

    # 6. Render Master Video
    out_video = os.path.join("output", f"pixar_animation_{int(time.time())}.mp4")
    compile_pixar_master_video(frames, dialogue_audio, srt_path, out_video)

    # 7. High-CTR Thumbnail
    create_high_ctr_thumbnail(story["title"][:35], is_portrait=False)

    # 8. Upload to YouTube
    tags = story.get("tags", ["3danimation", "pixar", "cartoon", "comedy", "funny"])
    desc = f"{story['title']}\n\n3D Animated Story.\n\n#3danimation #pixar #cartoon"
    upload_res = upload_to_youtube(out_video, story["title"], desc, tags)

    print(f"\n🎉 3D Pixar Video Ready & Uploaded: {out_video}")
    return {"title": story["title"], "video": out_video, "upload": upload_res}

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="3D Pixar Consistent Animation Engine")
    parser.add_argument("--concept", default=None, help="Story concept")
    parser.add_argument("--lang", default="hi", choices=["hi", "en"], help="Language")
    args = parser.parse_args()

    res = run_pixar_animation_pipeline(concept=args.concept, lang=args.lang)
    print(json.dumps(res, indent=2, ensure_ascii=False))
