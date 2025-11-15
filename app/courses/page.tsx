import { Courses } from "@/app/components/Courses";
import { Container } from "@mui/material";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <h1>Courses</h1>
          <Courses />
      </Container>
    </ProtectedRoute>
  );
}
