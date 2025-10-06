#!/bin/bash
set -e

REPO_NAME="$1"

if [ -z "$REPO_NAME" ]; then
  echo "Error: repo_name variable not set"
  exit 1
fi

REPO_PATH="$(pwd)/backend/temp/repos/$REPO_NAME"
REPORT_XML="$(pwd)/backend/temp/analysis/$REPO_NAME.xml"
REPORT_JSON="$(pwd)/backend/temp/analysis/$REPO_NAME.json"
COMMIT_JSON="$(pwd)/backend/temp/commits/$REPO_NAME.json"
TEMP_FILE="$(pwd)/backend/temp/files/$REPO_NAME.java"

echo "Removing cloned repository..."
rm -rf "$REPO_PATH"

echo "Removing analysis report xml"
rm -rf "$REPORT_XML"

echo "Removing analysis report json"
rm -rf "$REPORT_JSON"

echo "Removing commit list"
rm -rf "$COMMIT_JSON"

echo "Removing temporary files"
rm -rf "$TEMP_FILE"
echo "Completed cleaning up resources..."