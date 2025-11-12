import {CourseEditView} from "@/app/components/course/Course";
import { Container } from "@mui/material";

export default async function CoursePage({params}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <Container maxWidth="xl">
      <h1>Course</h1>
      <CourseEditView id={slug} />
    </Container>
  );
}
