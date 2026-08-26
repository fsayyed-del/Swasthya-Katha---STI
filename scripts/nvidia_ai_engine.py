#!/usr/bin/env python3
"""
NVIDIA NIM AI Engine for Premium Scriptwriting, Scene Direction & Viral Metadata.
Powered by NVIDIA AI Foundation Endpoints (Llama 3.1 70B/405B, Nemotron 70B, DeepSeek R1).
"""

import os
import sys
import time
import json
import requests

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

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

NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "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")
NVIDIA_BASE_URL = "https://integrate.api.nvidia.com/v1/chat/completions"

def call_nvidia_nim(messages: list, model="meta/llama-3.1-70b-instruct", temperature=0.7, max_tokens=2048, timeout=180) -> str:
    """Calls NVIDIA Inference Microservice with the specified model, robust retries, and fallback."""
    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": temperature,
        "max_tokens": max_tokens
    }

    # Attempt primary model
    for attempt in range(2):
        try:
            response = requests.post(NVIDIA_BASE_URL, headers=headers, json=payload, timeout=timeout)
            if response.status_code == 200:
                data = response.json()
                return data["choices"][0]["message"]["content"]
            print(f">> NVIDIA NIM retry ({response.status_code}): {response.text[:100]}", file=sys.stderr)
        except Exception as e:
            print(f">> NVIDIA NIM connection warning (Attempt {attempt+1}): {e}", file=sys.stderr)
            time.sleep(2)

    # Fallback to ultra-fast 8B model if 70B times out
    print(">> Falling back to fast NVIDIA NIM 8B model...", file=sys.stderr)
    payload["model"] = "meta/llama-3.1-8b-instruct"
    response = requests.post(NVIDIA_BASE_URL, headers=headers, json=payload, timeout=120)
    if response.status_code != 200:
        raise RuntimeError(f"NVIDIA NIM Error {response.status_code}: {response.text}")
    return response.json()["choices"][0]["message"]["content"]

def generate_premium_script_with_nvidia(raw_transcript: str, channel: dict) -> dict:
    """Uses NVIDIA Llama 3.1 to generate high-retention script, B-roll prompts, and viral title."""
    lang = channel.get("language", "en")
    niche = channel.get("niche", "Entertainment")
    name = channel.get("name", "Channel")
    model_name = "meta/llama-3.1-70b-instruct"

    system_prompt = (
        "You are an elite YouTube content director and viral documentary scriptwriter. "
        "Your objective is to craft high-retention, high-RPM YouTube video scripts that maximize watch time. "
        "Avoid generic filler. Deliver pure narrative momentum, psychological hooks, and visual storytelling."
    )

    user_prompt = f"""
Target Channel: {name}
Channel Niche: {niche}
Target Language: {'Hindi (Devanagari script)' if lang == 'hi' else 'English'}
Reference Transcript / Topic:
\"\"\"{raw_transcript[:3000] if raw_transcript else 'Create a blockbuster storytelling piece on an incredible true mystery.'}\"\"\"

Generate a complete production package in valid JSON format with the following keys:
1. "title": A high-CTR viral title (under 90 chars).
2. "script": The spoken narration script (engaging storytelling, 250-400 words).
3. "broll_queries": A list of 4-6 precise stock video search queries for Pexels (in English, e.g. ["dark cinematic corridor", "vintage laboratory microscope", "dramatic detective silhouette"]).
4. "tags": A list of 6-8 viral keywords and search tags.

Respond ONLY with valid JSON.
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_prompt}
    ]

    print(f">> Generating Premium Script via NVIDIA NIM ({model_name})...", file=sys.stderr)
    raw_response = call_nvidia_nim(messages, model=model_name)

    try:
        clean_json = raw_response.strip()
        if "```json" in clean_json:
            clean_json = clean_json.split("```json")[1].split("```")[0].strip()
        elif "```" in clean_json:
            clean_json = clean_json.split("```")[1].split("```")[0].strip()
        return json.loads(clean_json, strict=False)
    except Exception as e:
        print(f">> JSON Parse fallback, using raw content: {e}", file=sys.stderr)
        return {
            "title": f"Incredible {niche} Explained",
            "script": raw_response,
            "broll_queries": ["cinematic suspense", "film camera", "dramatic lighting"],
            "tags": ["trending", "viral", "youtube"]
        }

if __name__ == "__main__":
    test_channel = {
        "id": "movies_hi",
        "name": "Filmy Kahani (Hindi)",
        "niche": "Movie Explanation in Hindi",
        "language": "hi"
    }
    res = generate_premium_script_with_nvidia("", test_channel)
    print(json.dumps(res, indent=2, ensure_ascii=False))
