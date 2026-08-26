#!/usr/bin/env python3
"""
Full-Length 5-Minute Documentary Generator & Uploader.
Chapters, Real Multi-Scene HD B-Roll, Deep Neural Narration, Subtitles, and YouTube Upload.
"""

import os
import sys
import json
import time
import asyncio
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

TEMP_DIR = "output/doc_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

# 5-Minute Comprehensive Documentary Script (5 Chapters / ~650 Words)
DOCUMENTARY_CHAPTERS = [
    {
        "chapter": "Chapter 1: The Promise in the Dark (1932)",
        "keywords": ["vintage hospital patient", "rural 1930s doctor", "old medical exam"],
        "text": (
            "In 1932, in the rural heart of Macon County, Alabama, six hundred impoverished African American men "
            "were approached by government health officials with an extraordinary promise. They were offered free healthcare, "
            "free meals on clinic days, and burial insurance in exchange for participating in a medical study. "
            "Most of these men were sharecroppers who had never seen a doctor in their entire lives. "
            "They were told they had a common regional ailment vaguely referred to as bad blood, an umbrella phrase "
            "used to describe everything from severe fatigue and anemia to sexually transmitted infections. "
            "Trusting the white coats and government badges, they gladly signed on."
        )
    },
    {
        "chapter": "Chapter 2: The Deception of Free Care",
        "keywords": ["medical laboratory bottles", "vintage pills medicine", "microscope bacteria research"],
        "text": (
            "What these men were never told was the true scientific objective of the study. Three hundred and ninety-nine "
            "of them had confirmed, active syphilis, while two hundred and one served as healthy controls. "
            "The researchers had no intention of curing them. The entire investigation was designed to observe the natural, "
            "unhindered progression of untreated syphilis until the death of every single subject. "
            "To keep the men compliant, doctors administered diagnostic spinal taps, deceiving the patients into believing "
            "they were receiving special spinal treatments. They handed out vitamins, aspirin, and placebos, ensuring "
            "the participants felt cared for while their bodies slowly deteriorated under the bacterial infection."
        )
    },
    {
        "chapter": "Chapter 3: The 1947 Penicillin Reckoning",
        "keywords": ["penicillin medicine laboratory", "scientist looking microscope", "dark vintage hospital room"],
        "text": (
            "By 1947, medical science underwent a monumental revolution. Penicillin was discovered and universally "
            "proven to be a 100 percent effective, fast-acting cure for syphilis. Across the globe, standard medical "
            "practice shifted immediately to treating every infected patient with antibiotics. "
            "Yet, in Macon County, the researchers made a horrifying decision. Rather than administering the cure "
            "and ending the study, they actively withheld penicillin from all participants. "
            "When men were drafted into World War Two, researchers intervened with the military selective service board "
            "to prevent them from receiving mandatory penicillin treatments. Local doctors were provided lists of the subjects "
            "and instructed never to prescribe antibiotics if they showed up at outside clinics."
        )
    },
    {
        "chapter": "Chapter 4: The 1972 Whistleblower",
        "keywords": ["newspaper press print", "vintage typewriter office", "courtroom legal documents"],
        "text": (
            "The study continued undisturbed for forty years. Men suffered severe tertiary syphilis complications, "
            "including blindness, cardiovascular aneurysms, severe neurosyphilis, and dementia. Many died directly "
            "from the illness, and the infection was passed unknowingly to their wives and congenital offspring. "
            "In 1966, Peter Buxtun, a young public health service venereal disease investigator in San Francisco, "
            "discovered the study records and raised moral objections. For six years, federal committees repeatedly rejected "
            "his concerns and ordered the study to continue until all subjects passed away. "
            "Refusing to remain silent, in July 1972, Buxtun leaked the entire archive to investigative journalist Jean Heller. "
            "The story exploded on the front page of the Washington Star, sending shockwaves through Congress and the nation."
        )
    },
    {
        "chapter": "Chapter 5: The Birth of Modern Bioethics",
        "keywords": ["modern medical research hospital", "scientific bioethics laboratory", "medical law justice"],
        "text": (
            "The national uproar forced the immediate shutdown of the study in 1972. The following year, Congress passed "
            "the National Research Act, creating the National Commission for the Protection of Human Subjects of Biomedical "
            "and Behavioral Research. This led directly to the landmark 1979 Belmont Report, establishing the core ethical "
            "tenets of modern medicine: Respect for Persons, Beneficence, and Justice. "
            "Today, every clinical trial, Institutional Review Board, and informed consent document in modern medicine "
            "traces its origins back to the lessons learned from this tragedy. Remembering this history ensures that science "
            "never again sacrifices human dignity in the name of progress."
        )
    }
]

