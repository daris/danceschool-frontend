import {Container} from "@mui/material";
import {ProtectedRoute} from "@/app/components/ProtectedRoute";
import {UserDetails} from "@/app/components/UserDetails";

export default async function UserPage({params}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  return (
    <ProtectedRoute>
      <Container maxWidth="xl">
        <UserDetails id={slug} />
      </Container>
    </ProtectedRoute>
  );
}
