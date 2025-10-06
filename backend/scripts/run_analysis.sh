#!/bin/bash
set -e

REPO_NAME="$1"
CHECKSTYLE_TOOL="$(pwd)/backend/tools/checkstyle-11.1.0-all.jar"
CONFIG="$(pwd)/backend/config/google_checks.xml"
REPO_PATH="$(pwd)/backend/temp/repos/$REPO_NAME"

mkdir -p $(pwd)/backend/temp/analysis

REPORT_FILE="$(pwd)/backend/temp/analysis/$REPO_NAME.xml"

echo "Running checkstyle static analysis"
java -jar "$CHECKSTYLE_TOOL" -c "$CONFIG" -f xml "$REPO_PATH" > "$REPORT_FILE" || true

echo "Analysis successfull file located at "$REPORT_FILE""