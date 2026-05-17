import { useState } from 'react'
import PriorityBadge from './PriorityBadge'
import { useBoard } from '../context/BoardContext'
import { COLUMNS } from '../reducers/boardReducer'

/**
 * TaskCard — displays a single task with move, edit, delete controls.
 */
export default function TaskCard({ task, onEdit }) {
  const { deleteTask, moveTask } = useBoard()
  const [confirmDelete, setConfirmDelete] = useState(false)

  const colIndex = COLUMNS.indexOf(task.status)
  const canMoveLeft  = colIndex > 0
  const canMoveRight = colIndex < COLUMNS.length - 1

  const date = new Date(task.createdAt).toLocaleDateString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  })

  return (
    <div className="animate-slide-in group bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <h3 className="font-semibold text-sm leading-snug text-slate-800 dark:text-slate-100 flex-1">
          {task.title}
        </h3>
        <PriorityBadge priority={task.priority} />
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-3">
          {task.description}
        </p>
      )}

      {/* Date */}
      <p className="text-xs font-mono text-slate-400 dark:text-slate-500 mb-3">
        {date}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700">
        {/* Move buttons */}
        <div className="flex gap-1">
          <button
            onClick={() => moveTask(task.id, COLUMNS[colIndex - 1])}
            disabled={!canMoveLeft}
            title="Move left"
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            ←
          </button>
          <button
            onClick={() => moveTask(task.id, COLUMNS[colIndex + 1])}
            disabled={!canMoveRight}
            title="Move right"
            className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50 dark:hover:bg-brand-900/30 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
          >
            →
          </button>
        </div>

        {/* Edit & Delete */}
        <div className="flex gap-1">
          <button
            onClick={() => onEdit(task)}
            className="px-2.5 py-1 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            Edit
          </button>

          {confirmDelete ? (
            <div className="flex gap-1 items-center">
              <span className="text-xs text-rose-500">Sure?</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-2 py-1 rounded-lg text-xs font-medium bg-rose-500 text-white hover:bg-rose-600 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="px-2 py-1 rounded-lg text-xs font-medium text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setConfirmDelete(true)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/30 transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
