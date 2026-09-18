"use client";

import React, { createContext, ReactNode, useEffect, useState } from "react";
import type { User, UserCredential, Unsubscribe } from "firebase/auth";
import axiosClient from "@/client/axios";
import { syncUser } from "@/services/auth.service";

type AuthContextType = {
  user: User | null;
  appUser: AppUser | null;
  setAppUser: React.Dispatch<React.SetStateAction<AppUser | null>>;
  loading: boolean;
  login: (email: string, password: string) => Promise<UserCredential>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<UserCredential>;
  logout: () => Promise<void>;
};

type AppUser = {
  id: string;
  name: string;
  email: string;
  role: "USER" | "PREMIUM" | "ADMIN";
  aiCredits: number;
  lastCreditReset: string;
  createdAt: string;
  updatedAt: string;
};

const AuthContext = createContext<AuthContextType | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [appUser, setAppUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let disposed = false;
    let unsubscribe: Unsubscribe | undefined;

    // Restore auth after hydration without putting the SDK in the initial bundle.
    void import("@/lib/firebase").then(({ auth, onAuthStateChanged }) => {
      if (disposed) return;
      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setLoading(true);
        setUser(currentUser);

        try {
          if (currentUser) {
            const token = await currentUser.getIdToken();

            axiosClient.defaults.headers.common["Authorization"] =
              `Bearer ${token}`;

            const response = await syncUser(token);
            setAppUser(response.user);
          } else {
            delete axiosClient.defaults.headers.common["Authorization"];
            setAppUser(null);
          }
        } catch (error) {
          console.error(error);
          setAppUser(null);
        } finally {
          setLoading(false);
        }
      });

    }).catch((error: unknown) => {
      console.error("Unable to initialize authentication", error);
      if (!disposed) setLoading(false);
    });

    return () => {
      disposed = true;
      unsubscribe?.();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { auth, signInWithEmailAndPassword } = await import("@/lib/firebase");
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );

    const token = await userCredential.user.getIdToken();

    const response = await syncUser(token);
    setAppUser(response.user);
    return userCredential;
  };

  const signup = async (name: string, email: string, password: string) => {
    const { auth, createUserWithEmailAndPassword, updateProfile } =
      await import("@/lib/firebase");
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    const token = await userCredential.user.getIdToken(true);

    const response = await syncUser(token);
    setAppUser(response.user);
    return userCredential;
  };

  const logout = async () => {
    const { auth, signOut } = await import("@/lib/firebase");
    await signOut(auth);
    setAppUser(null);
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    signup,
    logout,
    appUser,
    setAppUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
export default AuthProvider;
