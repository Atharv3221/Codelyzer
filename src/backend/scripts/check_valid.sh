#!/bin/bash
set -e

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo "Error: URL variable not set"
  exit 1
fi

echo "Checking if repository exists..."

# Validate repo URL by trying to access remote refs (without cloning)
if ! git ls-remote "$REPO_URL" &> /dev/null; then
  echo "Invalid repository URL or repository not accessible: $REPO_URL"
  exit 1
fi

echo "Repository URL is valid."

