export interface User {
  id: string;
  name: string;
  email: string;
}

export interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
