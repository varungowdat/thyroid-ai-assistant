"""
Train thyroid cancer recurrence prediction model
Based on: thyroidcancer_re.ipynb
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, classification_report
import joblib
import os
import sys

def train_recurrence_model(csv_path):
    """Train the recurrence prediction model using the same input format as the API."""
    
    print("Loading thyroid cancer dataset...")
    df = pd.read_csv(csv_path)
    
    print("Preprocessing data...")
    
    # Keep only the features that the frontend API can provide.
    # The recurrence predictor uses the same mapping as preprocess_patient_data.
    def encode_categorical(value, categories):
        try:
            return categories.index(value)
        except ValueError:
            return 0
    
    gender_map = ['M', 'F']
    binary_map = ['No', 'Yes']
    thyroid_function_map = ['Euthyroid', 'Clinical Hyperthyroidism', 'Subclinical Hyperthyroidism',
                            'Clinical Hypothyroidism', 'Subclinical Hypothyroidism']
    physical_exam_map = ['Single nodular goiter-left', 'Single nodular goiter-right',
                         'Multinodular goiter', 'Normal']
    adenopathy_map = ['No', 'Right', 'Left', 'Bilateral', 'Posterior']
    pathology_map = ['Micropapillary', 'Papillary', 'Follicular', 'Hurthle cell']
    focality_map = ['Uni-Focal', 'Multi-Focal']
    risk_map = ['Low', 'Intermediate', 'High']
    t_map = ['T1a', 'T1b', 'T2', 'T3a', 'T3b', 'T4a', 'T4b']
    n_map = ['N0', 'N1a', 'N1b']
    
    X = []
    y = []
    for _, row in df.iterrows():
        try:
            features = [
                float(row.get('Age', 0)),
                encode_categorical(row.get('Gender', 'M'), gender_map),
                encode_categorical(row.get('Smoking', 'No'), binary_map),
                encode_categorical(row.get('Hx Smoking', 'No'), binary_map),
                encode_categorical(row.get('Hx Radiothreapy', 'No'), binary_map),
                encode_categorical(row.get('Thyroid Function', 'Euthyroid'), thyroid_function_map),
                encode_categorical(row.get('Physical Examination', 'Normal'), physical_exam_map),
                encode_categorical(row.get('Adenopathy', 'No'), adenopathy_map),
                encode_categorical(row.get('Pathology', 'Papillary'), pathology_map),
                encode_categorical(row.get('Focality', 'Uni-Focal'), focality_map),
                encode_categorical(row.get('Risk', 'Low'), risk_map),
                encode_categorical(row.get('T', 'T1a'), t_map),
                encode_categorical(row.get('N', 'N0'), n_map),
            ]
            X.append(features)
            y.append(0 if row.get('Recurred', 'No') == 'No' else 1)
        except Exception as e:
            print(f"Skipping row due to error: {e}")
            continue

    X = np.array(X)
    y = np.array(y)
    
    print(f"Loaded {len(X)} samples with {X.shape[1]} features")
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Logistic Regression model...")
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))
    
    models_dir = os.path.dirname(__file__)
    print(f"\nSaving models to {models_dir}...")
    joblib.dump(model, os.path.join(models_dir, 'recurrence_model.pkl'))
    joblib.dump(scaler, os.path.join(models_dir, 'recurrence_scaler.pkl'))
    
    print("✓ Recurrence model saved successfully!")
    return model, scaler

if __name__ == "__main__":
    # Path to the local dataset in the workspace
    csv_path = os.path.join(os.path.dirname(__file__), '..', '..', 'src', 'data_models', 'Thyroid_Diff.csv')
    csv_path = os.path.normpath(csv_path)
    
    if not os.path.exists(csv_path):
        print(f"Error: Dataset not found at {csv_path}")
        sys.exit(1)
    
    train_recurrence_model(csv_path)
