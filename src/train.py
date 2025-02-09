import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from preprocess import preprocess

import joblib
import os

current_dir = os.path.dirname(__file__)
path = os.path.join(current_dir, '..', 'data', 'processed', 'jokes.csv')
df = pd.read_csv(path)
df['text_processed'] = df.text.apply(preprocess)

# векторизация токенов с использование TF-IDF
tfidf = TfidfVectorizer(max_features=10000, ngram_range=(1, 3))

X = tfidf.fit_transform(df.text_processed)
y = df.target

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# обучем модель логистической регрессии
model = LogisticRegression(random_state=42, class_weight=None, solver='liblinear', max_iter=1000, C=1.0)
model.fit(X_train, y_train)

model_path = os.path.join(current_dir, '..', 'models', 'model.pkl')
vectorizer_path = os.path.join(current_dir, '..', 'models', 'tfidf_vectorizer.pkl')
joblib.dump(model, model_path)
joblib.dump(tfidf, vectorizer_path)