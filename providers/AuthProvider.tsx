// AuthProvider.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function fetchUser(): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}auth/me`, {
        method: "GET",
        credentials: "include",
      });

      console.log("Auth/me → status:", res.status);
      console.log("Auth/me → headers:", [...res.headers.entries()]);

      if (res.status === 401) {
        setUser(null);
        return false;
      }

      const data = await res.json();
      setUser(data);
      return true;

    } catch (error) {
      setUser(null);
      return false;

    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, setUser, refreshUser: fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
