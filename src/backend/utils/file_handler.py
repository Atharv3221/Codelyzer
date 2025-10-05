import os
current_dir = os.path.dirname(os.path.abspath(__file__))
analysis_path = os.path.abspath(os.path.join(
    current_dir, "./../temp_analysis/P2PChatApplication.json"))
print(os.__file__.find(
    "C:/Users/athar/OneDrive/Desktop/Codelyzer2/src/backend/temp_analysis/P2PChatApplication.json"))
print(analysis_path)
