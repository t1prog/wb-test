#!/bin/sh
set -e

echo "Ожидание готовности PostgreSQL..."

DB_HOST=${DB_HOST:-db}
DB_PORT=${DB_PORT:-5432}

echo "Подключение к $DB_HOST:$DB_PORT..."

until nc -z "$DB_HOST" "$DB_PORT"; do
  echo "PostgreSQL ($DB_HOST:$DB_PORT) недоступен — ждём 2 секунды..."
  sleep 2
done

echo "PostgreSQL готов. Применяем миграции..."

npx knex migrate:latest --knexfile src/config/knex/knexfile.js

echo "Запуск приложения..."
node src/app.js