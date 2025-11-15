import { CourseList } from "@/app/components/CourseList";
import { Container } from "@mui/material";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";
import CreateCourseForm from "@/app/components/CreateCourseForm";

export default function CoursesPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <h1>Courses</h1>
        <CourseList />
        <div style={{paddingTop: 30}}>
          <CreateCourseForm></CreateCourseForm>
        </div>
      </Container>
    </ProtectedRoute>
  );
}
