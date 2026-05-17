/**
 * boardReducer — manages all task CRUD and move operations.
 *
 * Actions:
 *  ADD    { task }
 *  UPDATE { id, changes }
 *  DELETE { id }
 *  MOVE   { id, status }
 */

export const COLUMNS = ['To Do', 'In Progress', 'Done']

export const PRIORITIES = ['Low', 'Medium', 'High']

export function boardReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.task]

    case 'UPDATE':
      return state.map((task) =>
        task.id === action.id ? { ...task, ...action.changes } : task
      )

    case 'DELETE':
      return state.filter((task) => task.id !== action.id)

    case 'MOVE': {
      const currentIndex = COLUMNS.indexOf(
        state.find((t) => t.id === action.id)?.status
      )
      const newIndex =
        action.direction === 'next'
          ? Math.min(currentIndex + 1, COLUMNS.length - 1)
          : Math.max(currentIndex - 1, 0)
      return state.map((task) =>
        task.id === action.id
          ? { ...task, status: action.status ?? COLUMNS[newIndex] }
          : task
      )
    }

    default:
      return state
  }
}
