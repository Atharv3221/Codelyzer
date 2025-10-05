import os
import requests


def create_cross_fork_pr(github_token, fork_owner, fork_repo,
                         original_owner, original_repo,
                         head_branch, base_branch, pr_title, pr_body=""):
    """
    Creates a PR from a forked repo to the original repo.

    Args:
        github_token: GitHub personal access token with 'repo' scope
        fork_owner: Fork owner username (e.g., "Codelyzer-Bot")
        fork_repo: Fork repository name
        original_owner: Original repo owner (e.g., "Atharv3221")
        original_repo: Original repository name
        head_branch: Branch in the fork
        base_branch: Target branch in original repo (usually 'main')
        pr_title: Pull request title
        pr_body: Pull request description

    Returns: PR URL if successful, None otherwise
    """
    head_ref = f"{fork_owner}:{head_branch}"
    api_url = f"https://api.github.com/repos/{original_owner}/{original_repo}/pulls"

    headers = {
        "Authorization": f"token {github_token}",
        "Accept": "application/vnd.github.v3+json",
        "Content-Type": "application/json"
    }

    data = {
        "title": pr_title,
        "head": head_ref,
        "base": base_branch,
        "body": pr_body or f"🤖 Automated PR from {fork_owner}\n\n{pr_title}",
        "maintainer_can_modify": True
    }

    print(
        f"📤 Creating PR: {fork_owner}/{fork_repo}:{head_branch} → {original_owner}/{original_repo}:{base_branch}")

    try:
        response = requests.post(
            api_url, headers=headers, json=data, timeout=10)

        if response.status_code in (200, 201):
            pr_data = response.json()
            print(f"✅ PR #{pr_data['number']} created: {pr_data['html_url']}")
            return pr_data["html_url"]

        elif response.status_code == 422:
            error_data = response.json()
            errors = error_data.get("errors", [])
            if errors and "pull request already exists" in errors[0].get("message", "").lower():
                print(f"⚠️  PR already exists for {head_branch}")
            else:
                print(
                    f"❌ Validation error: {error_data.get('message', 'Unknown')}")
            return None

        elif response.status_code == 404:
            print(f"❌ Repository or branch not found")
            return None

        elif response.status_code == 403:
            print(f"❌ Permission denied: {response.json().get('message', '')}")
            return None

        else:
            print(f"❌ Failed: HTTP {response.status_code}")
            return None

    except requests.exceptions.RequestException as e:
        print(f"❌ Network error: {e}")
        return None


if __name__ == "__main__":
    GITHUB_TOKEN = os.getenv("BOT_TOKEN")

    if not GITHUB_TOKEN:
        print("❌ BOT_TOKEN environment variable not set!")
        exit(1)

    pr_url = create_cross_fork_pr(
        github_token=GITHUB_TOKEN,
        fork_owner="Codelyzer-Bot",
        fork_repo="P2PChatApplication",
        original_owner="Atharv3221",
        original_repo="P2PChatApplication",
        head_branch="codelyzer-patch-6396",
        base_branch="main",
        pr_title="Fix indentation and naming issues",
        pr_body="🤖 Automated code quality improvements by Codelyzer\n\n"
                "- Fixed indentation issues\n"
                "- Improved naming conventions\n"
                "- Code quality enhancements"
    )

    if pr_url:
        print(f"\n🎉 Success: {pr_url}")
    else:
        print("\n❌ Failed to create PR")
