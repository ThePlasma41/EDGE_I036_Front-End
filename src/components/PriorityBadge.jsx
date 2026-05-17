/**
 * PriorityBadge — displays a coloured pill for task priority.
 * Props:
 *   priority: 'Low' | 'Medium' | 'High'
 */
const styles = {
  Low:    'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
  Medium: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300',
  High:   'bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300',
}

export default function PriorityBadge({ priority }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold font-mono tracking-wide ${
        styles[priority] ?? styles.Low
      }`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {priority}
    </span>
  )
}
