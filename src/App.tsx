import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./auth/Login";
import Test from "./components/pages/Test";
import { useAuthContext } from "./context/AuthProvider";
import type { JSX } from "react";

// Admin/User pages
import AdminJobRegistry from "./components/pages/admin/AdminJobRegistry";
import AdminCreateJob from "./components/pages/admin/AdminCreateJob";
// import AdminCreateRoute from "./components/pages/admin/AdminCreateRoute";
// import AdminAnalysisReport from "./components/pages/admin/AdminAnalysisReport";
// import AdminUsers from "./components/pages/admin/AdminUsers";
// import AdminMachineList from "./components/pages/admin/AdminMachineList";
import UserJobRegistry from "./components/pages/user/UserJobRegistry";

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
        <Route path="/test" element={<Test />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/login"
          element={
            authUser ? <Navigate to="/job-registry" replace /> : <Login />
          }
        />

        {/* Protected Routes */}
        <Route
          path="/job-registry"
          element={
            <ProtectedRoute>
              {authUser?.role === "admin" ? (
                <AdminJobRegistry />
              ) : (
                <UserJobRegistry />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/create-job"
          element={
            <ProtectedRoute>
              <AdminCreateJob />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/create-route"
          element={
            <ProtectedRoute>
              <AdminCreateRoute />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis-report"
          element={
            <ProtectedRoute>
              <AdminAnalysisReport />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <AdminUsers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/machine-list"
          element={
            <ProtectedRoute>
              <AdminMachineList />
            </ProtectedRoute>
          }
        /> */}

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
