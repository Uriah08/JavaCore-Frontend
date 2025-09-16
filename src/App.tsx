import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./auth/Login"
import Test from "./components/pages/Test"
import { useAuthContext } from "./context/AuthProvider"
import AdminDashboard from "./components/pages/admin/Dashboard"
import UserDashboard from "./components/pages/user/Dashboard"
import type { JSX } from "react"

function App() {
  const { authUser } = useAuthContext();

  const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    if (!authUser) {
      return <Navigate to="/auth/login" replace />;
    }
    return children;
  };
  
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<Test/>}/>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/login"
          element={
            authUser ? <Navigate to="/dashboard" replace /> : <Login />
          }
        />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            {authUser?.role === 'admin' ? <AdminDashboard/> : <UserDashboard/>}
          </ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
