import { CourseList } from "@/app/components/CourseList";
import { Container } from "@mui/material";
import {LoginForm} from "@/app/components/LoginForm";
import {RegistrationForm} from "@/app/components/RegistrationForm";
import QrScanner from "@/app/components/QrScanner";

export default function CoursesPage() {
  return (
    <Container maxWidth="xl">
      <QrScanner></QrScanner>
    </Container>
  );
}
