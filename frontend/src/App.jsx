import { Routes, Route } from 'react-router-dom'
import { ContentProvider } from './context/ContentContext'
import { AuthProvider } from './context/AuthContext'
import Landing from './pages/Landing'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import ProtectedRoute from './pages/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </ContentProvider>
    </AuthProvider>
  )
}

export default App
