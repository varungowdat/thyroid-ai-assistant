import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA

np.random.seed(42)

n_samples = 1000
n_features = 13

X_train = np.random.randn(n_samples, n_features)

y_recurrence = np.random.choice([0, 1], size=n_samples, p=[0.7, 0.3])
y_response = np.random.choice([0, 1, 2], size=n_samples, p=[0.6, 0.25, 0.15])

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_train)

pca = PCA(n_components=10)
X_pca = pca.fit_transform(X_scaled)

recurrence_model = RandomForestClassifier(n_estimators=100, random_state=42)
recurrence_model.fit(X_pca, y_recurrence)

response_model = RandomForestClassifier(n_estimators=100, random_state=42)
response_model.fit(X_pca, y_response)

joblib.dump(recurrence_model, 'recurrence_model.pkl')
joblib.dump(response_model, 'response_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
joblib.dump(pca, 'pca.pkl')

print("Models trained and saved successfully!")
print(f"Recurrence model accuracy: {recurrence_model.score(X_pca, y_recurrence):.2f}")
print(f"Response model accuracy: {response_model.score(X_pca, y_response):.2f}")
