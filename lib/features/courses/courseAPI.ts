import api from "@/lib/api/axios";
import {Attendance, Course, CoursesApiResponse, Lesson, Participant} from "@/lib/features/courses/types";

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
export const createAttendanceApi = async (attendance: Attendance): Promise<Attendance> => {
  const { data } = await api.post<Attendance>("/attendances", {
    user: `/users/${attendance.userId}`,
    lesson: `/lessons/${attendance.lessonId}`,
    status: attendance.status,
  });
  return data;
};

export const createCourseApi = async (course: Course): Promise<Course> => {
  const { data } = await api.post<Course>("/courses", course);
  return data;
};


export const createLessonApi = async (lesson: Lesson): Promise<Lesson> => {
  const { data } = await api.post<Lesson>("/lessons",
    {
      ...lesson,
      course: `/courses/${lesson.courseId}`,
    }
  );
  return data;
};