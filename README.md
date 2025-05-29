```md
# 🧠 strategyX

A full-stack habit and product tracking application built with **Next.js**, **Express.js**, **TypeORM**, and **PostgreSQL**.

---

## ✅ Requirements

- **Node.js** ≥ 18.x
- **Mysql**
- **pnpm** or **npm** or **yarn**

---

## 📦 Project Structure
```

strategyX/
├── backend/ # Express + TypeORM + PostgreSQL
├── strategyx-fe/ # Next.js Frontend
└── package.json # Root-level scripts and tools

---

📝 Assumptions
It's important to note the following assumptions regarding the current state of the project:

Category Management: A separate, dedicated database table for categories (e.g., Category) has not been implemented yet. Category information might be handled differently (e.g., as a string field within the product entity).
User Interface (UI): The current user interface may not exactly match any specific designs or video demonstrations that might exist. The UI is functional but could differ in appearance or layout.

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
Need to provide correct cred

```env
# Database Configuration
DB_TYPE=mysql
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
