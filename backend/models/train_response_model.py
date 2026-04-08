"""
Train thyroid response prediction model  
Compatible with the API preprocessing
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import StandardScaler, OrdinalEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import joblib
import os
import sys

def train_response_model(csv_path):
    """Train the response prediction model using consistent preprocessing"""
    
    print("Loading thyroid dataset...")
    # Load the raw CSV data from the other notebook that has better structured data
    # Instead, we'll use the Thyroid_Diff.csv which has raw categorical data
    
    # First, try to create synthetic training data compatible with preprocessing
    # Or read from the original Thyroid_Diff.csv
    try:
        df = pd.read_csv("c:\\Users\\varun\\projects ml and data preprocessing\\project 2\\data_model\\Thyroid_Diff.csv")
        print("Loading from Thyroid_Diff.csv for better data quality...")
    except:
        df = pd.read_csv(csv_path)
        print("Loaded preprocessed data")
    
    print("Preprocessing data...")
    
    # Define encoding maps consistent with the API preprocessing
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
    m_map = ['M0', 'M1']
    
    # Encode categorical columns
    feature_cols = ['Age', 'Gender', 'Smoking', 'Hx Smoking', 'Hx Radiothreapy',
                    'Thyroid Function', 'Physical Examination', 'Adenopathy',
                    'Pathology', 'Focality', 'Risk', 'T', 'N']
    
    X = []
    y = []
    
    for idx, row in df.iterrows():
        try:
            features = [
                float(row.get('Age', 0)),
                gender_map.index(row.get('Gender', 'M')),
                binary_map.index(row.get('Smoking', 'No')),
                binary_map.index(row.get('Hx Smoking', 'No')),
                binary_map.index(row.get('Hx Radiothreapy', 'No')),
                thyroid_function_map.index(row.get('Thyroid Function', 'Euthyroid')),
                physical_exam_map.index(row.get('Physical Examination', 'Normal')),
                adenopathy_map.index(row.get('Adenopathy', 'No')),
                pathology_map.index(row.get('Pathology', 'Papillary')),
                focality_map.index(row.get('Focality', 'Uni-Focal')),
                risk_map.index(row.get('Risk', 'Low')),
                t_map.index(row.get('T', 'T1a')),
                n_map.index(row.get('N', 'N0')),
            ]
            X.append(features)
            
            # Map Response to numeric
            response_val = row.get('Response', 2)
            if isinstance(response_val, str):
                response_map = {
                    'Excellent': 0,
                    'Indeterminate': 1,
                    'Biochemical Incomplete': 2,
                    'Structural Incomplete': 3
                }
                y.append(response_map.get(response_val, 2))
            else:
                y.append(int(response_val))
        except Exception as e:
            print(f"Error processing row {idx}: {e}")
            continue
    
    X = np.array(X)
    y = np.array(y)
    
    print(f"Loaded {len(X)} samples with {X.shape[1]} features")
    print(f"Response distribution: {np.bincount(y)}")
    
    print("Splitting data...")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    
    print("Scaling features...")
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    print("Training Random Forest model...")
    model = RandomForestClassifier(
        n_estimators=400,
        max_depth=12,
        min_samples_split=5,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1
    )
    
    model.fit(X_train_scaled, y_train)
    
    y_pred = model.predict(X_test_scaled)
    accuracy = accuracy_score(y_test, y_pred)
    
    print(f"\nModel Accuracy: {accuracy:.4f}")
    print("\nClassification Report:")
    print(classification_report(y_test, y_pred, zero_division=0))
    print("\nConfusion Matrix:")
    print(confusion_matrix(y_test, y_pred))
    
    scores = cross_val_score(model, X_train_scaled, y_train, cv=5)
    print(f"\nCV Mean Accuracy: {scores.mean():.4f}")
    
    # Save model
    models_dir = os.path.dirname(__file__)
    
    print(f"\nSaving model to {models_dir}...")
    joblib.dump(model, os.path.join(models_dir, 'response_model.pkl'))
    joblib.dump(scaler, os.path.join(models_dir, 'response_scaler.pkl'))
    
    print("✓ Response model saved successfully!")
    return model

if __name__ == "__main__":
    # Path to the preprocessed dataset (already one-hot encoded)
    dataset_path = "c:\\Users\\varun\\projects ml and data preprocessing\\project 2\\data_model\\thyroid_final_dataset (1).xls"
    
    if not os.path.exists(dataset_path):
        print(f"Error: Dataset not found at {dataset_path}")
        sys.exit(1)
    
    train_response_model(dataset_path)
