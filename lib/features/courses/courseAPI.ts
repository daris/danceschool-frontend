export interface Link {
  href: string;
}

export interface Attendance {
  status: string;
  _links: { user: Link };
}

export interface Lesson {
  id: string;
  startTime: string;
  endTime: string;
  attendances: Attendance[];
}

export interface Participant {
  id: string;
  _links: { user: Link };
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

// A mock function to mimic making an async request for data
export const fetchCourses = async () => {
  const response = await fetch("http://localhost:8080/courses", {
    headers: { "Content-Type": "application/json" },
  });
  const result: CoursesApiResponse = await response.json();

  return result;
};
