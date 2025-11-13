import { Courses } from "@/app/components/courses/Courses";
import { Container } from "@mui/material";
import {LoginForm} from "@/app/components/loginForm";
import {RegistrationForm} from "@/app/components/RegistrationForm";

export default function CoursesPage() {
  return (
    <Container maxWidth="xl">
      <RegistrationForm></RegistrationForm>
    </Container>
  );
}
