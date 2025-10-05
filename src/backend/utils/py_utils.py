import os
import subprocess


def run_xml_to_json(repo_name):
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/xml_json_converter.py"))
    script_dir = os.path.dirname(script_path)
    print(f"Running script at: {script_path}")

    # Run the script in its own directory
    rh = subprocess.run(
        ["py", script_path, repo_name],
        cwd=script_dir,      # ✅ sets working directory to /scripts
        check=True,
        text=True
    )

    return rh.returncode


def run_list_commits(repo_url: str):
    # Get the directory where this file lives
    current_dir = os.path.dirname(os.path.abspath(__file__))

    # Build path to the Bash script
    script_path = os.path.abspath(os.path.join(
        current_dir, "./../scripts/list_commits.py"))
    script_dir = os.path.dirname(script_path)
    print(f"Running script at: {script_path}")

    # Run the script in its own directory
    rh = subprocess.run(
        ["py", script_path, repo_url],
        cwd=script_dir,      # ✅ sets working directory to /scripts
        check=True,
        text=True
    )
    return rh.returncode
