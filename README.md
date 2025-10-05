# Codelyzer

[![Build Status](https://img.shields.io/github/actions/workflow/status/atharv3221/codelyzer/./github/workflows/pylint.yml?branch=main)](https://github.com/atharv3221/Codelyzer/actions)
[![License](https://img.shields.io/github/license/atharv3221/codelyzer)](LICENSE)
[![Java Version](https://img.shields.io/badge/Java-17-blue.svg)](https://adoptium.net/)
[![Docker](https://img.shields.io/docker/pulls/atharv3321/codelyzer)](https://hub.docker.com/r/atharv3321/codelyzer)

---

## 🎯 Overview

**Codelyzer** automates code quality checks by combining static analysis tools with AI-powered insights to help developers maintain and improve Java projects effortlessly. It analyzes codebases using [Checkstyle](https://checkstyle.org/) and leverages large language models (LLMs) via a flexible Python and shell backend to generate context-aware fixes and submit automatic pull requests, streamlining the entire code review process.

Currently, Codelyzer supports Java 17+ projects with Checkstyle, and its extensible architecture will enable future additions of languages, static tools, and deployment platforms.

---

## ✨ Features

- **Java 17+ Support:** Built for modern Java development.
- **Static Code Analysis:** Runs robust Checkstyle scans for style, best practices, and quality issues.
- **AI-Powered Fix Generation:** Uses LLMs to interpret analysis and create meaningful code improvements.
- **Automated Pull Requests:** Opens PRs in your repository with minimal manual intervention.
- **Safe Fork-Based Workflow:** Operates on forks to ensure repository safety.
- **Multi-Backend Architecture:** Python and shell scripts power the backend orchestration.
- **Containerized Deployment:** Ready-to-use Docker images simplify installation.
- **Cloud Compatible:** Deploy easily on platforms like Railway, Cerebras, and Meta cloud.

---

## 🚀 Getting Started

### Prerequisites

- Java 17 or above ([Adoptium OpenJDK](https://adoptium.net/))
- Docker (recommended)
- Git

### Installation

Clone the repository:

git clone https://github.com/yourusername/codelyzer.git
cd codelyzer

text

#### Using Docker

Build the Docker image:

docker build -t yourusername/codelyzer .

text

Run Codelyzer against a local Java project:

docker run --rm -v /path/to/your/java/project:/app/project yourusername/codelyzer --source /app/project

text

#### Manual Setup and Run

Build the Java backend (example using Maven):

mvn clean install

text

Run the Java analysis tool:

java -jar target/codelyzer.jar --source /path/to/your/java/source --output ./codelyzer-report.md

text

Run the backend AI processor (Python and shell scripts as per your setup).

---

## ⚙️ How It Works

1. Connect or specify your Java repository.
2. Static analysis runs with Checkstyle to identify issues.
3. Results are processed by the AI backend utilizing LLMs.
4. AI generates improvement suggestions and code fixes.
5. Pull requests with the fixes are automatically submitted to your repo.

---

## 🌐 Tech Stack

| Component        | Technology                    |
| ---------------- | ----------------------------- |
| Static Analysis  | Checkstyle                    |
| Backend          | Python, Shell Scripts         |
| Frontend         | React                         |
| Containerization | Docker                        |
| Cloud Deployment | Railway, Cerebras, Meta Cloud |

---

## 🔮 Roadmap

<details>
  <summary>Click to expand the roadmap</summary>

- Add support for additional static analysis tools: SpotBugs, PMD.
- Extend multi-language support: Python, JavaScript, TypeScript.
- Custom rule configuration options in UI.
- Batch processing for multiple repositories.
- CI/CD pipeline integrations.
- Web dashboard for detailed reports and metrics.

</details>

---

## 📞 Contact & Support

Have questions or feedback? Open an issue on GitHub or contact:

[Your Email](mailto:your.email@example.com)

Stay connected:

- [Project Website](https://yourprojectwebsite.com)
- [Discussion Forum](https://forum.yourproject.com)
- [Twitter](https://twitter.com/yourproject)
- [Discord](https://discord.gg/yourproject)

---

## ⚠️ Disclaimer

Codelyzer is in active development and focuses currently on Java with Checkstyle. Please review all generated pull requests before merging.

---

## 📝 License

This project is licensed under the [MIT License](LICENSE). Use, modify, and distribute freely.

---

_Made with ❤️ by the Codelyzer Team_
