
# 🖼️ Image Service

Микросервис на базе **Node.js, Express и TypeScript** для бесшовной загрузки и управления изображениями через **Cloudflare R2**.

---

## 🛠️ Стек технологий

* **Runtime:** Node.js (v20+)
* **Language:** TypeScript
* **Framework:** Express
* **Storage:** AWS SDK v3 (@aws-sdk/client-s3) для Cloudflare R2
* **Validation & Parsing:** Multer (memory storage)
* **Logging:** Pino
* **Containerization:** Docker & Docker Compose

---

## 📁 Структура проекта

```text
src/
├── controllers/          # Контроллеры (обработка HTTP-запросов и ответов)
├── router/               # Декларативная маршрутизация
├── services/             # Бизнес-логика приложения
├── lib/                  # Инфраструктурные модули и утилиты (логирование, S3-клиент)
├── app.ts                # Инициализация Express приложения
└── index.ts              # Точка входа (запуск сервера)

```

---

## 🚀 Быстрый старт (Локально)

1. **Клонируйте репозиторий и установите зависимости:**
```bash
npm install

```


2. **Создайте файл `.env` в корне проекта и заполните его:**
```env
R2_ACCESS_KEY=your_access_key
R2_SECRET_KEY=your_secret_key
R2_ACCOUNT_ID=your_id
R2_BUCKET_NAME=your_bucket_name

CORS_ORIGIN=http://localhost:3000
PORT=3001
```


3. **Запустите проект в режиме разработки:**
```bash
npm run dev

```



---

## 🐳 Запуск через Docker

Для сборки и запуска проекта в изолированном контейнере:

```bash
# Сборка без кэша и запуск в фоновом режиме
docker compose up --build

```

Для остановки контейнера:

```bash
docker compose down

```

---

## 📌 API Endpoints

### 1. Загрузка изображения

* **URL:** `POST /upload`
* **Content-Type:** `multipart/form-data`
* **Body:** Поле `image` (файл изображения)
* **Response:**
```json
{
  "success": true,
   "message": "Image uploaded successfully",
  "fileName": "1719842400-example.jpg"
}

```
