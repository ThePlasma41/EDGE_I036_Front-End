import TaskCard from './TaskCard'

/**
 * Column — renders one Kanban column with its task cards.
 * Props:
 *   title    : string   — column name
 *   tasks    : Task[]   — filtered tasks for this column
 *   onEdit   : fn(task) — opens edit modal
 */

const headerColors = {
  'To Do':       'border-slate-300 dark:border-slate-600',
  'In Progress': 'border-brand-400',
  'Done':        'border-emerald-400',
}

const dotColors = {
  'To Do':       'bg-slate-400',
  'In Progress': 'bg-brand-500',
  'Done':        'bg-emerald-500',
}

export default function Column({ title, tasks, onEdit }) {
  return (
    <div className="flex flex-col min-w-0 flex-1">
      {/* Column header */}
      <div
        className={`flex items-center gap-2 px-1 pb-3 mb-3 border-b-2 ${headerColors[title] ?? 'border-slate-200'}`}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${dotColors[title] ?? 'bg-slate-400'}`} />
        <h2 className="font-bold text-sm tracking-wide uppercase text-slate-700 dark:text-slate-200">
          {title}
        </h2>
        <span className="ml-auto font-mono text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      {/* Task list */}
      <div className="flex flex-col gap-3 overflow-y-auto scrollbar-thin flex-1 pr-0.5">
        {tasks.length === 0 ? (
          <div className="flex items-center justify-center h-24 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700">
            <p className="text-xs text-slate-400 dark:text-slate-600">No tasks here</p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onEdit={onEdit} />
          ))
        )}
      </div>
    </div>
  )
}
