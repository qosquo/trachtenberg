from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from preprocess import preprocess

app = FastAPI()
model = joblib.load('../../models/model.pkl')
vectorizer = joblib.load('../../models/tfidf_vectorizer.pkl')

class TextRequest(BaseModel):
  text: str

class TextResponse(BaseModel):
  prediction: float

@app.post('/predict', response_model=TextResponse)
def predict(request: TextRequest):
  text = request.text
  clean_text = preprocess(text)
  vector = vectorizer.transform([clean_text])
  prediction = model.predict_proba(vector)
  return {'prediction': prediction[0][1]}