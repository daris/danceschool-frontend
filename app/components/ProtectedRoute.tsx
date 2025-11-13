"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/lib/store";

interface ProtectedProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedProps> = ({ children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/login"); // redirect to login if not authenticated
    }
  }, [token, router]);

  // Optionally show nothing or a loading spinner until check is complete
  if (!token) return null;

  return <>{children}</>;
};