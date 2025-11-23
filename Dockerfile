# Multi-stage build для демо проекта
FROM node:20-alpine AS builder

WORKDIR /app

# Копируем package файлы
COPY package*.json ./
# Используем npm install в builder stage, так как нужны dev зависимости
# и package-lock.json может быть не синхронизирован
RUN npm install --prefer-offline --no-audit

# Копируем исходники
COPY . .

# Копируем .env файл если существует (для production)
# В development используется .env.example
COPY .env* ./

# Собираем проект
# Vite автоматически подхватит переменные из .env
RUN npm run build

# Production stage
FROM nginx:alpine

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
