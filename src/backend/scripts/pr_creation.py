import os
import random
import shutil
import subprocess
import requests


def create_branch_and_pr(repo_dir, src_file, temp_file, commit_msg, github_token,
                         fork_owner, fork_repo, original_owner, original_repo, base_branch="main"):
    """
    Copies fixed file, commits, pushes to YOUR fork, and creates a PR to the ORIGINAL repo.

    Args:
        repo_dir: Local directory of the cloned fork
        src_file: Target file to replace
        temp_file: Fixed file to copy
        commit_msg: Commit message
        github_token: GitHub token for authentication
        fork_owner: YOUR GitHub username (where you push)
        fork_repo: YOUR forked repo name
        original_owner: Original repo owner (where you create PR)
        original_repo: Original repo name
        base_branch: Branch to create PR against

    Returns PR URL if successful, or None on failure.
    """

    # ✅ Validate files and directories exist before proceeding
    if not os.path.exists(temp_file):
        print(f"❌ Error: Temporary file not found: {temp_file}")
        return None

    if not os.path.exists(src_file):
        print(f"❌ Error: Source file not found: {src_file}")
        return None

    if not os.path.exists(repo_dir):
        print(f"❌ Error: Repository directory not found: {repo_dir}")
        return None

    if not github_token:
        print("❌ Error: GitHub token not found. Set CODELYZER_BOT environment variable.")
        return None

    # 1️⃣ Copy temp → src
    try:
        shutil.copyfile(temp_file, src_file)
        print(f"✅ Copied {temp_file} → {src_file}")
    except Exception as e:
        print(f"❌ Failed to copy file: {e}")
        return None

    # 2️⃣ Generate non-repeating random branch name
    used_branches_path = os.path.join(repo_dir, ".used_branches.txt")
    used_branches = []
    if os.path.exists(used_branches_path):
        with open(used_branches_path) as f:
            used_branches = f.read().splitlines()

    branch_name = None
    for _ in range(10):
        candidate = f"codelyzer-patch-{random.randint(1000, 9999)}"
        if candidate not in used_branches:
            branch_name = candidate
            break

    if not branch_name:
        print("❌ Could not generate a unique branch name")
        return None

    # Save updated used branches (keep only last 10)
    used_branches.append(branch_name)
    with open(used_branches_path, "w") as f:
        f.write("\n".join(used_branches[-10:]))

    # 3️⃣ Git operations
    try:
        # Verify git repo
        result = subprocess.run(["git", "-C", repo_dir, "remote", "-v"],
                                check=True, capture_output=True, text=True)
        print(f"📍 Git remotes:\n{result.stdout}")

        # Check current branch and switch to base branch first
        subprocess.run(["git", "-C", repo_dir, "checkout", base_branch],
                       check=True, capture_output=True)
        print(f"✅ Switched to {base_branch}")

        # Pull latest changes
        subprocess.run(["git", "-C", repo_dir, "pull"],
                       check=True, capture_output=True)
        print(f"✅ Pulled latest changes")

        # Create and checkout new branch
        subprocess.run(["git", "-C", repo_dir, "checkout", "-b", branch_name],
                       check=True, capture_output=True)
        print(f"✅ Created branch: {branch_name}")

        # Stage the file (use relative path from repo_dir)
        relative_src_file = os.path.relpath(src_file, repo_dir)
        print(f"📝 Staging file: {relative_src_file}")
        subprocess.run(["git", "-C", repo_dir, "add", relative_src_file],
                       check=True, capture_output=True)

        # Check if there are changes to commit
        status_result = subprocess.run(["git", "-C", repo_dir, "status", "--porcelain"],
                                       capture_output=True, text=True)
        print(f"📊 Git status:\n{status_result.stdout}")

        if not status_result.stdout.strip():
            print("⚠️  No changes to commit")
            return None

        # Commit changes
        subprocess.run(["git", "-C", repo_dir, "commit", "-m", commit_msg],
                       check=True, capture_output=True)
        print(f"✅ Committed changes")

        # Configure git to use token for authentication
        remote_url = f"https://{github_token}@github.com/{fork_owner}/{fork_repo}.git"
        subprocess.run(["git", "-C", repo_dir, "remote", "set-url", "origin", remote_url],
                       check=True, capture_output=True)

        # Push to YOUR fork
        push_result = subprocess.run(["git", "-C", repo_dir, "push", "-u", "origin", branch_name],
                                     check=True, capture_output=True, text=True)
        print(f"✅ Pushed to {fork_owner}/{fork_repo}:{branch_name}")

    except subprocess.CalledProcessError as e:
        print(f"❌ Git error: {e}")
        if e.stderr:
            print(
                f"   stderr: {e.stderr.decode() if isinstance(e.stderr, bytes) else e.stderr}")
        if e.stdout:
            print(
                f"   stdout: {e.stdout.decode() if isinstance(e.stdout, bytes) else e.stdout}")
        return None

    # 4️⃣ Create Pull Request to ORIGINAL repo via GitHub API
    api_url = f"https://api.github.com/repos/{original_owner}/{original_repo}/pulls"
    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # Format: fork_owner:branch_name
    head_ref = f"{fork_owner}:{branch_name}"

    data = {
        "title": commit_msg,
        "head": head_ref,
        "base": base_branch,
        "body": f"🤖 **Automated patch from Codelyzer**\n\n{commit_msg}\n\n---\n*This PR was automatically generated by Codelyzer to improve code quality*"
    }

    print(
        f"\n📤 Creating PR from {head_ref} to {original_owner}/{original_repo}:{base_branch}")

    try:
        response = requests.post(
            api_url, headers=headers, json=data, timeout=10)

        if response.status_code in (200, 201):
            pr_url = response.json()["html_url"]
            print(f"✅ Pull Request created: {pr_url}")
            return pr_url
        else:
            print(f"❌ Failed to create PR: {response.status_code}")
            print(f"   Response: {response.text}")
            return None
    except requests.exceptions.RequestException as e:
        print(f"❌ Network error while creating PR: {e}")
        return None


