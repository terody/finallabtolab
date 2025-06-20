import { createContext } from "react";
import type { UserProfile } from "../types/user";

export interface AuthContextType {
  user: any | null;
  profile: UserProfile | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);
