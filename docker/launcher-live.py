#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler
import subprocess, os, urllib.parse
os.chdir("/opt/kuroos")
class H(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/launch/"):
            subprocess.Popen(urllib.parse.unquote(self.path[8:]), shell=True, env={**os.environ, "DISPLAY": ":1"})
            self.send_response(200)
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
        else:
            super().do_GET()
    def log_message(self, *args): pass
print("KuroOS Launcher running on :9999")
HTTPServer(("0.0.0.0", 9999), H).serve_forever()
