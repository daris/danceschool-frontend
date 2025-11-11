export interface Link {
  href: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
}

export interface Attendance {
  status: string;
  userId: string;
}

export interface Lesson {
  id: string;
  startTime: string;
  endTime: string;
  attendances: Attendance[];
}

export interface Participant {
  id: string;
  userId: string;
}

export interface Course {
  id: string;
  name: string;
  level: string;
  lessons: Lesson[];
  participants: Participant[];
}

export interface EmbeddedCourses {
  courses: Course[];
}

export interface CoursesApiResponse {
  _embedded: EmbeddedCourses;
  total: number;
  skip: number;
  limit: number;
}

export const fetchCourses = async () => {
  const response = await fetch("http://localhost:8080/courses", {
    headers: { "Content-Type": "application/json" },
  });
  const result: CoursesApiResponse = await response.json();

  return result;
};

export const addParticipant = async (userId: string, courseId: string) => {
  const response = await fetch("http://localhost:8080/participants", {
    headers: { "Content-Type": "application/json" },
    method: "POST",
    body: JSON.stringify({user: userId, course: courseId})
  });
  const result: Participant = await response.json();
  return result;
};

export const updateCourse = async (course: Course) => {
  const response = await fetch("http://localhost:8080/courses/" + course.id, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(course)
  });
  const result: Course = await response.json();
  return result;
};
