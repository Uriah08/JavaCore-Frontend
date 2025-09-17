import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import Home from "./components/pages/Home"
import Login from "./auth/Login"
import Test from "./components/pages/Test"
import { useAuthContext } from "./context/AuthProvider"
import type { JSX } from "react"
import AdminJobRegistry from "./components/pages/admin/AdminJobRegistry"
import UserJobRegistry from "./components/pages/user/UserJobRegistry"

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
            authUser ? <Navigate to="/job-registry" replace /> : <Login />
          }
        />
        <Route path="/job-registry" element={
          <ProtectedRoute>
            {authUser?.role === 'admin' ? <AdminJobRegistry/> : <UserJobRegistry/>}
          </ProtectedRoute>}/>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
