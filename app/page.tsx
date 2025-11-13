import type { Metadata } from "next";
import { Counter } from "./components/counter/Counter";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";

export default function IndexPage() {
  return <ProtectedRoute>
      Index page
    </ProtectedRoute>;
}

export const metadata: Metadata = {
  title: "Redux Toolkit",
};