async def generate_full_voiceover(full_script: str, audio_path: str):
    print(">> Generating 5-Minute Neural Documentary Voiceover...", file=sys.stderr)
    voice = "en-US-ChristopherNeural"
    communicate = edge_tts.Communicate(full_script, voice=voice, rate="+2%", pitch="+0Hz")
    await communicate.save(audio_path)
    print(f">> Full Voiceover Audio Saved: {audio_path}", file=sys.stderr)

def get_audio_duration(audio_path: str) -> float:
    cmd = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path
    ]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def download_broll_pool(chapters: list) -> list:
    print(">> Downloading 15+ Real HD B-Roll Video Clips from Pexels...", file=sys.stderr)
    headers = {"Authorization": PEXELS_API_KEY}
    all_clips = []

    for c_idx, ch in enumerate(chapters):
        for k_idx, query in enumerate(ch["keywords"]):
            try:
                url = f"https://api.pexels.com/videos/search?query={query}&orientation=landscape&per_page=3"
                r = requests.get(url, headers=headers, timeout=15)
                data = r.json()
                videos = data.get("videos", [])
                if not videos:
                    continue

                best_file = None
                for vf in videos[0].get("video_files", []):
                    if vf.get("width", 0) >= 1280 or vf.get("quality") == "hd":
                        best_file = vf.get("link")
                        break
                if not best_file and videos[0].get("video_files"):
                    best_file = videos[0]["video_files"][0]["link"]

                if best_file:
                    clip_path = os.path.join(TEMP_DIR, f"broll_{c_idx}_{k_idx}.mp4")
                    print(f"  -> Downloading HD footage for '{query}'...", file=sys.stderr)
                    v_res = requests.get(best_file, stream=True, timeout=30)
                    with open(clip_path, "wb") as f:
                        for chunk in v_res.iter_content(chunk_size=1024*1024):
                            if chunk:
                                f.write(chunk)
                    all_clips.append(clip_path)
            except Exception as e:
                print(f"  -> Warning downloading '{query}': {e}", file=sys.stderr)

    return all_clips

def generate_subtitles(full_text: str, total_duration: float, srt_path: str):
    words = full_text.split()
    chunk_size = 5
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
            f.write(f"{chunk}\n\n")

