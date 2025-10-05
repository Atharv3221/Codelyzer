import os
import subprocess


def run_create_fork(repo_url: str):
    # Takes repo url as a input and return fork repo url if successful
    # creating fork else return None
    parts = repo_url.rstrip("/").split("/")

    owner = parts[-2]            # GitHub owner
    repo_name = parts[-1].replace(".git", "")  # Repo name without .git

    print(f"Owner: {owner}")
    print(f"Repo: {repo_name}")

    current_dir = os.path.dirname(os.path.abspath(__file__))
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/create_fork.py"))

    print(f"Running script at: {script_path}")

    CODELYZER_TOKEN = os.getenv("CODELYZER_BOT")
    # You can now pass `owner`, `repo_name`, and `CODELYZER_TOKEN` to your fork method

    # Run the script in its own directory
    rh = subprocess.run(["py", script_path, owner, repo_name, CODELYZER_TOKEN])
    result = None
    if rh.returncode == 0:
        result = f"https://github.com/Codelyzer-Bot/{repo_name}.git"

    return result
