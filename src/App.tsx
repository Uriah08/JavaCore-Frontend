import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./components/pages/Home";
import Login from "./components/pages/auth/Login";
import Test from "./components/pages/Test";
import { useAuthContext } from "./context/AuthProvider";
import { type JSX } from "react";

// Admin/User pages
import AdminJobRegistry from "./components/pages/admin/AdminJobRegistry";
import AdminCreateJob from "./components/pages/admin/AdminCreateJob";
import AdminCreateRoute from "./components/pages/admin/AdminCreateRoute";
import AdminAnalysisAndReport from "./components/pages/admin/AdminAnalysisAndReport";
import AdminUsers from "./components/pages/admin/AdminUsers";
import UserJobRegistry from "./components/pages/user/UserJobRegistry";
import AdminMachineList from "./components/pages/admin/AdminMachineList";
import Error from "./components/pages/Error";
import UserAnalysisAndReport from "./components/pages/user/UserAnalysisAndReport";
import UserMachineList from "./components/pages/user/UserMachineList";
import Loading from "./components/ui/Loading";

function App() {
  const { authUser, loading } = useAuthContext();

  if(loading){
    return <Loading/>
  }
  
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
              {authUser?.role === "admin" ? (
                <AdminCreateJob />
              ) : (
                <Navigate to={"/error"} replace />
              )}
            </ProtectedRoute>
          }
        />
         <Route
          path="/create-route"
          element={
            <ProtectedRoute>
              {authUser?.role === "admin" ? (
                <AdminCreateRoute />
              ) : (
                <Navigate to={"/error"} replace />
              )}
            </ProtectedRoute>
          }
        />
        
        <Route
          path={"/analysis-report"}
          element={
            <ProtectedRoute>
              {authUser?.role === "admin" ? (
                <AdminAnalysisAndReport />
              ) : (
                <Navigate to={"/error"} replace />
              )}
            </ProtectedRoute>
          }
        />

        <Route
          path={"/analysis-report/:id"}
          element={
            <ProtectedRoute>
              {authUser?.role === "user" ? (
                <UserAnalysisAndReport/>
              ) : (
                <Navigate to={"/error"} replace />
              )}
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              {authUser?.role === "admin" ? (
                <AdminUsers />
              ) : (
                <Navigate to={"/error"} replace />
              )}
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/machine-list"
          element={
            <ProtectedRoute>
              {authUser?.role === "admin" ? (
                <AdminMachineList />
              ) : (
                <UserMachineList/>
              )}
            </ProtectedRoute>
          }
        />
        <Route path="/error" element={<Error />} />
        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/error" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
