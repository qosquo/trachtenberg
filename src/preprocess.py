from pymorphy3 import MorphAnalyzer
from razdel import tokenize
from nltk.corpus import stopwords
import numpy as np
import fasttext
import re
import string
import nltk
import os

current_dir = os.path.dirname(__file__)

nltk.download('stopwords')
stopwords_ru = set(stopwords.words('russian')) | {'это'}
morph = MorphAnalyzer()

path = os.path.join(current_dir, '..', 'data', 'processed', 'cc.ru.300.bin')
model = fasttext.load_model(path)

def preprocess_text(text):
  # удаляем всякий мусор и переводим в нижний регистр
  return re.sub(r'<[^>]+>|https?://\S+|[\d]|[^а-яА-ЯёЁ\s]', ' ', text).lower()
  
def tokenize_text(text):
  # токенизируем слова
  tokens = [token.text for token in tokenize(text)]
  # удалим стоп-слова и пунктуацию
  tokens_wo_punct = [token for token in tokens if token not in string.punctuation]
  tokens_wo_punct_stopwords = [token for token in tokens_wo_punct if token not in stopwords_ru]
  # лемматизируем текст
  clean_tokens = [morph.parse(token)[0].normal_form for token in tokens_wo_punct_stopwords]
  return clean_tokens

def vectorize(tokens):
  vectors = [model[token] for token in tokens if token in model]
  if not vectors:
    return np.zeros(model.get_dimension())

  return np.mean(vectors, axis=0)
