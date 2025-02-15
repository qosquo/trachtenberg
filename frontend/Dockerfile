FROM node:18-alpine

WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости внутри контейнера
RUN npm install

# Копируем остальные файлы
COPY . .

# Сборка и запуск
RUN npm run build
CMD ["npm", "start"]