# Assuming this as entry point with user entered repo url
import os
import time
from ..utils.git_utils import run_check, run_analysis, run_remove_resources, run_clone
from ..utils.github_utils import run_create_fork
from ..utils.py_utils import run_list_commits, run_xml_to_json

# Assuming getting url from route frontend api call
repo_url = "htps://github.com/Atharv3221/RailwayReservationSystem"

# Validate if url valid
valid = run_check(repo_url)

# if 0 then valid else invalid
if (valid != 0):
    print("URL was invalid")
    os._exit(1)

# fork the repo return fork repo url if successful (can only access public repos)
fork_url = run_create_fork(repo_url)

if (fork_url is None):
    print("Fork failed please check if repo is public")
    os._exit(1)

# clone in our system
# returns base name for repository in system
repo_name = run_clone(fork_url)

# Do analysis
run_analysis(repo_name)

# Convert analysis to json
run_xml_to_json(repo_name)

# create commit data
run_list_commits(repo_url)

# llm part

time.sleep(20)
run_remove_resources(repo_name)
