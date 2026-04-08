import numpy as np
from typing import Dict

def encode_categorical(value: str, categories: list) -> int:
    try:
        return categories.index(value)
    except ValueError:
        return 0

def preprocess_patient_data(data: Dict) -> np.ndarray:
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

    features = [
        float(data.get('age', 0)),
        encode_categorical(data.get('gender', 'M'), gender_map),
        encode_categorical(data.get('smoking', 'No'), binary_map),
        encode_categorical(data.get('hx_smoking', 'No'), binary_map),
        encode_categorical(data.get('hx_radiotherapy', 'No'), binary_map),
        encode_categorical(data.get('thyroid_function', 'Euthyroid'), thyroid_function_map),
        encode_categorical(data.get('physical_examination', 'Normal'), physical_exam_map),
        encode_categorical(data.get('adenopathy', 'No'), adenopathy_map),
        encode_categorical(data.get('pathology', 'Papillary'), pathology_map),
        encode_categorical(data.get('focality', 'Uni-Focal'), focality_map),
        encode_categorical(data.get('risk', 'Low'), risk_map),
        encode_categorical(data.get('t', 'T1a'), t_map),
        encode_categorical(data.get('n', 'N0'), n_map),
    ]

    return np.array(features).reshape(1, -1)
