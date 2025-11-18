import { CourseList } from "@/app/components/CourseList";
import { Container } from "@mui/material";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";
import CreateCourseForm from "@/app/components/CreateCourseForm";
import {UserList} from "@/app/components/UserList";

export default function UsersPage() {
  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <h1>Users</h1>
        <UserList />
        {/*<div style={{paddingTop: 30}}>*/}
        {/*  <CreateCourseForm></CreateCourseForm>*/}
        {/*</div>*/}
      </Container>
    </ProtectedRoute>
  );
}
