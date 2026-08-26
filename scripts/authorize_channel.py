#!/usr/bin/env python3
"""
Multi-Channel OAuth Token Generator.
Generates and links individual YouTube Refresh Tokens for multiple Brand Channels under the same Google Account.
"""

import os
import sys
import json
import urllib.parse
from http.server import HTTPServer, BaseHTTPRequestHandler
import requests

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

CLIENT_ID = os.environ.get("YOUTUBE_CLIENT_ID")
CLIENT_SECRET = os.environ.get("YOUTUBE_CLIENT_SECRET")
REDIRECT_URI = "https://developers.google.com/oauthplayground"

auth_code = None

class OAuthHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        global auth_code
        parsed = urllib.parse.urlparse(self.path)
        qs = urllib.parse.parse_qs(parsed.query)
        if "code" in qs:
            auth_code = qs["code"][0]
            self.send_response(200)
            self.send_header("Content-type", "text/html")
            self.end_headers()
            self.wfile.write(b"<h1>Authorization Successful!</h1><p>You can close this tab and return to the terminal.</p>")
        else:
            self.send_response(400)
            self.end_headers()

def generate_auth_url():
    scopes = ["https://www.googleapis.com/auth/youtube.upload", "https://www.googleapis.com/auth/youtube"]
    params = {
        "client_id": CLIENT_ID,
        "redirect_uri": REDIRECT_URI,
        "response_type": "code",
        "scope": " ".join(scopes),
        "access_type": "offline",
        "prompt": "consent"
    }
    return f"https://accounts.google.com/o/oauth2/v2/auth?{urllib.parse.urlencode(params)}"

def exchange_code(code: str) -> dict:
    url = "https://oauth2.googleapis.com/token"
    data = {
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET,
        "code": code,
        "grant_type": "authorization_code",
        "redirect_uri": REDIRECT_URI
    }
    res = requests.post(url, data=data)
    return res.json()

def save_token(token: str, channel_key: str):
    env_file = os.path.join(os.path.dirname(__file__), "..", ".env.local")
    lines = []
    if os.path.exists(env_file):
        with open(env_file, "r", encoding="utf-8") as f:
            lines = f.readlines()

    var_name = f"YOUTUBE_REFRESH_TOKEN_{channel_key.upper().replace('-', '_')}"
    new_line = f"{var_name}={token}\n"
    
    updated = False
    new_lines = []
    for line in lines:
        if line.startswith(f"{var_name}="):
            new_lines.append(new_line)
            updated = True
        else:
            new_lines.append(line)
    if not updated:
        new_lines.append(new_line)

    with open(env_file, "w", encoding="utf-8") as f:
        f.writelines(new_lines)
    print(f">> Saved {var_name} to .env.local!", file=sys.stderr)

def main():
    global auth_code
    channel_key = sys.argv[1] if len(sys.argv) > 1 else "UCgrgZqI9moQmW9x3OXLf9tg"
    auth_url = generate_auth_url()
    
    print("\n=======================================================")
    print(f"🔗 AUTHORIZING YOUTUBE CHANNEL: {channel_key}")
    print("=======================================================\n")
    print("👉 Open this link in your browser:")
    print(f"\n{auth_url}\n")
    print("👉 IMPORTANT: When prompted, SELECT YOUR NEW BRAND CHANNEL!")
    print("Waiting for callback on http://localhost:8989 ...\n")

    # Try local web server callback
    try:
        server = HTTPServer(("localhost", 8989), OAuthHandler)
        server.timeout = 120
        while auth_code is None:
            server.handle_request()
    except Exception:
        pass

    if not auth_code:
        print(">> Enter the authorization code manually from the redirect URL if server did not capture:")
        auth_code = input("Code: ").strip()

    tokens = exchange_code(auth_code)
    refresh_token = tokens.get("refresh_token")
    if refresh_token:
        print(f"\n✅ Refresh Token obtained: {refresh_token[:15]}...")
        save_token(refresh_token, channel_key)
    else:
        print(f"❌ Error exchanging code: {tokens}")

if __name__ == "__main__":
    main()
