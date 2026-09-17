# Expense Tracker

Personal finance app to add, view, edit, and delete daily expenses.

Tech stack
- Frontend: React (Vite), JavaScript, Axios
- Backend: Django + Django REST Framework
- Database: SQLite

Quick start

Backend (Python 3.8+)

```bash
cd expense-tracker/backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

Frontend

```bash
cd expense-tracker/frontend
npm install
npm run dev
```

API endpoints

- `POST /api/expenses/` - create expense
- `GET /api/expenses/` - list expenses (query params: `search`, `category`, `start_date`, `end_date`, `ordering`)
- `GET /api/expenses/{id}/` - retrieve expense
- `PUT /api/expenses/{id}/` - full update
- `PATCH /api/expenses/{id}/` - partial update
- `DELETE /api/expenses/{id}/` - delete
- `GET /api/expenses/stats/` - totals and category breakdown
