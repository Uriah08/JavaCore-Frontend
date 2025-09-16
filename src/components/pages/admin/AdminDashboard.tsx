import { Button } from "@/components/ui/button"
import { useAuthContext } from "@/context/AuthProvider";
import { useLogoutMutation } from "@/store/auth-api";

const AdminDashboard = () => {
  const [logout] = useLogoutMutation();
  const { setAuthUser } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      setAuthUser(null);
      localStorage.removeItem("user");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  return (
    <div>
      <h1>Admin Dashboard, Test</h1>
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  )
}

export default AdminDashboard