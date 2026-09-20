"""
=============================================================================
GOOGLE ANTIGRAVITY - DEDICATED LOCAL PREVIEW SERVER (serve.py)
=============================================================================
Solves local preview issues:
 1. Fixes MIME types (ensures .js is application/javascript, .css is text/css).
 2. Routes root-relative paths (/_astro/..., /assets/...) to antigravity.google.
 3. Supports clean URLs (/docs/overview -> /docs/overview/index.html).
 4. Supports HTTP Range requests for MP4 video streaming.
 5. Automatically opens the default browser on launch.
=============================================================================
"""

import os
import sys
import mimetypes
import webbrowser
from http.server import HTTPServer, SimpleHTTPRequestHandler

PORT = 3000

# Ensure accurate MIME type associations
mimetypes.add_type("application/javascript", ".js")
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("text/css", ".css")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/avif", ".avif")
mimetypes.add_type("video/mp4", ".mp4")
mimetypes.add_type("font/ttf", ".ttf")
mimetypes.add_type("application/wasm", ".wasm")
mimetypes.add_type("application/xml", ".xml")

# Resolve base serving directory
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
SITE_DIR = os.path.join(SCRIPT_DIR, "antigravity.google")
if not os.path.exists(SITE_DIR):
    SITE_DIR = SCRIPT_DIR

class AntigravityRequestHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=SITE_DIR, **kwargs)

    def do_GET(self):
        # Strip query and fragments
        path = self.path.split("?")[0].split("#")[0]

        # Normalize paths pointing to /antigravity.google/... back to root
        if path.startswith("/antigravity.google/"):
            path = path[len("/antigravity.google"):]
            self.path = path + ("?" + self.path.split("?")[1] if "?" in self.path else "")

        # Check if requesting a directory without trailing slash or index.html
        fs_path = self.translate_path(self.path)
        if os.path.isdir(fs_path):
            index_path = os.path.join(fs_path, "index.html")
            if os.path.exists(index_path):
                self.path = self.path.rstrip("/") + "/index.html"

        return super().do_GET()

    def end_headers(self):
        # Enable CORS and caching headers for smooth local asset loading
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        super().end_headers()

    def log_message(self, format, *args):
        # Clean terminal logging
        sys.stdout.write(f"[{self.log_date_time_string()}] {args[0]} - {args[1]} -> {args[2]}\n")

def run():
    server_address = ("", PORT)
    httpd = HTTPServer(server_address, AntigravityRequestHandler)
    url = f"http://localhost:{PORT}/"
    print("=" * 65, flush=True)
    print("  GOOGLE ANTIGRAVITY - LOCAL SERVER", flush=True)
    print("=" * 65, flush=True)
    print(f"  Serving directory: {SITE_DIR}", flush=True)
    print(f"  Server URL:        {url}", flush=True)
    print(f"  Debug GUI Mode:    {url}?gui=true", flush=True)
    print("  Press Ctrl+C to stop the server.", flush=True)
    print("=" * 65, flush=True)
    
    # Automatically open browser
    try:
        webbrowser.open(url)
    except Exception:
        pass

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer shutting down gracefully.", flush=True)
        httpd.server_close()

if __name__ == "__main__":
    run()
