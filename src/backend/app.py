from flask import Flask
from routes.repo_routes import repo_bp

app = Flask(__name__)

# Register blueprint for repo-related APIs
app.register_blueprint(repo_bp, url_prefix="/api")

if __name__ == "__main__":
    # Run Flask in debug mode (for local testing)
    app.run(host="0.0.0.0", port=5000, debug=True)
