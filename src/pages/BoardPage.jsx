import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { useBoard } from '../context/BoardContext'
import { COLUMNS, PRIORITIES } from '../reducers/boardReducer'
import Column from '../components/Column'
import Modal from '../components/Modal'

/**
 * BoardPage — the main Kanban board view at /board.
 * Contains: header, task summary, filter bar, columns, modal.
 */
export default function BoardPage() {
  const { user, logout }    = useAuth()
  const { dark, toggle }    = useTheme()
  const { tasks, addTask, updateTask } = useBoard()

  const [modalTask, setModalTask]       = useState(undefined) // undefined = closed, null = add, task = edit
  const [priorityFilter, setPriorityFilter] = useState('All')

  const filtered = priorityFilter === 'All'
    ? tasks
    : tasks.filter((t) => t.priority === priorityFilter)

  const summary = COLUMNS.map((col) => ({
    col,
    count: tasks.filter((t) => t.status === col).length,
  }))

  function handleSave(data) {
    if (modalTask === null) {
      addTask(data)
    } else {
      updateTask(modalTask.id, data)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 transition-colors">
      {/* ── Header ───────────────────────────────────── */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-2 mr-auto">
            <div className="w-7 h-7 rounded-lg bg-brand-500 flex items-center justify-center shadow">
              <span className="text-white text-xs font-black">T</span>
            </div>
            <span className="font-black text-lg text-slate-800 dark:text-white tracking-tight">
              TaskBoard
            </span>
          </div>

          {/* User email */}
          <span className="hidden sm:block text-xs font-mono text-slate-400 dark:text-slate-500">
            {user?.email}
          </span>

          {/* Dark mode */}
          <button
            onClick={toggle}
            title="Toggle dark mode"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {dark ? '☀️' : '🌙'}
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* ── Sub-header: summary + actions ────────────── */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center gap-3">
          {/* Task count summary */}
          <div className="flex gap-3 flex-wrap text-xs font-mono text-slate-500 dark:text-slate-400 mr-auto">
            {summary.map(({ col, count }) => (
              <span key={col}>
                <span className="font-bold text-slate-700 dark:text-slate-200">{count}</span>{' '}
                {col}
              </span>
            ))}
          </div>

          {/* Priority filter */}
          <div className="flex gap-1">
            {['All', ...PRIORITIES].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  priorityFilter === p
                    ? 'bg-brand-500 text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Add task button */}
          <button
            onClick={() => setModalTask(null)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-brand-500 hover:bg-brand-600 text-white shadow-sm transition-colors"
          >
            <span className="text-base leading-none">+</span> New Task
          </button>
        </div>
      </div>

      {/* ── Board ────────────────────────────────────── */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 h-full">
          {COLUMNS.map((col) => (
            <Column
              key={col}
              title={col}
              tasks={filtered.filter((t) => t.status === col)}
              onEdit={(task) => setModalTask(task)}
            />
          ))}
        </div>
      </main>

      {/* ── Modal ────────────────────────────────────── */}
      {modalTask !== undefined && (
        <Modal
          task={modalTask}
          onSave={handleSave}
          onClose={() => setModalTask(undefined)}
        />
      )}
    </div>
  )
}
