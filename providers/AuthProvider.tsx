import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import Constants from "expo-constants";

const API_URL = Constants.expoConfig?.extra?.API_URL;
const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  async function verify(): Promise<boolean> {
    try {
      const res = await fetch(`${API_URL}auth/verify`, {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
        return true;
      } else {
        setUser(null);
        return false;
      }
    } catch (error) {
      setUser(null);
      return false;
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    verify();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, verify }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
