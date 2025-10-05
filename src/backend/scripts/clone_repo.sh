#!/bin/bash
set -e

REPO_URL="$1"

if [ -z "$REPO_URL" ]; then
  echo "Error: URL variable not set"
  exit 1
fi

mkdir -p ./../temp_repo

REPO_NAME=$(basename -s .git "$REPO_URL")
CLONE_DIR="./../temp_repo/$REPO_NAME"

echo "Removing if already cloned"
rm -rf "$CLONE_DIR"

echo "Cloning $REPO_URL into $CLONE_DIR ..."
git clone "$REPO_URL" "$CLONE_DIR"
echo "Clone completed!"