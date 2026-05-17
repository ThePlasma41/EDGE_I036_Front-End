# TaskBoard

A full-featured Kanban task manager built with React + Vite.  
**IICT, CUET — React JS Final Project 2026**

## Live URL
> Add your Vercel URL here after deployment: `https://taskboard-xxx.vercel.app`

## Demo Credentials
| Field | Value |
|-------|-------|
| Email | admin@taskboard.dev |
| Password | password123 |

## Features
- 3-column Kanban board: **To Do / In Progress / Done**
- Full CRUD — create, read, update, delete tasks
- Priority badges: Low / Medium / High
- Filter tasks by priority across all columns
- Mock authentication with protected routes
- Dark mode toggle (persisted)
- All data persisted via `localStorage`
- Fully responsive (mobile + desktop)

## Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Routing | React Router v6 |
| State | Context API + useReducer |
| Persistence | Custom `useLocalStorage` hook |
| Deployment | Vercel |

## Folder Structure
```
src/
  components/   # TaskCard, Column, PriorityBadge, Modal, PrivateRoute
  pages/        # LoginPage, BoardPage
  context/      # AuthContext, ThemeContext, BoardContext
  hooks/        # useLocalStorage
  reducers/     # boardReducer (ADD, UPDATE, DELETE, MOVE)
public/
  guides/       # vercel-deploy.md, i18n-setup.md
```

## Local Setup
```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## Build for Production
```bash
npm run build
npm run preview
```

## Screenshot
> Add a screenshot of the board here after deployment.

---

*Instructor: Golam Mahmood — Assistant Programmer, IICT, CUET*