if __name__ == "__main__":
    print("=" * 80)
    print("🔍 CODELYZER PR CREATION")
    print("=" * 80)

    # ✅ Use ABSOLUTE paths
    BASE_DIR = r"C:\Users\athar\OneDrive\Desktop\Codelyzer2\src\backend"

    SRC_FILE = os.path.join(BASE_DIR, "temp_repo", "P2PChatApplication",
                            "src", "main", "java", "p2pchatapplication", "ChatClient.java")
    TEMP_FILE = os.path.join(BASE_DIR, "temp_files", "ChatClient.java")
    REPO_DIR = os.path.join(BASE_DIR, "temp_repo", "P2PChatApplication")

    print(f"\n📁 Checking paths:")
    print(
        f"   Source file: {SRC_FILE} {'✅' if os.path.exists(SRC_FILE) else '❌'}")
    print(
        f"   Temp file: {TEMP_FILE} {'✅' if os.path.exists(TEMP_FILE) else '❌'}")
    print(
        f"   Repo dir: {REPO_DIR} {'✅' if os.path.exists(REPO_DIR) else '❌'}")

    print("\n" + "=" * 80 + "\n")

    COMMIT_MSG = "Fix indentation and naming issues"

    # ✅ Load GitHub token from environment
    GITHUB_TOKEN = os.getenv("CODELYZER_BOT")
    if not GITHUB_TOKEN:
        print("❌ CODELYZER_BOT environment variable not set!")
        exit(1)

    # ✅ Repository configuration
    # YOUR fork (where you push changes)
    FORK_OWNER = "Codelyzer-Bot"  # or "Atharv3221" if you're using your personal account
    FORK_REPO = "P2PChatApplication"

    # Original repo (where you create the PR)
    ORIGINAL_OWNER = "Atharv3221"
    ORIGINAL_REPO = "P2PChatApplication"

    print(f"🔧 Configuration:")
    print(f"   Push to: {FORK_OWNER}/{FORK_REPO}")
    print(f"   PR to: {ORIGINAL_OWNER}/{ORIGINAL_REPO}")
    print()

    # Execute PR creation
    pr_url = create_branch_and_pr(
        repo_dir=REPO_DIR,
        src_file=SRC_FILE,
        temp_file=TEMP_FILE,
        commit_msg=COMMIT_MSG,
        github_token=GITHUB_TOKEN,
        fork_owner=FORK_OWNER,
        fork_repo=FORK_REPO,
        original_owner=ORIGINAL_OWNER,
        original_repo=ORIGINAL_REPO
    )

    if pr_url:
        print(f"\n🎉 SUCCESS! PR created at: {pr_url}")
    else:
        print("\n❌ PR creation failed. Check the errors above.")
