from pymorphy3 import MorphAnalyzer
from razdel import tokenize
from nltk.corpus import stopwords
import re
import string
import nltk
import os

current_dir = os.path.dirname(__file__)
path = os.path.join(current_dir, '..', 'data', 'processed', 'navec_hudlit_v1_12B_500K_300d_100q.tar')

nltk.download('stopwords')
stopwords_ru = set(stopwords.words('russian')) | {'это'}
morph = MorphAnalyzer()

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