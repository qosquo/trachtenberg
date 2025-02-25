from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import sys
import os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', 'src')))

from preprocess import preprocess_text, tokenize_text,vectorize

app = FastAPI()
origins = [
    "http://localhost",
    "https://localhost",
    "http://localhost:3000",
    "https://localhost:3000",
    "http://frontend:3000",
    "https://frontend:3000",
    "http://arena.rrzagitov.xyz",
    "https://arena.rrzagitov.xyz",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = joblib.load('../../models/model.pkl')

class TextRequest(BaseModel):
  text: str

class TextResponse(BaseModel):
  prediction: float

@app.post('/predict', response_model=TextResponse)
def predict(request: TextRequest):
  text = request.text
  tokens = tokenize_text(preprocess_text(text))
  vector = vectorize(tokens)
  prediction = model.predict_proba([vector])
  return {'prediction': prediction[0][1]}