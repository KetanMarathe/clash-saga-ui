import { createContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { AuthContextProps, User } from './authContextTypes';

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
