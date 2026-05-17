import { useState, useEffect } from 'react'

/**
 * useLocalStorage — persists state to localStorage.
 * @param {string} key      - The localStorage key.
 * @param {*}      initial  - Default value if key is absent.
 */
export function useLocalStorage(key, initial) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initial
    } catch {
      return initial
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Quota exceeded or private mode — fail silently
    }
  }, [key, value])

  return [value, setValue]
}
