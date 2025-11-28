import type {Metadata} from "next";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";
import Dashboard from "./components/Dashboard";
import { Container } from "@mui/material";

export default function IndexPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <Dashboard></Dashboard>
      </Container>
    </ProtectedRoute>
  );
}

export const metadata: Metadata = {
  title: "Dance School",
};
