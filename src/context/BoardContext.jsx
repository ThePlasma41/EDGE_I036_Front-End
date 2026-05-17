import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { boardReducer } from '../reducers/boardReducer'

const BoardContext = createContext(null)

const SEED_TASKS = [
  {
    id: 'seed-1',
    title: 'Set up project structure',
    description: 'Initialize Vite + React + Tailwind and configure routing.',
    priority: 'High',
    status: 'Done',
    createdAt: new Date('2026-01-01').toISOString(),
  },
  {
    id: 'seed-2',
    title: 'Build Kanban board UI',
    description: 'Create three-column layout with task cards and drag indicators.',
    priority: 'High',
    status: 'In Progress',
    createdAt: new Date('2026-01-02').toISOString(),
  },
  {
    id: 'seed-3',
    title: 'Write README',
    description: 'Add project description, setup steps, live URL, and screenshot.',
    priority: 'Medium',
    status: 'To Do',
    createdAt: new Date('2026-01-03').toISOString(),
  },
]

export function BoardProvider({ children }) {
  const [stored, setStored] = useLocalStorage('tb_tasks', SEED_TASKS)
  const [tasks, dispatch] = useReducer(boardReducer, stored)

  // Sync reducer state → localStorage on every change
  useEffect(() => {
    setStored(tasks)
  }, [tasks])

  function addTask(task) {
    dispatch({ type: 'ADD', task: { ...task, id: crypto.randomUUID(), createdAt: new Date().toISOString() } })
  }

  function updateTask(id, changes) {
    dispatch({ type: 'UPDATE', id, changes })
  }

  function deleteTask(id) {
    dispatch({ type: 'DELETE', id })
  }

  function moveTask(id, status) {
    dispatch({ type: 'MOVE', id, status })
  }

  return (
    <BoardContext.Provider value={{ tasks, addTask, updateTask, deleteTask, moveTask }}>
      {children}
    </BoardContext.Provider>
  )
}

export function useBoard() {
  const ctx = useContext(BoardContext)
  if (!ctx) throw new Error('useBoard must be used inside BoardProvider')
  return ctx
}
