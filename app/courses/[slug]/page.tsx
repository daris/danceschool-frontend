import {CourseEditView} from "@/app/components/Course";
import { Container } from "@mui/material";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";

export default async function CoursePage({params}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <h1>Course</h1>
        <CourseEditView id={slug} />
      </Container>
    </ProtectedRoute>
  );
}
