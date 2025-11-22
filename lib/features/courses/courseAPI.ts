import api from "@/lib/api/axios";
import {
  Attendance,
  Course,
  CreateLesson,
  Lesson,
  Participant,
  QrCodeRequest,
  QrCodeResponse
} from "@/lib/features/courses/types";

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await api.get<Course[]>("/courses");
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

export const setAttendanceStatusApi = async (attendance: Attendance): Promise<Attendance> => {
  const { data } = await api.post<Attendance>("/attendances/set-status", {
    userId: attendance.userId,
    lessonId: attendance.lessonId,
    status: attendance.status,
  });
  return data;
};

export const createCourseApi = async (course: Course): Promise<Course> => {
  const { data } = await api.post<Course>("/courses", course);
  return data;
};


export const createLessonApi = async (lesson: CreateLesson): Promise<Lesson> => {
  const { data } = await api.post<Lesson>("/lessons",
    {
      ...lesson,
      course: `/courses/${lesson.courseId}`,
    }
  );
  return data;
};

export const scanQrCode = async (qrCodeRequest: QrCodeRequest): Promise<QrCodeResponse> => {
  const { data } = await api.post<QrCodeResponse>("/qr", qrCodeRequest);
  return data;
};

