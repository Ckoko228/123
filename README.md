# Construction Company Website

Практический проект — многостраничный сайт строительной компании.

## Технологии

- HTML
- CSS
- JavaScript
- Node.js
- Express
- MySQL

## Возможности

- Главная страница
- Страница «О компании»
- Услуги
- Портфолио
- Контакты
- Форма обратной связи
- Сохранение заявок в MySQL
- Авторизация администратора
- JWT-защита административных маршрутов
- Просмотр заявок
- Изменение статуса заявок
- Добавление, редактирование и удаление проектов
- Добавление, редактирование и удаление услуг
- Редактирование содержимого страниц
- Базовая защита формы от повторной отправки

## Установка

1. Установить Node.js.
2. Установить MySQL Server.
3. Скачать или клонировать проект.
4. Перейти в папку проекта:

```bash
cd praktika
```

5. Установить зависимости:

```bash
npm install
```

6. Создать базу данных MySQL:

```sql
CREATE DATABASE construction_company
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;
```

7. Импортировать структуру базы данных:

```bash
mysql -u root -p construction_company < database/migrations/001_initial.sql
```

8. Импортировать тестовые данные:

```bash
mysql -u root -p construction_company < database/seeds/001_demo_data.sql
```

9. Создать файл `.env` на основе `.env.example`.

Пример:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=construction_company
DB_PORT=3306

PORT=3000

JWT_SECRET=your_secret_key
```

10. Создать администратора:

```bash
node createAdmin.js
```

11. Запустить сервер:

```bash
node server/server.js
```

12. Открыть сайт:

```text
http://localhost:3000
```

## Админ-панель

```text
http://localhost:3000/pages/admin.html
```

Демонстрационные данные администратора:

```text
Username: admin
Password: admin123
```

Для реального проекта пароль необходимо заменить.

## Структура проекта

```text
client/
server/
database/
tests/
docs/
```

## База данных

Основные таблицы:

- `admins`
- `pages`
- `services`
- `projects`
- `project_images`
- `contact_requests`

## Git

Проект использует Git для контроля версий.

Секретные данные из `.env` не должны попадать в репозиторий.
