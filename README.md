```md
# StrategyX

A full-stack application for tracking daily habits and routines.

## 🧱 Project Structure
```

root/
├── strategyx-fe/ # Frontend (Next.js)
├── backend/ # Backend (Node.js + Express + TypeORM)
├── package.json # Root scripts to manage both FE and BE
└── README.md

```

---

## 🚀 Getting Started

### 1. Clone the repo

```

```bash
git clone https://github.com/mitesh0807/strategyX.git
cd strategyX
```

### 2. Setup Environment

```bash
npm run setupenvdev
```

> This will copy `.env.sample` to `.env.local` for frontend and `.env` for backend.

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start Development Servers

```bash
npm run dev
```

- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:5000/api](http://localhost:5000/api) (configurable via `.env`)

---

## 🏗 Build for Production

```bash
npm run build
```

---

## 📦 Deploy

- Frontend: Can be deployed on platforms like **Vercel**, **Netlify**, etc.
- Backend: Deploy on **Render**, **Railway**, **Fly.io**, or traditional servers like **Heroku**/**DigitalOcean**.

---

## 🧰 Tech Stack

### Frontend (`strategyx-fe`)

- [Next.js](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/)

### Backend (`backend`)

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL / MySQL / SQLite](https://typeorm.io/#/connection-options)
- [Envalid](https://github.com/af/envalid)
- [Winston](https://github.com/winstonjs/winston)

---
