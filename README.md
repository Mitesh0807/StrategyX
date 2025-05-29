```md
# 🧠 strategyX

A full-stack habit and product tracking application built with **Next.js**, **Express.js**, **TypeORM**, and **PostgreSQL**.

---

## ✅ Requirements

- **Node.js** ≥ 18.x
- **PostgreSQL** ≥ 12.x
- **npm** or **yarn**
- Optional: Docker (for containerized Postgres)

---

## 📦 Project Structure
```

strategyX/
├── backend/ # Express + TypeORM + PostgreSQL
├── strategyx-fe/ # Next.js Frontend
└── package.json # Root-level scripts and tools

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/mitesh0807/strategyX.git
cd strategyX
```

### 2. Setup environment files

```bash
npm run setupenvdev
```

This will copy `.env.example` files to:

- `strategyx-fe/.env.local`
- `backend/.env`

You can then update these files if needed.

---

## 🛠️ Backend Environment Configuration

Here’s an example `.env` for the **backend**:

```env
# Database Configuration
DB_TYPE=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=postgres
DB_SYNCHRONIZE=false
DB_LOGGING=true
```

---

## 🧱 Migrations

Generate or run migrations using the following commands:

```bash
npm run migrate            # Runs all pending migrations
npm run migrate:generate  # Generate new migration
npm run migrate:revert    # Revert the last migration
```

Example:

```bash
npm run migrate:generate -- AddCategoryRelation
```

---

## 🌱 Seeding the Database

To seed your database with default users and products:

```bash
npm run seed
```

**This creates the following default users:**

| Email                                             | Password       | Role  |
| ------------------------------------------------- | -------------- | ----- |
| [admin@example.com](mailto:admin@example.com)     | password123    | Admin |
| [johndoe@example.com](mailto:johndoe@example.com) | securepassword | User  |

Products will be associated automatically with the above users.

---

## 🧪 Run the App in Development

```bash
npm run dev
```

This will start both:

- Frontend (`strategyx-fe`) on `http://localhost:3000`
- Backend (`backend`) on `http://localhost:5000`

---

## 📦 Build & Start in Production

```bash
npm run build
npm start
```

---

## 🤝 Contributing

PRs are welcome! Please ensure your code is clean and tested.

---

## 📄 License

MIT © [Mitesh Savaliya](https://github.com/mitesh0807)
