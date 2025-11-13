import api from "@/lib/api/axios";

export enum AttendanceStatus {
  NORMAL = 'NORMAL',
  FULL_PASS = 'FULL_PASS',
  RESCHEDULED = 'RESCHEDULED',
}

export interface Attendance {
  id: string;
  status: AttendanceStatus|null;
  userId: string;
  lessonId: string;
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

// Fetch all courses
export const fetchCourses = async (): Promise<CoursesApiResponse> => {
  const { data } = await api.get<CoursesApiResponse>("/courses");
  return data;
};

// Add participant to a course
export const addParticipant = async (userId: string, courseId: string): Promise<Participant> => {
  const { data } = await api.post<Participant>("/participants", {
    user: `/users/${userId}`,
    course: `/courses/${courseId}`,
  });
  return data;
};

// Update an existing attendance
export const updateAttendanceApi = async (attendance: Attendance): Promise<Course> => {
  const { data } = await api.put<Course>(`/attendances/${attendance.id}`, {
    user: `/users/${attendance.userId}`,
    lesson: `/lessons/${attendance.lessonId}`,
    status: attendance.status,
  });
  return data;
};

// Create a new attendance
export const createAttendanceApi = async (attendance: Attendance): Promise<Course> => {
  const { data } = await api.post<Course>("/attendances", {
    user: `/users/${attendance.userId}`,
    lesson: `/lessons/${attendance.lessonId}`,
    status: attendance.status,
  });
  return data;
};