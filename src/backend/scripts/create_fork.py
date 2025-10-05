#!/usr/bin/env python3
import sys
import requests

# Usage: python create_fork.py <owner> <repo> <personal_access_token>
if len(sys.argv) < 4:
    print(f"Usage: {sys.argv[0]} <owner> <repo> <token>")
    sys.exit(1)

owner = sys.argv[1]    # Original repo owner
repo = sys.argv[2]     # Original repo name
token = sys.argv[3]    # Your GitHub personal access token

api_url = f"https://api.github.com/repos/{owner}/{repo}/forks"

headers = {
    "Authorization": f"token {token}",
    "Accept": "application/vnd.github+json"
}

try:
    response = requests.post(api_url, headers=headers)
    response.raise_for_status()
    fork_data = response.json()
    print(f"Fork created: {fork_data['html_url']}")
except requests.exceptions.HTTPError as e:
    print(f"Failed to create fork: {response.status_code} - {response.text}")
except Exception as e:
    print(f"Error: {e}")
