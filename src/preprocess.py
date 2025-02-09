from pymorphy3 import MorphAnalyzer
from razdel import tokenize
from nltk.corpus import stopwords
import re
import string
import nltk

nltk.download('stopwords')
stopwords_ru = set(stopwords.words('russian'))
morph = MorphAnalyzer()

def preprocess(text):
  # удаляем всякий мусор
  text = re.sub(r'<[^>]+>|https?://\S+|[\d]|[^а-яА-ЯёЁ\s]', ' ', text)
  # приводим к нижнему регистру
  text = text.lower()
  # токенизируем слова
  tokens = [token.text for token in tokenize(text)]
  # удалим стоп-слова и пунктуацию
  tokens_wo_punct = [token for token in tokens if token not in string.punctuation]
  tokens_wo_punct_stopwords = [token for token in tokens_wo_punct if token not in stopwords_ru]
  # лемматизируем текст
  clean_tokens = [morph.parse(token)[0].normal_form for token in tokens_wo_punct_stopwords]
  # clean_tokens = [snowball.stem(token) for token in tokens_wo_punct_stopwords]
  return " ".join(clean_tokens)