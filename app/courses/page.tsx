import { Courses } from "@/app/components/courses/Courses";
import { Container } from "@mui/material";

export default function CoursesPage() {
  return (
    <Container maxWidth="xl">
      <h1>Courses</h1>
        <Courses />
    </Container>
  );
}
