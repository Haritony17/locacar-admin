import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api';

interface JwtPayload {
  userId?: string;
  roles?: string[];
  exp?: number;
}

interface AdminUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
}

interface AuthContextValue {
  user: AdminUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isOwner: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const ALLOWED_ROLES = ['ROLE_OWNER', 'ROLE_EMPLOYEE', 'ROLE_AGENCY_MANAGER'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsLoading(false);
      return;
    }
    loadUserFromToken(token)
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setIsLoading(false));
  }, []);

  async function loadUserFromToken(token: string) {
    const payload = jwtDecode<JwtPayload>(token);

    const hasAccess = payload.roles?.some((r) => ALLOWED_ROLES.includes(r));
    if (!hasAccess) {
      throw new Error('Accès réservé au personnel de l’agence.');
    }

    const res = await api.get(`/users/${payload.userId}`);
    setUser({
      id: payload.userId!,
      firstName: res.data.firstName,
      lastName: res.data.lastName,
      email: res.data.email,
      roles: payload.roles ?? [],
    });
  }

  async function login(email: string, password: string) {
    const res = await api.post('/login_check', { email, password });
    const token = res.data.token;

    const payload = jwtDecode<JwtPayload>(token);
    const hasAccess = payload.roles?.some((r) => ALLOWED_ROLES.includes(r));
    if (!hasAccess) {
      throw new Error('Ce compte n’a pas accès au back-office.');
    }

    localStorage.setItem('token', token);
    await loadUserFromToken(token);
  }

  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }

  const isOwner = user?.roles.includes('ROLE_OWNER') ?? false;

  return (
    <AuthContext.Provider
      value={{ user, isLoading, isAuthenticated: !!user, isOwner, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth doit être utilisé dans un AuthProvider.');
  return ctx;
}