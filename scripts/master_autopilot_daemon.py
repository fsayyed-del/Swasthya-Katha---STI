#!/usr/bin/env python3
"""
Master Autonomous Multi-Format YouTube Empire Daemon.
Runs continuously 24/7, cycling through all high-converting content formats:
1. 🎨 Stickman Motivational Shorts ($30k/Mo Mindset Niche)
2. 🔥 Viral Ranking Shorts ($20k/Mo Top 5 Comparison Niche)
3. 🇮🇳 Filmy Kahani (Hindi Movie Breakdown / Category 1)
4. 💎 Matt Parr High-RPM Pillar Masterclasses ($30-$80 CPM)

Schedule: Publishes a new high-retention video every 6 hours.
"""

import os
import sys
import time
import random
import subprocess
from datetime import datetime

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass

PYTHON_EXE = sys.executable
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

PIPELINES = [
    {
        "name": "⚡ Broadcast-Grade High-RPM Flagship Short ($65-$75 CPM)",
        "script": "scripts/pro_video_generator.py",
        "args": []
    },
    {
        "name": "💸 MoneyPrinterTurbo AI Video (Audio Ducking & HD Matching)",
        "script": "scripts/money_printer_turbo_engine.py",
        "args": []
    },
    {
        "name": "💎 Matt Parr High-RPM Pillar Masterclass ($35-$80 CPM)",
        "script": "scripts/make_money_matt_system.py",
        "args": ["--niche", "software_ai"]
    },
    {
        "name": "🇮🇳 Filmy Kahani (Hindi Movie Breakdown - 8 Min)",
        "script": "scripts/hindi_movie_viral_crawler.py",
        "args": ["--duration", "8"]
    },
    {
        "name": "🎨 Stickman Motivational Story Short",
        "script": "scripts/stickman_shorts_engine.py",
        "args": []
    },
    {
        "name": "🔥 Viral Top-5 Ranking Countdown Short",
        "script": "scripts/viral_ranking_shorts.py",
        "args": []
    }
]

def log(msg):
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{ts}] {msg}", flush=True)

def run_cycle():
    cycle_idx = 0
    log("=================================================================")
    log("🚀 STARTING 24/7 MASTER MULTI-CHANNEL YOUTUBE AUTOPILOT DAEMON")
    log("=================================================================")

    while True:
        target = PIPELINES[cycle_idx % len(PIPELINES)]
        cycle_idx += 1

        log(f"\n>> [CYCLE #{cycle_idx}] Launching format: {target['name']}")
        cmd = [PYTHON_EXE, os.path.join(WORKSPACE_DIR, target["script"])] + target["args"]
        
        try:
            p = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, cwd=WORKSPACE_DIR)
            for line in iter(p.stdout.readline, ''):
                if line:
                    print(f"   | {line.strip()}", flush=True)
            p.stdout.close()
            p.wait()
            log(f">> [CYCLE #{cycle_idx}] Finished with exit code: {p.returncode}")
        except Exception as e:
            log(f">> [CYCLE #{cycle_idx}] Error during execution: {e}")

        interval_hours = 6
        log(f">> Sleeping for {interval_hours} hours until next autonomous release cycle...")
        for remaining in range(interval_hours * 3600, 0, -300):
            time.sleep(300)
            log(f"   [Heartbeat] Next video in {remaining // 60} minutes.")

if __name__ == "__main__":
    run_cycle()
