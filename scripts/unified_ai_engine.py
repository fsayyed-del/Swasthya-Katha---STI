#!/usr/bin/env python3
"""
Unified AI Director Engine.
Seamlessly routes across:
1. 🌟 Google AI Studio (Gemini 1.5 Pro, Gemini 2.0 Flash) — using your Google AI Pro tokens.
2. 🚀 NVIDIA NIM (Llama 3.1 70B/8B, Nemotron 70B) — high-throughput fallback.
"""

import os
import sys
import json
import time
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

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY") or os.environ.get("GOOGLE_API_KEY") or os.environ.get("GOOGLE_GENERATIVE_AI_API_KEY")
NVIDIA_API_KEY = os.environ.get("NVIDIA_API_KEY", "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")

def call_google_ai_studio(prompt: str, system_prompt: str = None, model="gemini-1.5-pro", temperature=0.7) -> str:
    """Calls Google AI Studio / Gemini API directly via high-speed REST endpoint."""
    if not GEMINI_API_KEY:
        raise ValueError("GEMINI_API_KEY not configured in .env.local")

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={GEMINI_API_KEY}"
    headers = {"Content-Type": "application/json"}
    
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": 4096
        }
    }
    if system_prompt:
        payload["systemInstruction"] = {"parts": [{"text": system_prompt}]}

    res = requests.post(url, headers=headers, json=payload, timeout=90)
    if res.status_code != 200:
        raise RuntimeError(f"Google AI Studio Error {res.status_code}: {res.text}")
    
    data = res.json()
    return data["candidates"][0]["content"]["parts"][0]["text"]

def call_nvidia_nim(messages: list, model="meta/llama-3.1-70b-instruct", max_tokens=2048, timeout=120) -> str:
    """Calls NVIDIA Inference Microservice."""
    url = "https://integrate.api.nvidia.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Content-Type": "application/json"
    }
    payload = {
        "model": model,
        "messages": messages,
        "temperature": 0.7,
        "max_tokens": max_tokens
    }

    try:
        res = requests.post(url, headers=headers, json=payload, timeout=timeout)
        if res.status_code == 200:
            return res.json()["choices"][0]["message"]["content"]
    except Exception:
        pass

    # Fast 8B fallback
    payload["model"] = "meta/llama-3.1-8b-instruct"
    res = requests.post(url, headers=headers, json=payload, timeout=60)
    return res.json()["choices"][0]["message"]["content"]

def generate_ai_content(prompt: str, system_prompt="You are an expert YouTube content director.", model_preference="auto") -> str:
    """
    Intelligently routes request:
    - If Google AI Pro token is available: Uses Gemini 1.5 Pro / Gemini 2.0 Flash
    - If Google AI fails or is unset: Uses NVIDIA NIM Llama 3.1
    """
    if (GEMINI_API_KEY and model_preference in ["auto", "gemini", "google"]) or model_preference == "gemini":
        try:
            print(f">> Calling Google AI Studio (Gemini 1.5 Pro)...", file=sys.stderr)
            return call_google_ai_studio(prompt, system_prompt=system_prompt, model="gemini-1.5-pro")
        except Exception as e:
            print(f">> Google AI Studio notice ({e}), routing to NVIDIA NIM...", file=sys.stderr)

    print(f">> Calling NVIDIA NIM AI Engine (Llama 3.1)...", file=sys.stderr)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]
    return call_nvidia_nim(messages)

if __name__ == "__main__":
    print("Testing Unified AI Director...")
    out = generate_ai_content("Give me a 1-sentence viral hook for an AI documentary.")
    print("AI Response:", out)
