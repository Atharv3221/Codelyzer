# Codelyzer

## Reference Structure

codelyzer/
│
├── backend/ # Python orchestrator & API
│ ├── app.py # Flask/FastAPI main app
│ ├── orchestrator.py # Core logic: clone repo, detect language, call Docker, call LLM
│ ├── docker_utils.py # Functions to run Docker container
│ ├── github_utils.py # GitHub API helpers (detect languages, open PR)
│ ├── llm_utils.py # Call OpenAI / Meta LLM for code fixes
│ ├── requirements.txt # Python dependencies
│ └── static_reports/ # Optional: store JSON reports temporarily
│
├── docker/ # Docker container for static analysis
│ ├── Dockerfile # Container setup: Java, Python, Node, lint tools
│ ├── run_analysis.sh # Script inside container to run analysis and output JSON
│ └── tools/ # Optional: configs for Checkstyle / Flake8 / ESLint
│
├── frontend/ # Minimal React frontend
│ ├── package.json
│ ├── vite.config.js # or CRA setup
│ ├── src/
│ │ ├── App.jsx # Main React component
│ │ ├── components/
│ │ │ ├── RepoInput.jsx # Input form for repo URL
│ │ │ ├── StatusPanel.jsx # Shows analysis/PR status
│ │ │ └── ReportTable.jsx # Shows issues and fixes
│ │ └── api/
│ │ └── api.js # Axios functions to call backend
│ └── public/
│ └── index.html
│
├── README.md
└── .gitignore
