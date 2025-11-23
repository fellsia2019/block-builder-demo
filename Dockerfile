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
FROM node:20-alpine

# Устанавливаем nginx
RUN apk add --no-cache nginx supervisor

# Создаем директории
RUN mkdir -p /usr/share/nginx/html /var/log/supervisor /run/nginx

# Копируем собранные файлы
COPY --from=builder /app/dist /usr/share/nginx/html

# Копируем mock-api-server и устанавливаем production зависимости
# Копируем все package файлы (включая package-lock.json если есть)
COPY --from=builder /app/package*.json /app/
COPY mock-api-server-standalone.js /app/
WORKDIR /app
# Используем npm install для production, так как это более устойчиво к проблемам с lock файлом
# npm install автоматически использует package-lock.json если он есть, иначе создаст новый
RUN npm install --only=production --prefer-offline --no-audit

# Копируем конфигурацию nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Создаем supervisor конфигурацию для запуска nginx и node сервера
RUN echo '[supervisord]' > /etc/supervisor/conf.d/supervisord.conf && \
    echo 'nodaemon=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '[program:nginx]' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'command=nginx -g "daemon off;"' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autostart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autorestart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'priority=10' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stderr_logfile=/var/log/supervisor/nginx.err.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stdout_logfile=/var/log/supervisor/nginx.out.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo '[program:mock-api]' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'command=node mock-api-server-standalone.js' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'directory=/app' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autostart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'autorestart=true' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'priority=20' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'startsecs=2' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stderr_logfile=/var/log/supervisor/mock-api.err.log' >> /etc/supervisor/conf.d/supervisord.conf && \
    echo 'stdout_logfile=/var/log/supervisor/mock-api.out.log' >> /etc/supervisor/conf.d/supervisord.conf

EXPOSE 80

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
