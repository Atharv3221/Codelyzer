#!/bin/bash
set -e

REPO_NAME="$1"
CHECKSTYLE_TOOL="./../tools/checkstyle-11.1.0-all.jar"
CONFIG="./../config/google_checks.xml"
REPO_PATH="./../temp_repo/$REPO_NAME"

mkdir -p ./../temp_analysis

REPORT_FILE="./../temp_analysis/$REPO_NAME.xml"

echo "Running checkstyle static analysis"
java -jar "$CHECKSTYLE_TOOL" -c "$CONFIG" -f xml "$REPO_PATH" > "$REPORT_FILE" || true

echo "Analysis successfull file located at "$REPORT_FILE""