#!/usr/bin/env python3
import sys
import os
import json
import requests

if len(sys.argv) < 2:
    print(f"Usage: {sys.argv[0]} <repo_url>")
    sys.exit(1)

repo_url = sys.argv[1]
parts = repo_url.rstrip("/").split("/")
owner = parts[-2]
repo_name = parts[-1].replace(".git", "")

api_url = f"https://api.github.com/repos/{owner}/{repo_name}/commits?per_page=10"

try:
    resp = requests.get(api_url)
    resp.raise_for_status()
    commits = resp.json()
except Exception as e:
    print(f"Failed to fetch commits: {e}")
    sys.exit(1)

out = []
for c in commits:
    commit_info = c.get("commit", {})
    author_info = commit_info.get("author", {})
    out.append({
        "sha": c.get("sha"),
        "author": author_info.get("name"),
        "date": author_info.get("date"),
        "message": commit_info.get("message"),
    })

output_dir = os.path.join(os.path.dirname(__file__), "./../temp_commits")
os.makedirs(output_dir, exist_ok=True)
output_path = os.path.join(output_dir, f"{repo_name}.json")

with open(output_path, "w", encoding="utf-8") as f:
    json.dump(out, f, indent=2)

print(f"Commits saved to {output_path}")
