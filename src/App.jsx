import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import { BoardProvider } from './context/BoardContext'
import LoginPage from './pages/LoginPage'
import BoardPage from './pages/BoardPage'
import PrivateRoute from './components/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <BoardProvider>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/board"
                element={
                  <PrivateRoute>
                    <BoardPage />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<Navigate to="/board" replace />} />
            </Routes>
          </BoardProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
