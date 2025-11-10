import {Course} from "@/app/components/course/Course";

export default async function CoursePage({params}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  return (
    <>
      <h1>Course</h1>
      <Course id={slug} />
    </>
  );
}
