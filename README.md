# Классификация авторских текстов (NLP + Full-Stack)

Проект для определения соответствия текста заданному стилю с использованием методов машинного обучения и веб-интерфейса для демонстрации результатов.

[![Python](https://img.shields.io/badge/Python-3.13%2B-blue)](https://www.python.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1.6-lightgrey)](https://nextjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115.8-green)](https://fastapi.tiangolo.com/)

## 📌 Особенности
- **End-to-End пайплайн**: от сбора данных до деплоя модели.
- **Веб-интерфейс**: генерация текста большими языковыми моделями и отображение вероятности принадлежности к классу.
- **Сравнение моделей**: Logistic Regression, XGBoost.
- **Оптимизация**: борьба с переобучением, балансировка классов.

## 🛠️ Стек технологий
- **ML/NLP**: Python, scikit-learn, NLTK, TF-IDF, FastText.
- **Бэкенд**: FastAPI, Docker.
- **Фронтенд**: Next.js, Tailwind CSS.

## 🚀 Установка и запуск

### Бэкенд (FastAPI)
```bash
# Клонировать репозиторий
git clone https://github.com/qosquo/trachtenberg.git
cd trachtenberg/api/app

# Установить зависимости
pip install -r ../../requirements.txt

# Запустить сервер
uvicorn main:app --reload
```

### Фронтенд (Next.js)
```bash
cd trachtenberg/frontend

# Установить зависимости
npm install

# Запустить приложение
npm run dev
```

### Пример запроса через API:
```bash
curl -X POST "http://localhost:8000/predict" \
     -H "Content-Type: application/json" \
     -d '{"text": "Ваш текст здесь"}'
```

**Ответ**:
```json
{
  "prediction": 0.72
}
```

## 🔍 Анализ и выводы

- **Проблемы данных**: короткие тексты, субъективность разметки, шум.
- **Пути улучшения**:
        Расширение датасета.
        Дообучение FastText имеющимися данными. Эксперименты с transformer моделями (BERT, RuBERT)