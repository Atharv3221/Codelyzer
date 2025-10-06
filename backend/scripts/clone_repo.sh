#!/bin/bash
set -e

REPO_URL="$1"

echo "Current directory: $(pwd)"

mkdir -p $(pwd)/backend/temp/repos
REPO_NAME="$(basename -s .git "$REPO_URL")"
CLONE_DIR="$(pwd)/backend/temp/repos/$REPO_NAME"

echo "Removing if already cloned"
rm -rf "$CLONE_DIR"

echo "Cloning $REPO_URL into $CLONE_DIR ..."
git clone "$REPO_URL" "$CLONE_DIR"
echo "Clone completed!"