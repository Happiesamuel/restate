import { createContext, useContext } from "react";
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

interface User {
  $id: string;
  name: string;
  email: string;
  avatar: string;
}
interface GlobalContextType {
  isLoggedin: boolean;
  user: User | null;
  loading: boolean;
  refetch: (newParams?: Record<string, string | number>) => Promise<void>;
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const {
    data: user,
    loading,
    refetch,
  } = useAppwrite({
    fn: getCurrentUser,
  });
  const isLoggedin = !!user && typeof user === "object" && "$id" in user;
  console.log(JSON.stringify(user, null, 2));
  const normalizedUser: User | null =
    isLoggedin && user && typeof user === "object" ? (user as User) : null;
  return (
    <GlobalContext.Provider
      value={{ user: normalizedUser, loading, refetch, isLoggedin }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) throw new Error("use Global context not specify");
  return context;
}

export default GlobalProvider;
