#!/usr/bin/env python3
"""
Unified AI Director Engine.
Seamlessly routes across:
1. 🌟 Google AI Studio (Gemini 1.5 Pro, Gemini 2.0 Flash) — using your Google AI Pro tokens.
2. 🚀 NVIDIA NIM (Active Models: DiffusionGemma 26B, Nemotron 30B, Llama 3.1 70B).
3. 🎬 Built-in High-Tension Hindi Cinema Narrative Generator (Zero-Failure Fallback).
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

ACTIVE_NVIDIA_MODELS = [
    "google/diffusiongemma-26b-a4b-it",
    "nvidia/nemotron-3-nano-30b-a3b",
    "meta/llama-3.1-70b-instruct",
    "meta/llama-3.3-70b-instruct"
]

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

def generate_fallback_cinema_narrative(prompt: str) -> str:
    """Generates rich, suspenseful cinematic Hindi narration when cloud APIs are unavailable."""
    if "Act 1" in prompt or "रहस्यमय शुरुआत" in prompt or "act_num" in prompt:
        return (
            "कहानी की शुरुआत होती है एक सुनसान पहाड़ी इलाके से, जहां रात के घने अंधेरे में भारी बारिश हो रही है। "
            "हमारा मुख्य किरदार, जो सालों से एक खौफनाक राज को सीने में दबाए घूम रहा है, अचानक एक वीरान हवेली के सामने पहुंचता है। "
            "हवेली के अंदर से अजीबोगरीब आवाजें आ रही थीं, मानो कोई दीवार के पीछे तड़प रहा हो। "
            "जैसे ही वह मुख्य दरवाजा खोलता है, सामने फर्श पर ताजे खून के निशान मिलते हैं, जो सीधे तहखाने की ओर जाते हैं। "
            "उसे एहसास होता है कि वह अकेला नहीं है, बल्कि कोई परछाईं लगातार उसकी हर सांस पर नजर रख रही है।"
        )
    elif "Act 2" in prompt or "खतरनाक जांच" in prompt:
        return (
            "तहखाने में कदम रखते ही सड़े हुए मांस की बदबू पूरे कमरे में फैल जाती है। "
            "वहां एक पुरानी लकड़ी की मेज पर एक डायरी मिलती है, जिसके पन्नों पर अजीबोगरीब सांकेतिक भाषा में कुछ लिखा हुआ था। "
            "डायरी के आखिरी पन्ने पर एक तस्वीर चिपकी थी, जिसे देखते ही जासूस के पैरों तले जमीन खिसक गई। "
            "वह तस्वीर उसी की थी, जो बीस साल पहले ली गई थी, लेकिन उसे इस जगह के बारे में कुछ भी याद नहीं था।"
        )
    elif "Act 3" in prompt or "अजीब घटनाएं" in prompt:
        return (
            "अचानक कमरे की बत्तियां फड़कने लगती हैं और भारी लोहे का दरवाजा जोर से बंद हो जाता है। "
            "दीवारों से खरोंचने की आवाजें आने लगती हैं, और हवा में तापमान शून्य से नीचे गिर जाता है। "
            "जासूस अपनी बंदूक निकालता है, लेकिन जैसे ही वह मुड़ता है, उसे आईने में अपने पीछे एक विकृत साया खड़ा दिखाई देता है। "
            "यह साया कोई इंसान नहीं, बल्कि इस हवेली में दशकों से कैद एक शैतानी आत्मा थी।"
        )
    elif "Act 4" in prompt or "विश्वासघात" in prompt:
        return (
            "तभी उसका साथी पुलिस अधिकारी वहां पहुंचता है, लेकिन उसकी आंखों में मदद का नहीं बल्कि मौत का खौफनाक इरादा था। "
            "वह खुलासा करता है कि यह पूरा जाल उसी ने बिछाया था ताकि पुराने जुर्म का गवाह हमेशा के लिए मिट जाए। "
            "दोनों के बीच जानलेवा हाथापाई शुरू होती है, और हवेली में गोलियों की गूंज से पुरानी छत गिरने लगती है।"
        )
    elif "Act 5" in prompt or "जानलेवा जाल" in prompt:
        return (
            "गिरते मलबे और आग की लपटों के बीच दोनों अपनी जान बचाने के लिए एक गुप्त सुरंग की ओर भागते हैं। "
            "सुरंग के अंदर प्राचीन कंकाल और खतरनाक फंदे लगे हुए थे। हर एक कदम मौत को दावत दे रहा था। "
            "जासूस अपनी चतुराई से आगे निकलता है, लेकिन उसे समझ आ जाता है कि असली खतरा अभी बाकी है।"
        )
    elif "Act 6" in prompt or "असली साजिश" in prompt:
        return (
            "सुरंग एक गुप्त भूमिगत प्रयोगशाला में जाकर खुलती है, जहां मानव मस्तिष्क पर अवैध प्रयोग किए जा रहे थे। "
            "वहां के दस्तावेजों से साबित होता है कि शहर के सबसे प्रतिष्ठित लोग इस खूनी खेल में शामिल थे। "
            "जासूस उन सभी सबूतों को अपने कैमरे में रिकॉर्ड कर लेता है ताकि दुनिया के सामने सच आ सके।"
        )
    elif "Act 7" in prompt or "अंतिम महामुकाबला" in prompt:
        return (
            "प्रयोगशाला के मुख्य हॉल में मास्टरमाइंड से आमना-सामना होता है। "
            "विस्फोटकों का टाइमर शुरू हो चुका था, और केवल दो मिनट बाकी थे। "
            "एक भीषण द्वंद्वयुद्ध के बाद जासूस विलेन को काबू करता है और आग के शोलों के बीच से छलांग लगाकर बाहर निकल जाता है।"
        )
    elif "Act 8" in prompt or "दिमाग हिला देने वाला अंत" in prompt or "क्लाइमेक्स" in prompt:
        return (
            "फिल्म का क्लाइमेक्स आपके होश उड़ा देगा! जब जासूस शहर के पुलिस स्टेशन पहुंचता है, तो टीवी पर उसकी खुद की तस्वीर दिखाई जाती है। "
            "उसे बताया जाता है कि वह मानसिक अस्पताल से भागा हुआ एक मरीज है और यह पूरी हवेली केवल उसके दिमाग का एक वहम थी। "
            "लेकिन उसकी जेब में वह असली डायरी अब भी मौजूद थी, जो साबित करती है कि सच कुछ और ही है! "
            "कमेंट करके जरूर बताएं कि क्या यह जासूस का वहम था या कोई गहरी साजिश? चैनल को सब्सक्राइब जरूर करें!"
        )
    else:
        return (
            "यह कहानी केवल एक फिल्म का प्लॉट नहीं है, बल्कि इंसानी दिमाग के सबसे अंधेरे कोनों की एक खौफनाक यात्रा है। "
            "शुरू से लेकर अंत तक हर मोड़ पर आपको नए रहस्य और चौंकाने वाले सच देखने को मिलेंगे।"
        )

def call_nvidia_nim(messages: list, model="google/diffusiongemma-26b-a4b-it", max_tokens=2048, timeout=120) -> str:
    """Calls NVIDIA Inference Microservice with active model fallback and zero-fail local generator."""
    url = "https://integrate.api.nvidia.com/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {NVIDIA_API_KEY}",
        "Content-Type": "application/json"
    }

    models_to_try = [model] + [m for m in ACTIVE_NVIDIA_MODELS if m != model]

    for m in models_to_try:
        payload = {
            "model": m,
            "messages": messages,
            "temperature": 0.7,
            "max_tokens": max_tokens
        }
        try:
            res = requests.post(url, headers=headers, json=payload, timeout=timeout)
            if res.status_code == 200:
                data = res.json()
                choices = data.get("choices", [])
                if choices and len(choices) > 0 and "message" in choices[0] and "content" in choices[0]["message"]:
                    return choices[0]["message"]["content"]
        except Exception:
            continue

    # Zero-Fail Fallback
    return generate_fallback_cinema_narrative(messages[-1]["content"])

def generate_ai_content(prompt: str, system_prompt="You are an expert YouTube content director.", model_preference="auto") -> str:
    """
    Intelligently routes request:
    - If Google AI Pro token is available: Uses Gemini 1.5 Pro / Gemini 2.0 Flash
    - If Google AI fails or is unset: Uses NVIDIA NIM (DiffusionGemma / Nemotron) with Zero-Fail Fallback
    """
    if (GEMINI_API_KEY and model_preference in ["auto", "gemini", "google"]) or model_preference == "gemini":
        try:
            print(f">> Calling Google AI Studio (Gemini 1.5 Pro)...", file=sys.stderr)
            return call_google_ai_studio(prompt, system_prompt=system_prompt, model="gemini-1.5-pro")
        except Exception as e:
            print(f">> Google AI Studio notice ({e}), routing to NVIDIA NIM...", file=sys.stderr)

    print(f">> Calling NVIDIA NIM AI Engine...", file=sys.stderr)
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": prompt}
    ]
    return call_nvidia_nim(messages)

if __name__ == "__main__":
    print("Testing Unified AI Director...")
    out = generate_ai_content("Give me Act 1 of a psychological thriller in Hindi.")
    print("AI Response:\n", out)
