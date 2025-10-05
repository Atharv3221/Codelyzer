import os
import json
import subprocess
from cerebras.cloud.sdk import Cerebras

# Hardcoded API key (for testing only!)
client = Cerebras(api_key="csk-xcky2dhhrw2pe2d2rvfvyx6vj8yft3tfcjrv4jw65xfvtkjh")

# Repo details
repo_url = "https://github.com/Atharv3221/P2PChatApplication.git"
repo_name = repo_url.split("/")[-1].replace(".git", "")
clone_path = f"./{repo_name}"

def clone_repo():
    if not os.path.exists(clone_path):
        print(f"Cloning {repo_url} ...")
        subprocess.run(["git", "clone", repo_url], check=True)
    else:
        print(f"Repo already exists at {clone_path}, skipping clone.")

def analyze_and_fix_code(json_path, file_path):
    """
    Reads JSON report from file, extracts first 5 issues,
    sends target file + issues to Cerebras LLM for fixes.
    """
    # Check if JSON file exists
    if not os.path.exists(json_path):
        raise FileNotFoundError(f"JSON report not found: {json_path}")

    with open(json_path, "r", encoding="utf-8") as f:
        json_report = json.load(f)

    issues = json_report.get("issues", [])[:5]
    if not issues:
        return "No issues found in JSON file."

    # Check if target file exists
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"Target file not found: {file_path}")

    with open(file_path, "r", encoding="utf-8") as f:
        repo_code = f.read()

    # Prompt for Cerebras
    prompt = f"""
    You are a code-fixing assistant.
    A JSON report of issues was generated for this repository.
    Fix ONLY the first 5 issues listed. Do NOT fix all issues.

    Issues (first 5 only):
    {json.dumps(issues, indent=2)}

    File: {file_path}
    Original Code:
    {repo_code}

    Provide the corrected code as your output, without explanations.
    """

    # Send request to Cerebras LLM
    stream = client.chat.completions.create(
        model="llama-3.3-70b",
        messages=[
            {"role": "system", "content": "You are a helpful coding assistant."},
            {"role": "user", "content": prompt}
        ],
        stream=True,
        max_completion_tokens=2048,
        temperature=0.2,
        top_p=1
    )

    # Collect the streamed response
    fixed_code = ""
    for chunk in stream:
        fixed_code += chunk.choices[0].delta.content or ""

    return fixed_code.strip()

if __name__ == "__main__":
    # Step 1: Clone repo if not cloned
    clone_repo()

    # Step 2: Path to JSON report
    json_file_path = r"C:\Users\ADITYA KUMAR\Desktop\Codelyzer\src\backend\assets\report.json"

    # Step 3: Target file to fix
    target_file = os.path.join(clone_path, "app.py")  # change if needed

    # Step 4: Get fixed code
    fixed_code = analyze_and_fix_code(json_file_path, target_file)

    print("=== FIXED CODE ===")
    print(fixed_code)

    # Step 5: Overwrite file with fixed code
    with open(target_file, "w", encoding="utf-8") as f:
        f.write(fixed_code)
    print(f"Updated file saved: {target_file}")
