import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock credentials — no real backend required
const MOCK_USER = { email: 'admin@taskboard.dev', password: 'password123' }

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = window.localStorage.getItem('tb_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function login(email, password) {
    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const userData = { email }
      setUser(userData)
      window.localStorage.setItem('tb_user', JSON.stringify(userData))
      return { success: true }
    }
    return { success: false, error: 'Invalid email or password.' }
  }

  function logout() {
    setUser(null)
    window.localStorage.removeItem('tb_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
