FROM python:3.10-slim

WORKDIR /usr/local/app

COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN python -m nltk.downloader stopwords

COPY api/app ./api/app

WORKDIR /usr/local/app/api/app

CMD uvicorn main:app --host 0.0.0.0 --port $PORT