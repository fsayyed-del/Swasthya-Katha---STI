#!/usr/bin/env python3
"""
Multi-Language Auto-Dubbing Engine for Kids & Baby Channels.
Automatically translates and dubs kids videos into Tier-1 global languages:
- 🇺🇸 English (US / UK)
- 🇪🇸 Spanish (Latin America & Spain) - Mega Kids Market
- 🇧🇷 Portuguese (Brazil) - Mega Kids Market
- 🇫🇷 French (France / Canada)
- 🇩🇪 German
- 🇮🇳 Hindi

Preserves nursery rhythm, timing, cheerful sweet pitch, and subtitle sync.
"""

import os
import sys
import json
import time
import asyncio
import argparse
import subprocess

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
from kids_animation_engine import compile_kids_master_video, create_kids_character_frame, download_kids_footage, generate_kids_subtitles, get_duration

load_env()

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN_KIDS") or os.environ.get("YOUTUBE_REFRESH_TOKEN")

TEMP_DIR = "output/kids_dubbed_temp"
os.makedirs(TEMP_DIR, exist_ok=True)

# Voice profiles tailored for cheerful kids content per language
DUBBING_LANGUAGES = {
    "en": {"name": "English (US)", "voice": "en-US-JennyNeural", "rate": "+2%", "pitch": "+2Hz"},
    "es": {"name": "Spanish (Latin America)", "voice": "es-MX-DaliaNeural", "rate": "+2%", "pitch": "+2Hz"},
    "pt": {"name": "Portuguese (Brazil)", "voice": "pt-BR-FranciscaNeural", "rate": "+2%", "pitch": "+2Hz"},
    "fr": {"name": "French", "voice": "fr-FR-DeniseNeural", "rate": "+2%", "pitch": "+2Hz"},
    "de": {"name": "German", "voice": "de-DE-KatjaNeural", "rate": "+2%", "pitch": "+2Hz"},
    "hi": {"name": "Hindi", "voice": "hi-IN-SwaraNeural", "rate": "+2%", "pitch": "+2Hz"}
}

def translate_and_adapt_kids_script(original_script: str, original_title: str, target_lang_code: str) -> dict:
    """Uses Unified AI to translate and adapt nursery scripts preserving rhythm and rhyme."""
    lang_info = DUBBING_LANGUAGES.get(target_lang_code, DUBBING_LANGUAGES["es"])
    
    prompt = f"""
You are an expert children's song and story translator for international YouTube Kids channels.
Original English Title: "{original_title}"
Original English Script:
{original_script}

TASK:
Translate and culturally adapt this educational kids script into natural, cheerful {lang_info['name']}.
Requirements:
1. Preserve the rhythm, rhyme, simple child-friendly vocabulary, and joyful tone.
2. Keep the word count approximately the same so the timing matches the visuals.
3. Translate the title into a viral high-CTR kids title in {lang_info['name']}.

JSON Format:
{{
  "title": "Translated title with emojis",
  "script": "Full translated spoken narration text in {lang_info['name']}",
  "tags": ["5-8 tags in {lang_info['name']}"]
}}

Respond ONLY with valid JSON.
"""

    print(f">> Translating & Adapting Kids Script into {lang_info['name']}...", file=sys.stderr)
    res_text = generate_ai_content(prompt, system_prompt="You are the world's best international kids content translator.")

    try:
        clean = res_text.strip()
        if "```json" in clean:
            clean = clean.split("```json")[1].split("```")[0].strip()
        elif "```" in clean:
            clean = clean.split("```")[1].split("```")[0].strip()
        return json.loads(clean, strict=False)
    except Exception as e:
        print(f">> Translation fallback: {e}", file=sys.stderr)
        return {
            "title": f"{original_title} ({lang_info['name']})",
            "script": original_script,
            "tags": ["kidssongs", "learning", "toddlers"]
        }

async def synthesize_dubbed_voice(text: str, lang_code: str, out_path: str):
    lang_cfg = DUBBING_LANGUAGES.get(lang_code, DUBBING_LANGUAGES["en"])
    print(f">> Synthesizing Dubbed Studio Voice ({lang_cfg['name']} - {lang_cfg['voice']})...", file=sys.stderr)
    comm = edge_tts.Communicate(text, voice=lang_cfg["voice"], rate=lang_cfg["rate"], pitch=lang_cfg["pitch"])
    await comm.save(out_path)
    print(f">> Dubbed voice track saved: {out_path}", file=sys.stderr)

def produce_auto_dubbed_kids_video(topic="Learn Colors with Delicious Fruits and Magic Paint", target_languages=["en", "es"]):
    """Generates the master video in English, then auto-dubs it into requested target languages."""
    print(f"\n=================================================================")
    print(f"🌍 LAUNCHING AUTO-DUBBED MULTI-LANGUAGE KIDS EMPIRE PIPELINE")
    print(f"📌 Languages: {', '.join([DUBBING_LANGUAGES[l]['name'] for l in target_languages])}")
    print(f"=================================================================\n")

    # 1. Base English Script & Assets
    from kids_animation_engine import generate_kids_script
    base_data = generate_kids_script(category="learning", custom_topic=topic, duration_mins=2)

    # 2. Visual Assets (Reusable across all dubs)
    frames = [create_kids_character_frame(p, idx) for idx, p in enumerate(base_data.get("scene_prompts", ["Happy Fruits", "Rainbow", "Cute Puppy"])[:4])]
    clips = download_kids_footage(base_data.get("scene_prompts", ["cute animals", "colorful toys"]), target_count=6)

    dubbed_results = []

    for lang in target_languages:
        print(f"\n--- Generating Dub for {DUBBING_LANGUAGES[lang]['name']} ---")
        if lang == "en":
            t_data = base_data
        else:
            t_data = translate_and_adapt_kids_script(base_data["script"], base_data["title"], lang)

        # Voiceover
        v_path = os.path.join(TEMP_DIR, f"voice_{lang}.mp3")
        asyncio.run(synthesize_dubbed_voice(t_data["script"], lang, v_path))
        dur = get_duration(v_path)

        # Subtitles
        sub_path = os.path.join(TEMP_DIR, f"subs_{lang}.srt")
        generate_kids_subtitles(t_data["script"], dur, sub_path)

        # Master Video Render
        out_vid = os.path.join("output", f"kids_{lang}_{int(time.time())}.mp4")
        compile_kids_master_video(clips, frames, v_path, sub_path, is_lullaby=False, out_video=out_vid)

        dubbed_results.append({
            "language": DUBBING_LANGUAGES[lang]["name"],
            "title": t_data["title"],
            "video_path": out_vid
        })

    print("\n=================================================================")
    print("🎉 ALL DUBBED VERSIONS GENERATED SUCCESSFULLY!")
    for dr in dubbed_results:
        print(f"  • [{dr['language']}]: {dr['title']} -> {dr['video_path']}")
    print("=================================================================")
    return dubbed_results

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Multi-Language Kids Auto-Dubber")
    parser.add_argument("--topic", default="Learn Colors with Delicious Fruits and Magic Paint", help="Video topic")
    parser.add_argument("--langs", nargs="+", default=["en", "es"], choices=list(DUBBING_LANGUAGES.keys()), help="Target languages")
    args = parser.parse_args()

    produce_auto_dubbed_kids_video(topic=args.topic, target_languages=args.langs)
