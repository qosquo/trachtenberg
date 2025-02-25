import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from xgboost import XGBClassifier
from imblearn.combine import SMOTETomek
from preprocess import preprocess_text, tokenize_text

import joblib
import os

current_dir = os.path.dirname(__file__)
path = os.path.join(current_dir, '..', 'data', 'processed', 'jokes.csv')
df = pd.read_csv(path)
df['clean_text'] = df['text'].apply(lambda x: " ".join(tokenize_text(preprocess_text(x))))

# векторизация токенов с использование TF-IDF
tfidf = TfidfVectorizer(max_features=10000, ngram_range=(1, 3), preprocessor=preprocess_text, tokenizer=tokenize_text, token_pattern=None)

X = tfidf.fit_transform(df.clean_text)
y = df.target

resampler = SMOTETomek(random_state=42, sampling_strategy=0.3)
X_res, y_res = resampler.fit_resample(X, y)

X_train, X_test, y_train, y_test = train_test_split(X_res, y_res, test_size=0.1, random_state=42)

# обучаем модель градиентного бустинга на решающих деревьях
model = XGBClassifier(
  booster='gbtree',
  objective='binary:logistic',
  scale_pos_weight=(len(y_train) - sum(y_train)) / sum(y_train),
  reg_lambda=0.01,
  tree_method='exact',
)
model.fit(X_train, y_train)

model_path = os.path.join(current_dir, '..', 'models', 'model.pkl')
if not os.path.exists(os.path.dirname(model_path)):
    os.makedirs(os.path.dirname(model_path))

vectorizer_path = os.path.join(current_dir, '..', 'models', 'tfidf_vectorizer.pkl')
joblib.dump(model, model_path)
joblib.dump(tfidf, vectorizer_path)