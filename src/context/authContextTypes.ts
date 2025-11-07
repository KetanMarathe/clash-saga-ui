export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
}

export interface AuthContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}
