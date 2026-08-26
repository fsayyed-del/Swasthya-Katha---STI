#!/usr/bin/env python3
"""
Direct Automated YouTube Video & Shorts Uploader using OAuth Refresh Token.
"""

import os
import sys
import json
import argparse
from googleapiclient.discovery import build
from googleapiclient.http import MediaFileUpload
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request

def load_env():
    """Load environment variables from .env.local if present."""
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    k, v = line.split("=", 1)
                    os.environ.setdefault(k.strip(), v.strip())

load_env()

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REFRESH_TOKEN = os.environ.get("YOUTUBE_REFRESH_TOKEN")

SCOPES = [
    "https://www.googleapis.com/auth/youtube.upload",
    "https://www.googleapis.com/auth/youtube",
    "https://www.googleapis.com/auth/youtubepartner-channel-audit"
]

def get_authenticated_service(client_id=None, client_secret=None, refresh_token=None):
    client_id = client_id or CLIENT_ID
    client_secret = client_secret or CLIENT_SECRET
    refresh_token = refresh_token or REFRESH_TOKEN

    if not (client_id and client_secret and refresh_token):
        raise ValueError("Missing YouTube OAuth credentials in environment / .env.local")

    credentials = Credentials(
        None,
        refresh_token=refresh_token,
        token_uri="https://oauth2.googleapis.com/token",
        client_id=client_id,
        client_secret=client_secret,
        scopes=SCOPES
    )

    credentials.refresh(Request())
    return build("youtube", "v3", credentials=credentials)

def upload_video(
    file_path: str,
    title: str,
    description: str,
    tags: list = None,
    category_id: str = "27",
    privacy_status: str = "unlisted"
):
    """Uploads a video to YouTube with specified metadata."""
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Video file not found at: {file_path}")

    youtube = get_authenticated_service()

    body = {
        "snippet": {
            "title": title[:100],
            "description": description[:5000],
            "tags": tags or [],
            "categoryId": category_id
        },
        "status": {
            "privacyStatus": privacy_status,
            "selfDeclaredMadeForKids": False
        }
    }

    print(f"🚀 Uploading video '{title}' to YouTube ({privacy_status})...", file=sys.stderr)

    media = MediaFileUpload(
        file_path,
        chunksize=1024 * 1024 * 2,
        resumable=True,
        mimetype="video/*"
    )

    request = youtube.videos().insert(
        part=",".join(body.keys()),
        body=body,
        media_body=media
    )

    response = None
    while response is None:
        status, response = request.next_chunk()
        if status:
            progress = int(status.progress() * 100)
            print(f"Uploading... {progress}%", file=sys.stderr)

    video_id = response.get("id")
    video_url = f"https://youtu.be/{video_id}" if video_id else "Unknown"
    print(f"✅ Video successfully uploaded! URL: {video_url}", file=sys.stderr)

    return {
        "status": "success",
        "videoId": video_id,
        "videoUrl": video_url,
        "response": response
    }

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Upload video to YouTube")
    parser.add_argument("--file", required=True, help="Path to video file (.mp4)")
    parser.add_argument("--title", required=True, help="Video Title")
    parser.add_argument("--description", default="", help="Video Description")
    parser.add_argument("--tags", default="", help="Comma-separated tags")
    parser.add_argument("--privacy", default="unlisted", choices=["public", "unlisted", "private"], help="Privacy status")
    args = parser.parse_args()

    tags_list = [t.strip() for t in args.tags.split(",") if t.strip()]

    try:
        result = upload_video(
            file_path=args.file,
            title=args.title,
            description=args.description,
            tags=tags_list,
            privacy_status=args.privacy
        )
        print(json.dumps(result, indent=2))
    except Exception as e:
        print(f"Upload failed: {e}", file=sys.stderr)
        sys.exit(1)
