#!/bin/bash
set -e

REPO_NAME="$1"

if [ -z "$REPO_NAME" ]; then
  echo "Error: repo_name variable not set"
  exit 1
fi

REPO_PATH="./../temp_repo/$REPO_NAME"
REPORT_XML="./../temp_analysis/$REPO_NAME.xml"
REPORT_JSON="./../temp_analysis/$REPO_NAME.json"
COMMITLIST_JSON="./../temp_commits/$REPO_NAME.json"

echo "Removing cloned repository..."
rm -rf "$REPO_PATH"

echo "Removing analysis report xml"
rm -rf "$REPORT_XML"

echo "Removing analysis report json"
rm -rf "$REPORT_JSON"

echo "Removing commit list"
rm -rf "$COMMITLIST_JSON"

echo "Completed cleaning up resources..."