// auth/AuthContext.tsx
import { useLazyGetCurrentUserQuery, useRefreshTokenMutation } from "@/store/auth-api";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { toast } from "sonner";

type User = {
  name: string
  email: string;
  role: "admin" | "user";
};

interface AuthContextType {
  authUser: User | null;
  setAuthUser: (user: User | null) => void;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within a Provider");
  return context;
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [trigger] = useLazyGetCurrentUserQuery();
  const [refreshToken] = useRefreshTokenMutation();
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const result = await trigger().unwrap();

      if (result?.success) {
        setAuthUser(result.user);
      } else {
        setAuthUser(null);
      }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error?.status === 401 || error?.data?.error === "Authorization token missing") {
        await attemptTokenRefresh();
      } else {
        setAuthUser(null);
        if (!loading) {
          toast.error("Failed to verify authentication");
        }
      }
    } finally {
      setLoading(false);
    }
  }

  const attemptTokenRefresh = async () => {
    try {
      const response = await refreshToken().unwrap();
      
      if (response?.success) {
        setAuthUser(response.user);
      } else {
        setAuthUser(null);
      }
    } catch (error) {
      console.log('ERROR', error);
      setAuthUser(null);
    }
  }

  useEffect(() => {
    if (!authUser) return;

    const refreshInterval = setInterval(async () => {
      await attemptTokenRefresh();  
    }, 10 * 60 * 1000);

    return () => {
      clearInterval(refreshInterval);
    };
  }, [authUser]);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};