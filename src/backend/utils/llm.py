import json
import os
import sys


def fix_with_llm(repo_name: str):
    """
    Loads Checkstyle analysis data for a repository, extracts file path and errors,
    and prints the structured error list.
    """
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Path construction: Steps up from 'utils' to 'backend', then down into the sibling directory 'temp_analysis'.
    abs_path = os.path.abspath(os.path.join(
        current_dir, f"./../temp_analysis/{repo_name}.json"))

    # Added print for debugging
    print(f"Attempting to load data from: {abs_path}")

    try:
        # Load the JSON data
        with open(abs_path, "r", encoding="utf-8") as f:
            checkstyle_data = json.load(f)

    except FileNotFoundError:
        # Provide clear, actionable feedback on the missing file location
        print(
            f"FileNotFoundError: Analysis file not found at {abs_path}", file=sys.stderr)
        print("ACTION REQUIRED: Ensure the analysis JSON file exists at the location shown above.", file=sys.stderr)
        return
    except json.JSONDecodeError as e:
        print(f"JSONDecodeError: Could not parse JSON. {e}", file=sys.stderr)
        return

    # Check for expected Checkstyle structure (assuming it follows the xml_to_json conversion)
    if "checkstyle" not in checkstyle_data or "file" not in checkstyle_data["checkstyle"]:
        print(
            "Error: JSON does not contain expected 'checkstyle' structure.", file=sys.stderr)
        return

    files = checkstyle_data["checkstyle"]["file"]

    # Handle case where files might be a single dictionary instead of a list
    if isinstance(files, dict):
        files = [files]

    # Process only the first file found, as implied by the original code
    if not files:
        print(
            f"No files found in the checkstyle analysis for {repo_name}.", file=sys.stderr)
        return

    first_file = files[0]

    # Extract file path from attributes
    file_path = first_file["@attributes"]["name"]

    # Handle single error case (dictionary) or multiple errors (list)
    errors = first_file.get("error", [])
    if isinstance(errors, dict):
        errors = [errors]

    error_list = []
    for e in errors:
        # Check if 'e' is not an empty dictionary or None
        if e and "@attributes" in e:
            attrs = e["@attributes"]
            error_list.append({
                "line": int(attrs.get("line", 0)),
                "column": int(attrs.get("column", 0)),
                "severity": attrs.get("severity", "N/A"),
                "message": attrs.get("message", "N/A"),
                "source": attrs.get("source", "N/A")
            })

    print("File path:", file_path)
    print("Errors:")
    for err in error_list:
        print(err)


if __name__ == "__main__":
    fix_with_llm("P3PChatApplication")
