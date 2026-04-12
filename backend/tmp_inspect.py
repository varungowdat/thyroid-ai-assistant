import os
import pandas as pd
base = 'c:/Users/varun/projects ml and data preprocessing/project 2/data_model'
print('base exists:', os.path.exists(base))
print('entries:', os.listdir(base))
path = os.path.join(base, 'Thyroid_Diff.csv')
print('path exists:', os.path.exists(path))
if os.path.exists(path):
    df = pd.read_csv(path)
    cols = ['Gender','Smoking','Hx Smoking','Hx Radiothreapy','Thyroid Function','Physical Examination','Adenopathy','Pathology','Focality','Risk','Stage','T','N','M','Response']
    for c in cols:
        print(c, sorted(df[c].dropna().unique().tolist()))
    print('shape', df.shape)
