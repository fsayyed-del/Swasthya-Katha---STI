#!/usr/bin/env python3
"""
Antigravity YouTube Automation Desktop Control Center.
One-Click Launch for 24/7 Autopilot, Multi-Channel Networks, and Viral Video Generators.
"""

import os
import sys
import time
import threading
import subprocess
import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext

WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PYTHON_EXE = sys.executable

class YouTubeAutomationApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 Antigravity YouTube Automation Control Center")
        self.root.geometry("850x650")
        self.root.minsize(750, 550)
        self.root.configure(bg="#0B1315")

        self.is_running_loop = False
        self.loop_thread = None

        self.setup_styles()
        self.build_ui()

    def setup_styles(self):
        self.style = ttk.Style()
        self.style.theme_use("clam")
        self.style.configure(".", background="#0B1315", foreground="#E2E8F0")
        self.style.configure("TLabel", background="#0B1315", foreground="#E2E8F0", font=("Segoe UI", 10))
        self.style.configure("Header.TLabel", font=("Segoe UI", 16, "bold"), foreground="#2DD4BF")
        self.style.configure("Subheader.TLabel", font=("Segoe UI", 9), foreground="#94A3B8")

    def build_ui(self):
        # Header
        header_frame = tk.Frame(self.root, bg="#111E22", padx=20, pady=15)
        header_frame.pack(fill="x", side="top")

        lbl_title = tk.Label(header_frame, text="⚡ YOUTUBE AUTOMATION EMPIRE ENGINE", font=("Segoe UI", 16, "bold"), fg="#2DD4BF", bg="#111E22")
        lbl_title.pack(anchor="w")

        lbl_sub = tk.Label(header_frame, text="Autonomous Trend Scouting • NVIDIA NIM Llama 3.1 • Pexels HD B-Roll • 24/7 Publisher", font=("Segoe UI", 9), fg="#94A3B8", bg="#111E22")
        lbl_sub.pack(anchor="w", pady=(2, 0))

        # Main Container
        main_frame = tk.Frame(self.root, bg="#0B1315", padx=20, pady=15)
        main_frame.pack(fill="both", expand=True)

        # Autopilot Master Card
        master_card = tk.Frame(main_frame, bg="#13242A", bd=1, relief="ridge", padx=15, pady=15)
        master_card.pack(fill="x", pady=(0, 15))

        tk.Label(master_card, text="🤖 24/7 AUTONOMOUS AUTOPILOT DAEMON", font=("Segoe UI", 12, "bold"), fg="#F8FAFC", bg="#13242A").pack(anchor="w")
        tk.Label(master_card, text="Scouts trending high-RPM topics, scripts, generates studio audio/visuals, and uploads on a continuous schedule.", font=("Segoe UI", 9), fg="#94A3B8", bg="#13242A").pack(anchor="w", pady=(2, 10))

        btn_box = tk.Frame(master_card, bg="#13242A")
        btn_box.pack(fill="x")

        self.btn_toggle_loop = tk.Button(
            btn_box, text="▶ START 24/7 AUTOPILOT", font=("Segoe UI", 11, "bold"),
            bg="#059669", fg="white", activebackground="#047857", activeforeground="white",
            padx=20, pady=8, bd=0, cursor="hand2", command=self.toggle_autopilot
        )
        self.btn_toggle_loop.pack(side="left", padx=(0, 10))

        self.lbl_status = tk.Label(btn_box, text="Status: IDLE (Ready)", font=("Segoe UI", 10, "bold"), fg="#38BDF8", bg="#13242A")
        self.lbl_status.pack(side="left", padx=10)

        # Quick Manual Generators Frame
        gen_card = tk.Frame(main_frame, bg="#13242A", bd=1, relief="ridge", padx=15, pady=15)
        gen_card.pack(fill="x", pady=(0, 15))

        tk.Label(gen_card, text="🎬 ON-DEMAND INSTANT VIDEO GENERATORS", font=("Segoe UI", 12, "bold"), fg="#F8FAFC", bg="#13242A").pack(anchor="w", pady=(0, 10))

        grid_frame = tk.Frame(gen_card, bg="#13242A")
        grid_frame.pack(fill="x")

        # 4 Generator Buttons
        btn1 = tk.Button(grid_frame, text="🔥 Viral Ranking Short ($20k/Mo Formula)", font=("Segoe UI", 9, "bold"),
                         bg="#E11D48", fg="white", bd=0, padx=10, pady=6, cursor="hand2",
                         command=lambda: self.run_script_async("scripts/viral_ranking_shorts.py"))
        btn1.grid(row=0, column=0, padx=5, pady=5, sticky="ew")

        btn2 = tk.Button(grid_frame, text="🇮🇳 Hindi Movie Recap (Filmy Kahani)", font=("Segoe UI", 9, "bold"),
                         bg="#D97706", fg="white", bd=0, padx=10, pady=6, cursor="hand2",
                         command=lambda: self.run_script_async("scripts/multi_channel_engine.py", ["--channel", "movies_hi"]))
        btn2.grid(row=0, column=1, padx=5, pady=5, sticky="ew")

        btn3 = tk.Button(grid_frame, text="💎 Matt Parr High-RPM Pillar ($30-$80 CPM)", font=("Segoe UI", 9, "bold"),
                         bg="#2563EB", fg="white", bd=0, padx=10, pady=6, cursor="hand2",
                         command=lambda: self.run_script_async("scripts/make_money_matt_system.py", ["--niche", "software_ai"]))
        btn3.grid(row=1, column=0, padx=5, pady=5, sticky="ew")

        btn4 = tk.Button(grid_frame, text="🍿 5-Minute HD Documentary", font=("Segoe UI", 9, "bold"),
                         bg="#7C3AED", fg="white", bd=0, padx=10, pady=6, cursor="hand2",
                         command=lambda: self.run_script_async("scripts/create_5min_documentary.py"))
        btn4.grid(row=1, column=1, padx=5, pady=5, sticky="ew")

        grid_frame.grid_columnconfigure(0, weight=1)
        grid_frame.grid_columnconfigure(1, weight=1)

        # Live Console Output Box
        tk.Label(main_frame, text="📟 LIVE AUTOMATION TERMINAL LOGS", font=("Segoe UI", 10, "bold"), fg="#94A3B8", bg="#0B1315").pack(anchor="w", pady=(0, 4))
        self.log_box = scrolledtext.ScrolledText(
            main_frame, bg="#050B0C", fg="#34D399", font=("Consolas", 9),
            insertbackground="white", bd=0, padx=10, pady=10
        )
        self.log_box.pack(fill="both", expand=True)

        self.log("🚀 Control Center initialized. Ready to generate high-converting YouTube content!")

    def log(self, text):
        timestamp = datetime.now().strftime("%H:%M:%S")
        self.log_box.insert(tk.END, f"[{timestamp}] {text}\n")
        self.log_box.see(tk.END)

    def toggle_autopilot(self):
        if not self.is_running_loop:
            self.is_running_loop = True
            self.btn_toggle_loop.config(text="⏹ STOP AUTOPILOT", bg="#DC2626")
            self.lbl_status.config(text="Status: 🟢 RUNNING (24/7 Autopilot)", fg="#34D399")
            self.log("▶ 24/7 Autopilot daemon started. Scheduled to run every 6 hours.")
            self.loop_thread = threading.Thread(target=self.autopilot_worker, daemon=True)
            self.loop_thread.start()
        else:
            self.is_running_loop = False
            self.btn_toggle_loop.config(text="▶ START 24/7 AUTOPILOT", bg="#059669")
            self.lbl_status.config(text="Status: IDLE (Stopped)", fg="#F59E0B")
            self.log("⏹ Autopilot daemon stopped.")

    def autopilot_worker(self):
        while self.is_running_loop:
            self.log("🔄 Starting scheduled autonomous content cycle...")
            self.execute_command([PYTHON_EXE, os.path.join(WORKSPACE_DIR, "scripts", "viral_ranking_shorts.py")])
            
            # Sleep in small chunks so we can stop immediately if requested
            for _ in range(6 * 3600):
                if not self.is_running_loop:
                    break
                time.sleep(1)

    def run_script_async(self, script_rel_path, extra_args=None):
        def worker():
            args = [PYTHON_EXE, os.path.join(WORKSPACE_DIR, script_rel_path)] + (extra_args or [])
            self.execute_command(args)

        t = threading.Thread(target=worker, daemon=True)
        t.start()

    def execute_command(self, cmd_list):
        self.log(f">> Running: {' '.join(cmd_list)}")
        try:
            p = subprocess.Popen(
                cmd_list, stdout=subprocess.PIPE, stderr=subprocess.STDOUT,
                text=True, cwd=WORKSPACE_DIR, encoding="utf-8", errors="replace"
            )
            for line in iter(p.stdout.readline, ''):
                if line:
                    self.root.after(0, self.log, line.strip())
            p.stdout.close()
            p.wait()
            self.root.after(0, self.log, f"✅ Task finished (Exit Code: {p.returncode})")
        except Exception as e:
            self.root.after(0, self.log, f"❌ Execution error: {e}")

if __name__ == "__main__":
    root = tk.Tk()
    app = YouTubeAutomationApp(root)
    root.mainloop()
