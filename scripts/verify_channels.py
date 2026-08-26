#!/usr/bin/env python3
import os
import sys

if sys.stdout.encoding != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
        sys.stderr.reconfigure(encoding='utf-8')
    except Exception:
        pass
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build

def load_env():
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ[k.strip()] = v.strip()

load_env()
client_id = os.environ.get("YOUTUBE_CLIENT_ID")
client_secret = os.environ.get("YOUTUBE_CLIENT_SECRET")

print("Checking configured YouTube tokens in .env.local...\n")
for k, v in os.environ.items():
    if "YOUTUBE_REFRESH_TOKEN" in k and v:
        try:
            creds = Credentials(
                None,
                refresh_token=v,
                token_uri="https://oauth2.googleapis.com/token",
                client_id=client_id,
                client_secret=client_secret
            )
            creds.refresh(Request())
            yt = build("youtube", "v3", credentials=creds)
            res = yt.channels().list(part="snippet", mine=True).execute()
            if "items" in res and res["items"]:
                item = res["items"][0]
                print(f"✅ Token [{k}]:\n   Channel Name: \"{item['snippet']['title']}\"\n   Channel ID  : {item['id']}\n   Custom URL  : {item['snippet'].get('customUrl', 'None')}\n")
            else:
                print(f"⚠️ Token [{k}]: No channel found.")
        except Exception as e:
            print(f"❌ Token [{k}] Failed: {e}\n")
