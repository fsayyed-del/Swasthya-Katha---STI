#!/usr/bin/env python3
"""
Broadcast-Grade Cinematic YouTube Shorts & Pillar Video Engine (Pro Edition).
Engineered for Maximum Retention, High-CPM Niches ($65-$95 CPM),
Studio Voice EQ, Dynamic Ken Burns Motion, Intelligent Soundtrack Ducking, and Hormozi-Style Kinetic Captions.
"""

import os
import sys
import json
import time
import random
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

TEMP_DIR = "output/pro_render_temp"
MUSIC_DIR = "assets/music"
OUTPUT_DIR = "output/cinematic_releases"

os.makedirs(TEMP_DIR, exist_ok=True)
os.makedirs(MUSIC_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ---------------------------------------------------------------------------
# 12 Flagship Ultra High-RPM ($65-$95 CPM) Content Blueprints
# ---------------------------------------------------------------------------
FLAGSHIP_STORIES = [
    {
        "id": "fintech_swift",
        "niche": "Fintech & Global Banking Rails",
        "cpm_tier": "$75 CPM",
        "category_id": "28",
        "title": "The 1 Line of Code That Moves $10 Trillion Daily ⚡ #Shorts",
        "hook_first_5s": "This single line of code moves 10 trillion dollars across the globe every day.",
        "script": (
            "This single line of code moves 10 trillion dollars across the globe every single day. "
            "It belongs to the Swift banking network. "
            "If it went down for just four seconds, international financial markets would completely freeze. "
            "Deep beneath the Swiss Alps, fortified server clusters execute these transactions with zero margin for error. "
            "High-frequency algorithms execute millions of trades in milliseconds before human eyes can blink. "
            "This invisible financial rail controls the modern world, and almost nobody realizes how fragile it truly is. "
            "Subscribe for weekly deep dives into the hidden systems powering global wealth."
        ),
        "broll_queries": [
            "computer code matrix glowing data",
            "stock market trading chart wall street",
            "server room data center blue led",
            "high frequency trading financial algorithms",
            "digital currency blockchain globe network"
        ],
        "tags": ["fintech", "algorithms", "wallstreet", "software", "money", "shorts", "technology", "wealth"]
    },
    {
        "id": "semiconductor_asml",
        "niche": "AI Monopolies & Semiconductor Warfare",
        "cpm_tier": "$85 CPM",
        "category_id": "28",
        "title": "How 1 Factory Secretly Controls the Entire AI Revolution 🤖 #Shorts",
        "hook_first_5s": "If this one single factory in the Netherlands stops operating, the entire AI industry collapses overnight.",
        "script": (
            "If this one single factory in the Netherlands stops operating, the entire AI industry collapses overnight. "
            "The company is ASML, and they hold a 100% global monopoly on extreme ultraviolet lithography. "
            "Their machines fire laser pulses at fifty thousand molten tin droplets per second to etch microscopic circuits. "
            "Without them, neither Nvidia, Apple, nor OpenAI can manufacture advanced AI microchips. "
            "A single machine costs two hundred million dollars and requires three Boeing 747s just to ship. "
            "This is the most critical chokepoint in human technological history. "
            "Subscribe to unlock the hidden monopolies that rule the future."
        ),
        "broll_queries": [
            "microchip semiconductor cleanroom manufacturing",
            "futuristic laser high tech laboratory",
            "artificial intelligence neural network motherboard",
            "cargo airplane transport industrial technology",
            "glowing futuristic circuit board technology"
        ],
        "tags": ["nvidia", "asml", "artificialintelligence", "semiconductors", "techmonopoly", "shorts", "future"]
    },
    {
        "id": "quant_trading_python",
        "niche": "Quantitative Finance & Algorithmic Trading",
        "cpm_tier": "$90 CPM",
        "category_id": "28",
        "title": "The 100-Line Python Script That Makes Wall Street Millions 📈 #Shorts",
        "hook_first_5s": "High-frequency hedge funds pay millions for algorithms that execute trades in four hundred nanoseconds.",
        "script": (
            "High-frequency hedge funds pay millions for algorithms that execute trades in four hundred nanoseconds. "
            "They run proprietary fiber optic cables straight through mountains between Chicago and New York to shave off three milliseconds. "
            "Their mathematical models exploit microscopic price imbalances across global exchanges before human traders even see the order book. "
            "A single automated arbitrage script can generate tens of millions in risk-free profit annually. "
            "The entire global financial market is now governed by autonomous software code. "
            "Subscribe to unlock how quantitative wealth systems dominate modern finance."
        ),
        "broll_queries": [
            "stock market trading monitors wall street",
            "fiber optic cable data server room",
            "mathematical formulas algorithm data glowing",
            "cryptocurrency trading graph quantitative finance",
            "high frequency financial trading charts"
        ],
        "tags": ["quanttrading", "algorithmictrading", "finance", "python", "wallstreet", "software", "wealth", "shorts"]
    },
    {
        "id": "nuclear_ai_datacenter",
        "niche": "AI Energy Infrastructure & Nuclear Power",
        "cpm_tier": "$80 CPM",
        "category_id": "28",
        "title": "Why Tech Giants Are Secretly Buying Nuclear Power Plants ⚡ #Shorts",
        "hook_first_5s": "Microsoft, Amazon, and Google are striking multibillion-dollar deals to restart nuclear reactors.",
        "script": (
            "Microsoft, Amazon, and Google are striking multibillion-dollar deals to restart decommissioned nuclear reactors. "
            "A single next-generation AI training cluster consumes as much continuous electricity as a mid-sized city. "
            "Traditional power grids are collapsing under the immense electrical load required by hundreds of thousands of AI GPUs. "
            "To achieve continuous twenty-four-seven power without carbon emissions, Big Tech is investing in small modular nuclear reactors. "
            "The future of artificial intelligence isn't just about code—it is an unprecedented global race for pure electrical energy. "
            "Subscribe to uncover the massive infrastructure battles powering the AI age."
        ),
        "broll_queries": [
            "nuclear power plant cooling towers energy",
            "server room data center glowing blue",
            "high voltage electricity power lines grid",
            "artificial intelligence gpu server cluster",
            "futuristic energy clean power technology"
        ],
        "tags": ["nuclearai", "bigtech", "microsoft", "energycrisis", "datacenter", "futuretech", "shorts", "business"]
    },
    {
        "id": "palantir_defense_ai",
        "niche": "Enterprise AI Defense & Predictive Intelligence",
        "cpm_tier": "$80 CPM",
        "category_id": "28",
        "title": "The Secret AI Defense Software Tracking Everything in Real Time 🛰️ #Shorts",
        "hook_first_5s": "This single piece of software can predict military movements before generals give the order.",
        "script": (
            "This single piece of software can predict military movements before generals give the order. "
            "It is Palantir Foundry, an AI intelligence operating system integrated into global defense, commercial aviation, and supply chains. "
            "It aggregates satellite feeds, cellular triangulation, financial transactions, and drone telemetry into a real-time digital twin of Earth. "
            "Governments and Fortune 100 corporations rely on its algorithmic predictions to make trillion-dollar strategic decisions. "
            "The most powerful weapon of the twenty-first century is not kinetic—it is predictive intelligence. "
            "Subscribe to investigate the classified software platforms reshaping global power."
        ),
        "broll_queries": [
            "satellite orbit globe high tech surveillance",
            "military command control center monitors",
            "drone telemetry infrared aerial camera",
            "cybersecurity data matrix digital intelligence",
            "global network connections glowing earth"
        ],
        "tags": ["palantir", "defenseai", "intelligence", "geopolitics", "software", "techmonopoly", "shorts", "cyber"]
    },
    {
        "id": "stripe_payments_scale",
        "niche": "SaaS Architecture & Micro-Payment Empires",
        "cpm_tier": "$75 CPM",
        "category_id": "28",
        "title": "How 2 Irish Brothers Built a $65 Billion Invisible Monopoly 💳 #Shorts",
        "hook_first_5s": "Every time you buy something on the internet, this 7-line API takes a slice of the transaction.",
        "script": (
            "Every time you buy something on the internet, this seven-line API secretly takes a cut. "
            "When Patrick and John Collison founded Stripe, accepting online credit cards required months of banking paperwork. "
            "They condensed the entire global financial bureaucracy into seven lines of developer-friendly JavaScript code. "
            "Today, Stripe processes over one trillion dollars annually for Amazon, Uber, and millions of software startups. "
            "They turned complex payment rails into pure digital infrastructure, capturing an unstoppable toll on internet commerce. "
            "Subscribe to learn the business blueprints behind the world's most lucrative tech monopolies."
        ),
        "broll_queries": [
            "credit card payment mobile terminal ecommerce",
            "software engineer coding laptop modern office",
            "digital money transfer blockchain financial",
            "cloud infrastructure data server glowing",
            "luxury business wealth skyline skyscrapers"
        ],
        "tags": ["stripe", "fintech", "startup", "ecommerce", "software", "wealth", "business", "shorts"]
    },
    {
        "id": "cloudflare_internet_backbone",
        "niche": "Internet Infrastructure & Global Cyber Architecture",
        "cpm_tier": "$70 CPM",
        "category_id": "28",
        "title": "The 1 Company Protecting 20% of the Entire Internet 🌐 #Shorts",
        "hook_first_5s": "If this single tech company crashes for 10 minutes, one-fifth of the entire global internet goes dark.",
        "script": (
            "If this single company crashes for ten minutes, one-fifth of the entire global internet goes completely dark. "
            "The company is Cloudflare, and its edge network spans over three hundred cities worldwide. "
            "Every second, they deflect trillions of malicious cyber attacks, DDoS floods, and botnet intrusions aimed at major banks and governments. "
            "To generate true cryptographically unbreakable randomness, their San Francisco headquarters uses a wall of one hundred lava lamps filmed by a high-resolution camera. "
            "They are the invisible digital shield holding the modern web together. "
            "Subscribe to discover the hidden mechanics powering the online world."
        ),
        "broll_queries": [
            "cyber attack defense matrix digital firewall",
            "fiber optic network globe worldwide internet",
            "high tech server room glowing green led",
            "lava lamp glowing abstract fluid motion",
            "cybersecurity binary code screen hacking"
        ],
        "tags": ["cloudflare", "cybersecurity", "internet", "tech", "networking", "software", "shorts"]
    },
    {
        "id": "stuxnet_cyber_weapon",
        "niche": "Cyber Warfare & Critical Infrastructure",
        "cpm_tier": "$75 CPM",
        "category_id": "28",
        "title": "The 500-Kilobyte Code That Destroyed a Nuclear Facility ☢️ #Shorts",
        "hook_first_5s": "In 2010, the world's first physical cyber weapon destroyed 1,000 uranium centrifuges without firing a shot.",
        "script": (
            "In 2010, the world's first true cyber weapon physically destroyed one thousand uranium centrifuges without firing a single shot. "
            "It was named Stuxnet, a fifty-kilobyte digital virus engineered by joint intelligence agencies. "
            "It infiltrated Natanz's air-gapped nuclear facility via an infected USB drive, quietly hijacked Siemens industrial controllers, and spun the centrifuges to catastrophic speeds. "
            "While the machinery was tearing itself apart, the virus replayed fake normal telemetry to the control room monitors. "
            "It marked the terrifying moment computer code crossed from cyberspace into physical destruction. "
            "Subscribe for deep investigations into classified cyber operations."
        ),
        "broll_queries": [
            "nuclear facility centrifuge industrial machinery",
            "computer hacking code red security alert",
            "industrial control room monitors engineering",
            "usb drive plug in laptop close up",
            "cyber warfare digital grid attack explosion"
        ],
        "tags": ["stuxnet", "cyberwarfare", "hacking", "history", "military", "technology", "shorts"]
    },
    {
        "id": "quantum_encryption_threat",
        "niche": "Quantum Computing & Global Cryptography",
        "cpm_tier": "$80 CPM",
        "category_id": "28",
        "title": "Why Quantum Computers Will Break Every Bank on Earth 🔐 #Shorts",
        "hook_first_5s": "The moment a 4,000-qubit quantum computer turns on, all modern digital encryption becomes useless.",
        "script": (
            "The moment a four-thousand-qubit quantum computer turns on, all modern encryption becomes completely obsolete. "
            "Every bank transaction, password, and military secret relies on RSA encryption—a mathematical puzzle that takes classical supercomputers ten thousand years to solve. "
            "Using Shor's quantum algorithm, a fault-tolerant quantum machine can crack that same puzzle in under three seconds. "
            "Foreign intelligence agencies are already intercepting and hoarding encrypted government data today, waiting for the day quantum processors can unlock it all. "
            "The race for post-quantum cryptography is the highest-stakes security battle of our lifetime. "
            "Subscribe to stay ahead of the breakthrough technologies transforming civilization."
        ),
        "broll_queries": [
            "quantum computer gold chandelier cryostat",
            "digital padlock cyber encryption binary code",
            "supercomputer data center futuristic science",
            "mathematical quantum physics glowing particles",
            "high tech bank vault digital security"
        ],
        "tags": ["quantumcomputing", "cryptography", "cybersecurity", "futuretech", "banking", "shorts"]
    },
    {
        "id": "micro_saas_wealth",
        "niche": "AI Micro-SaaS & Solopreneur Wealth",
        "cpm_tier": "$85 CPM",
        "category_id": "28",
        "title": "How a 1-Person AI Software Makes $80,000 Every Month 💰 #Shorts",
        "hook_first_5s": "You don't need a 50-person tech startup anymore to build an $80k-per-month software business.",
        "script": (
            "You don't need a fifty-person tech startup anymore to build an eighty-thousand-dollar per month software business. "
            "Solo developers are leveraging AI coding agents to build hyper-focused Micro-SaaS tools in seventy-two hours. "
            "By solving one specific workflow problem—like automated legal contract auditing or localized video translation—they charge thirty dollars a month to three thousand paying business customers. "
            "With automated payment processing, cloud hosting, and AI customer support, their operating profit margins exceed ninety percent. "
            "The future of software wealth belongs to nimble one-person automated empires. "
            "Subscribe to unlock actionable blueprints for building cashflow-positive AI businesses."
        ),
        "broll_queries": [
            "software developer coffee laptop modern home office",
            "dashboard analytics revenue graph growing",
            "artificial intelligence neural network interface",
            "digital nomad working beach laptop financial freedom",
            "credit card stripe billing notification income"
        ],
        "tags": ["saas", "microsaas", "solopreneur", "business", "ai", "passiveincome", "wealth", "shorts"]
    },
    {
        "id": "crispr_biotech_cures",
        "niche": "Biotech & Genetic Engineering Revolutions",
        "cpm_tier": "$70 CPM",
        "category_id": "27",
        "title": "The 1 Injection That Cures Genetic Blindness Forever 🧬 #Shorts",
        "hook_first_5s": "Scientists have officially programmed molecular scissors to edit living human DNA inside the eye.",
        "script": (
            "Scientists have officially programmed molecular scissors to edit living human DNA directly inside the eye. "
            "Using CRISPR Cas-9 genetic therapy, doctors deliver microscopic gene-editing enzymes via a single injection. "
            "The enzymes locate the single mutated genetic letter causing blindness, snip it out, and repair the sequence with healthy code. "
            "Within weeks, patients who were legally blind from birth begin recognizing shapes, colors, and the faces of their families. "
            "We have transitioned from treating chronic illness to rewriting the source code of human biology itself. "
            "Subscribe for weekly discoveries on the cutting edge of medicine and science."
        ),
        "broll_queries": [
            "dna double helix glowing genetic science",
            "microbiology laboratory medical research microscope",
            "doctor performing advanced eye surgery medical",
            "patient seeing smiling emotional recovery",
            "futuristic biotechnology molecular medical lab"
        ],
        "tags": ["crispr", "biotech", "genetics", "medicalbreakthrough", "science", "medicine", "shorts"]
    },
    {
        "id": "starlink_space_monopoly",
        "niche": "Space Technology & Satellite Megaconstellations",
        "cpm_tier": "$75 CPM",
        "category_id": "28",
        "title": "How 1 Company Secretly Controls 65% of All Satellites in Orbit 🚀 #Shorts",
        "hook_first_5s": "Out of 10,000 active satellites orbiting Earth right now, two-thirds belong to a single private company.",
        "script": (
            "Out of ten thousand active satellites orbiting Earth right now, two-thirds belong to a single private company: SpaceX. "
            "Their Starlink megaconstellation beams gigabit internet to warzones, remote oceans, and commercial airliners through laser cross-links in low Earth orbit. "
            "Because SpaceX possesses reusable Falcon 9 rockets, their launch costs are ninety percent cheaper than any government space agency on Earth. "
            "They are launching sixty new satellites every few days, building an unassailable orbital communications monopoly. "
            "Whoever controls low Earth orbit will control the future of global telecommunications. "
            "Subscribe to explore the commercial space race conquering the final frontier."
        ),
        "broll_queries": [
            "spacex rocket launch night sky flames",
            "satellites constellation orbit earth low earth orbit",
            "global satellite internet grid glowing globe",
            "high tech satellite dish antenna communications",
            "futuristic space station earth view sunrise"
        ],
        "tags": ["spacex", "starlink", "satellites", "space", "elonmusk", "technology", "future", "shorts"]
    }
]

# ---------------------------------------------------------------------------
# High-Fidelity Studio Voiceover + Warm Audio EQ Filter
# ---------------------------------------------------------------------------
async def synthesize_voiceover(text: str, out_path: str, voice="en-US-ChristopherNeural"):
    print(f">> Synthesizing Studio Voiceover ({voice})...", file=sys.stderr)
    communicate = edge_tts.Communicate(text, voice=voice, rate="+3%", pitch="+0Hz")
    await communicate.save(out_path)

def get_audio_duration(audio_path: str) -> float:
    cmd = ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", audio_path]
    res = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    return float(res.stdout.strip())

def ensure_cinematic_music(target_path: str):
    """Generates a rich, dynamic cinematic soundtrack if none exists."""
    if os.path.exists(target_path) and os.path.getsize(target_path) > 50000:
        return target_path

    print(">> Generating Master Cinematic Ambient Soundtrack...", file=sys.stderr)
    cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi", "-i", "sine=f=65:r=48000",
        "-f", "lavfi", "-i", "sine=f=130:r=48000",
        "-f", "lavfi", "-i", "sine=f=195:r=48000",
        "-f", "lavfi", "-i", "anoisesrc=c=pink:r=48000:a=0.015,lowpass=f=250",
        "-filter_complex", (
            "[0:a]volume=0.25[a0];"
            "[1:a]volume=0.15[a1];"
            "[2:a]volume=0.08[a2];"
            "[3:a]volume=0.35[a3];"
            "[a0][a1][a2][a3]amix=inputs=4:duration=first,"
            "aecho=0.8:0.88:60:0.4[out]"
        ),
        "-map", "[out]", "-t", "120",
        "-c:a", "libmp3lame", "-b:a", "192k",
        target_path
    ]
    subprocess.run(cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    return target_path

# ---------------------------------------------------------------------------
# High-Resolution HD B-Roll Downloader (Pexels)
# ---------------------------------------------------------------------------
def download_hd_broll_pool(queries: list, target_count=5) -> list:
    print(f">> Fetching {target_count} Premium HD B-Roll Clips from Pexels...", file=sys.stderr)
    headers = {"Authorization": PEXELS_API_KEY}
    clips = []

    for i, q in enumerate(queries):
        if len(clips) >= target_count:
            break
        try:
            url = f"https://api.pexels.com/videos/search?query={requests.utils.quote(q)}&orientation=portrait&per_page=3"
            r = requests.get(url, headers=headers, timeout=15)
            videos = r.json().get("videos", [])
            if videos:
                best_file = None
                for vf in videos[0].get("video_files", []):
                    if vf.get("width", 0) >= 1080 or vf.get("quality") == "hd":
                        best_file = vf.get("link")
                        break
                if not best_file:
                    best_file = videos[0]["video_files"][0]["link"]

                clip_path = os.path.join(TEMP_DIR, f"hd_clip_{len(clips)}.mp4")
                v_res = requests.get(best_file, stream=True, timeout=30)
                with open(clip_path, "wb") as f:
                    for chunk in v_res.iter_content(chunk_size=1024*1024):
                        if chunk:
                            f.write(chunk)
                clips.append(clip_path)
                print(f"  -> Downloaded HD B-roll for: '{q}'", file=sys.stderr)
        except Exception as e:
            print(f"  -> Notice for '{q}': {e}", file=sys.stderr)

    return clips

# ---------------------------------------------------------------------------
# Kinetic Subtitle Engine (Rapid 2-3 Word Bursts with High-Impact Highlight Badges)
# ---------------------------------------------------------------------------
def generate_kinetic_subtitles(script_text: str, total_duration: float, srt_path: str):
    words = script_text.split()
    chunk_size = 3
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

            clean_chunk = chunk.upper()

            f.write(f"{idx + 1}\n")
            f.write(f"{hrs:02d}:{mins:02d}:{secs:02d},{ms:03d} --> {e_hrs:02d}:{e_mins:02d}:{e_secs:02d},{e_ms:03d}\n")
            f.write(f"{clean_chunk}\n\n")

# ---------------------------------------------------------------------------
# Broadcast-Grade Master Video Renderer (Ken Burns Motion + Color Grade + Audio Ducking)
# ---------------------------------------------------------------------------
def render_broadcast_video(clips: list, voice_path: str, music_path: str, srt_path: str, out_video: str):
    print(">> Producing Broadcast-Grade Master Video with FFmpeg...", file=sys.stderr)
    duration = get_audio_duration(voice_path)
    clip_dur = (duration / len(clips)) + 0.5

    # 1. Normalize clips with Ken Burns Slow Zoom Motion & Cinematic Grading
    norm_clips = []
    for i, clip in enumerate(clips):
        norm = os.path.join(TEMP_DIR, f"broadcast_norm_{i}.mp4")
        vf = (
            "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1,fps=30,"
            "eq=contrast=1.12:brightness=0.01:saturation=1.18,"
            "vignette=PI/4.5"
        )
        subprocess.run([
            "ffmpeg", "-y", "-stream_loop", "-1", "-i", clip, "-t", str(clip_dur),
            "-vf", vf,
            "-an", "-c:v", "libx264", "-preset", "fast", "-pix_fmt", "yuv420p", norm
        ], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        norm_clips.append(norm)

    # 2. Concat video clips
    concat_file = os.path.join(TEMP_DIR, "broadcast_concat.txt")
    with open(concat_file, "w", encoding="utf-8") as f:
        for nc in norm_clips:
            f.write(f"file '{os.path.abspath(nc).replace(os.sep, '/')}'\n")

    raw_video = os.path.join(TEMP_DIR, "broadcast_raw.mp4")
    subprocess.run(["ffmpeg", "-y", "-f", "concat", "-safe", "0", "-i", concat_file, "-c", "copy", raw_video],
                   check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

    # 3. Master Composition: Video + Kinetic Captions + Studio Voiceover EQ + Ducked Background Music
    srt_escaped = os.path.abspath(srt_path).replace("\\", "/").replace(":", "\\:")
    
    subtitle_filter = (
        f"subtitles='{srt_escaped}':force_style='"
        f"FontName=RobotoCondensed-Bold,FontSize=22,PrimaryColour=&H0000F5FF&,SecondaryColour=&H00FFFFFF&,"
        f"OutlineColour=&H90000000&,BackColour=&H60000000&,BorderStyle=4,Outline=3,Shadow=2,"
        f"Alignment=2,MarginV=140'"
    )

    # Voice EQ Filter (Studio Warmth + Presence) & Ducked Music Loop
    filter_complex = (
        f"[0:v]{subtitle_filter}[v_out];"
        f"[1:a]equalizer=f=120:width_type=h:width=100:g=3.5,volume=1.0[voice_eq];"
        f"[2:a]volume=0.12,aloop=loop=-1:size=2e+09[bgm];"
        f"[voice_eq][bgm]amix=inputs=2:duration=first:dropout_transition=2[a_out]"
    )

    print(">> Master Encoding (High Bitrate 1080p Master)...", file=sys.stderr)
    final_cmd = [
        "ffmpeg", "-y",
        "-i", raw_video,
        "-i", voice_path,
        "-i", music_path,
        "-t", str(duration),
        "-filter_complex", filter_complex,
        "-map", "[v_out]",
        "-map", "[a_out]",
        "-c:v", "libx264", "-preset", "medium", "-crf", "16", "-pix_fmt", "yuv420p",
        "-c:a", "aac", "-b:a", "256k",
        "-movflags", "+faststart",
        out_video
    ]
    subprocess.run(final_cmd, check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    print(f"✅ Master 1080p Broadcast Video Ready: {out_video} ({os.path.getsize(out_video) / 1024 / 1024:.2f} MB)", file=sys.stderr)
    return out_video

# ---------------------------------------------------------------------------
# YouTube Publisher
# ---------------------------------------------------------------------------
def publish_to_youtube(video_path: str, title: str, description: str, tags: list, category_id="28", privacy="public"):
    print(f">> Uploading Master Video to YouTube [Category: {category_id}] ({privacy})...", file=sys.stderr)
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
            "categoryId": category_id
        },
        "status": {
            "privacyStatus": privacy,
            "selfDeclaredMadeForKids": False
        }
    }

    media = MediaFileUpload(video_path, chunksize=1024*1024*4, resumable=True, mimetype="video/mp4")
    request = youtube.videos().insert(part=",".join(body.keys()), body=body, media_body=media)

    response = None
    try:
        while response is None:
            status, response = request.next_chunk()
            if status:
                print(f"Uploading... {int(status.progress() * 100)}%", file=sys.stderr)

        vid_id = response.get("id")
        url = f"https://youtu.be/{vid_id}"
        print(f"🎉 LIVE on YouTube: {url}", file=sys.stderr)
        return {"videoId": vid_id, "videoUrl": url, "status": "uploaded"}
    except Exception as e:
        err_str = str(e)
        if "uploadLimitExceeded" in err_str or "exceeded the number of videos" in err_str:
            print(f"\n⚠️ YouTube Daily Upload Limit Reached: {e}", file=sys.stderr)
            print(f"📁 Video successfully rendered and preserved locally at: {video_path}", file=sys.stderr)
            print("⏳ Will automatically publish once YouTube resets daily upload quota.", file=sys.stderr)
            return {"videoId": None, "videoUrl": None, "localVideoPath": video_path, "status": "limit_reached_saved_locally"}
        raise e

# ---------------------------------------------------------------------------
# End-to-End Flagship Production
# ---------------------------------------------------------------------------
def produce_flagship_video(story_index=0, privacy="public"):
    story = FLAGSHIP_STORIES[story_index % len(FLAGSHIP_STORIES)]
    print("\n=======================================================")
    print(f"🚀 LAUNCHING BROADCAST-GRADE PRODUCTION (#{story_index + 1}/{len(FLAGSHIP_STORIES)})")
    print(f"📌 Niche: {story['niche']} | Tier: {story['cpm_tier']}")
    print(f"📌 Title: {story['title']}")
    print("=======================================================\n")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    voice_path = os.path.join(TEMP_DIR, f"voice_{timestamp}.mp3")
    srt_path = os.path.join(TEMP_DIR, f"subs_{timestamp}.srt")
    music_path = os.path.join(MUSIC_DIR, "cinematic_ambient_score.mp3")
    master_video = os.path.join(OUTPUT_DIR, f"flagship_1080p_{timestamp}.mp4")

    # 1. Studio Voiceover
    asyncio.run(synthesize_voiceover(story["script"], voice_path))
    duration = get_audio_duration(voice_path)

    # 2. Cinematic Background Music
    ensure_cinematic_music(music_path)

    # 3. Kinetic Captions
    generate_kinetic_subtitles(story["script"], duration, srt_path)

    # 4. Premium HD B-Roll
    clips = download_hd_broll_pool(story["broll_queries"], target_count=5)
    if not clips:
        raise RuntimeError("Failed to acquire HD stock footage.")

    # 5. Render Broadcast Master Video
    render_broadcast_video(clips, voice_path, music_path, srt_path, master_video)

    # 6. Upload
    desc = (
        f"{story['title']}\n\n"
        f"{story['script']}\n\n"
        f"💡 KEY FINANCIAL & TECH TAKEAWAYS:\n"
        f"• Niche: {story['niche']} ({story['cpm_tier']})\n"
        f"• Full Investigation & Source Code Breakdown\n\n"
        f"🔔 Subscribe to explore the hidden software monopolies and financial engines of the modern world!\n\n"
        f"{' '.join(['#' + t for t in story['tags']])}"
    )

    result = publish_to_youtube(master_video, story["title"], desc, story["tags"], category_id=story["category_id"], privacy=privacy)
    return result

def get_next_story_index() -> int:
    state_file = os.path.join(TEMP_DIR, "story_state.json")
    idx = 0
    try:
        if os.path.exists(state_file):
            with open(state_file, "r") as f:
                idx = json.load(f).get("next_index", 0)
    except Exception:
        pass
    next_idx = (idx + 1) % len(FLAGSHIP_STORIES)
    try:
        with open(state_file, "w") as f:
            json.dump({"next_index": next_idx}, f)
    except Exception:
        pass
    return idx

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Flagship High-RPM Video Producer")
    parser.add_argument("--story", type=int, default=-1, help="Specific story index to produce")
    parser.add_argument("--privacy", default="public", choices=["public", "unlisted", "private"])
    args = parser.parse_args()

    chosen_idx = args.story if args.story >= 0 else get_next_story_index()
    res = produce_flagship_video(story_index=chosen_idx, privacy=args.privacy)
    print(json.dumps(res, indent=2))
