import subprocess
import os
import time
from py_utils import run_xml_to_json, run_list_commits
from github_utils import run_create_fork


def run_clone(repo_url: str):  # Clones the repo if not cloned
    # Get the directory where this file lives
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/clone_repo.sh"))
    script_dir = os.path.dirname(script_path)
    print(f"Running script at: {script_path}")

    # Run the script in its own directory
    rh = subprocess.run(
        ["sh", script_path, repo_url],
        cwd=script_dir,      # ✅ sets working directory to /scripts
        check=True,
        text=True
    )

    repo_name = repo_url.rstrip("/")
    base_name = repo_name.split("/")[-1]

    if base_name.endswith(".git"):
        base_name = base_name[:-4]

    return base_name


def run_check(repo_url: str):  # return 0 for valid and 1 for invalid
    current_dir = os.path.dirname(os.path.abspath(__file__))
    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/check_valid.sh"))
    rh = subprocess.run(["sh", script_path, repo_url])

    return rh.returncode


def run_analysis(repo_name: str):
    # Get the directory where this file lives
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/run_analysis.sh"))
    script_dir = os.path.dirname(script_path)
    print(f"Running script at: {script_path}")

    # Run the script in its own directory
    rh = subprocess.run(
        ["sh", script_path, repo_name],
        cwd=script_dir,      # ✅ sets working directory to /scripts
        check=True,
        text=True
    )

    return rh.returncode


def run_remove_resources(repo_name: str):
    # Get the directory where this file lives
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/remove_resources.sh"))
    script_dir = os.path.dirname(script_path)
    print(f"Running script at: {script_path}")

    # Run the script in its own directory
    rh = subprocess.run(
        ["sh", script_path, repo_name],
        cwd=script_dir,      # ✅ sets working directory to /scripts
        check=True,
        text=True
    )

    return rh.returncode


repo_url = "https://github.com/Atharv3221/P2PChatApplication.git"
run_check(repo_url)
fork_url = run_create_fork(repo_url)
repo_name = run_clone(fork_url)
run_list_commits(repo_url)
run_analysis(repo_name)
run_xml_to_json(repo_name)
# run_remove_resources(repo_name)