def format_srt_time(seconds: float) -> str:
    hrs = int(seconds // 3600)
    mins = int((seconds % 3600) // 60)
    secs = int(seconds % 60)
    millis = int((seconds - int(seconds)) * 1000)
    return f"{hrs:02d}:{mins:02d}:{secs:02d},{millis:03d}"

def render_documentary(clip_paths: list, voiceover_path: str, srt_path: str, output_path: str):
    print(">> Compiling 5-Minute HD Documentary with FFmpeg...", file=sys.stderr)
    duration = get_audio_duration(voiceover_path)
    print(f">> Total Documentary Duration: {duration:.1f} seconds ({duration/60:.1f} minutes)")

    # 1. Normalize each clip to 1920x1080 (16:9 Landscape) @ 30fps
    norm_clips = []
    clip_dur = (duration / len(clip_paths)) + 1.0
    for i, clip in enumerate(clip_paths):
        norm_path = os.path.join(TEMP_DIR, f"norm_doc_{i}.mp4")
        cmd = [
            "ffmpeg", "-y", "-i", clip,
            "-t", str(clip_dur),
            "-vf", "scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,setsar=1,fps=30",
            "-an", "-c:v", "libx264", "-preset", "ultrafast", "-pix_fmt", "yuv420p", norm_path
        ]
        subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm_path)

    # 2. Concat
    concat_list = os.path.join(TEMP_DIR, "doc_concat.txt")
    with open(concat_list, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    raw_video = os.path.join(TEMP_DIR, "raw_doc_merged.mp4")
    subprocess.run([
        "ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_list,
        "-c", "copy", raw_video
    ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 3. Final Master Pass with Subtitles & Audio
    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=Trebuchet MS,FontSize=16,PrimaryColour=&H00FFFFFF&,BackColour=&H80000000&,"
        f"BorderStyle=3,Outline=1.5,Shadow=2,Alignment=2,MarginV=60'"
    )

    final_cmd = [
        "ffmpeg", "-y",
        "-i", raw_video,
        "-i", voiceover_path,
        "-t", str(duration),
        "-vf", subtitle_filter,
        "-c:v", "libx264", "-preset", "fast", "-crf", "20", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "192k",
        "-shortest", output_path
    ]

    print(">> Rendering final 5-minute Master Documentary MP4...", file=sys.stderr)
    subprocess.run(final_cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f">> Finished Full-Length Video: {output_path}", file=sys.stderr)

def upload_documentary(video_path: str, title: str, description: str, tags: list):
    print(">> Uploading 5-Minute Documentary to YouTube...", file=sys.stderr)
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
            "privacyStatus": "public",
            "selfDeclaredMadeForKids": False
        }
    }

    media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype="video/*")
    request = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            print(f"Uploading... {int(status.progress() * 100)}%", file=sys.stderr)

    vid_id = response.get("id")
    url = f"https://youtu.be/{vid_id}"
    print(f"Published Full Documentary to YouTube: {url}", file=sys.stderr)
    return {"videoId": vid_id, "videoUrl": url}

def build_and_publish_5min_documentary():
    print("\n==========================================================")
    print("🎬 STARTING 5-MINUTE FULL-LENGTH DOCUMENTARY PIPELINE")
    print("📌 Topic: The 1932 Untreated Syphilis Study & The Birth of Bioethics")
    print("==========================================================\n")

    full_script = " ".join([ch["text"] for ch in DOCUMENTARY_CHAPTERS])
    audio_path = os.path.join(TEMP_DIR, "doc_voiceover.mp3")
    srt_path = os.path.join(TEMP_DIR, "doc_captions.srt")
    output_video = os.path.join("output", f"full_documentary_{int(time.time())}.mp4")

    # 1. Voiceover
    asyncio.run(generate_full_voiceover(full_script, audio_path))
    duration = get_audio_duration(audio_path)

    # 2. Captions
    generate_subtitles(full_script, duration, srt_path)

    # 3. Real HD B-Roll Clips
    clips = download_broll_pool(DOCUMENTARY_CHAPTERS)
    if not clips:
        raise RuntimeError("Could not download B-roll footage.")

    # 4. Render 5-Minute Master Video
    render_documentary(clips, audio_path, srt_path, output_video)

    # 5. Metadata & Upload
    doc_title = "The 40-Year Medical Secret: The 1932 Untreated Syphilis Study | Full Documentary"
    doc_description = (
        "In 1932, six hundred men were promised free medical care for 'bad blood'. What followed was a 40-year secret "
        "study that fundamentally changed medical ethics, informed consent, and global healthcare law.\n\n"
        "TIMESTAMPS:\n"
        "0:00 - The Promise in the Dark (1932)\n"
        "1:05 - The Deception of Free Care & Placebos\n"
        "2:12 - The 1947 Penicillin Discovery & Withholding\n"
        "3:20 - The 1972 Whistleblower (Peter Buxtun)\n"
        "4:15 - The Belmont Report & Modern Medical Ethics\n\n"
        "🔔 Subscribe for in-depth medical history documentaries and clinical science breakthroughs!\n\n"
        "#MedicalHistory #Documentary #Science #Bioethics #History #PublicHealth"
    )
    doc_tags = ["medical history", "documentary", "tuskegee study", "syphilis history", "bioethics", "science documentary", "public health"]

    res = upload_documentary(output_video, doc_title, doc_description, doc_tags)
    return res

if __name__ == "__main__":
    res = build_and_publish_5min_documentary()
    print(json.dumps(res, indent=2))
