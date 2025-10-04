import subprocess
import os


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


# Put URLs for now here
print(run_check("https://github.com/Atharv3221/RailwayReservationSystem"))
repo = run_clone("https://github.com/Atharv3221/RailwayReservationSystem")
run_analysis(repo)
