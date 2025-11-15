import type {Metadata} from "next";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";
import Dashboard from "./components/Dashboard";

export default function IndexPage() {
  return (
    <ProtectedRoute>
      <Dashboard></Dashboard>
    </ProtectedRoute>
  );
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
