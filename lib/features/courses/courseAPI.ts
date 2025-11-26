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
import {AxiosError} from "axios";

// Fetch all courses
export const fetchCourses = async (): Promise<Course[]> => {
  const { data } = await api.get<Course[]>("/courses");
  return data;
};

// Add participant to a course
export const addParticipant = async (userId: string, courseId: string): Promise<Participant> => {
  const { data } = await api.post<Participant>("/participants", {userId, courseId});
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
  try {
    const { data } = await api.post<Course>("/courses", course);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    // Throw a structured error for Redux to catch
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else if (error.message) {
      throw new Error(error.message);
    } else {
      throw new Error("Unknown error creating course");
    }
  }
};


export const createLessonApi = async (lesson: CreateLesson): Promise<Lesson> => {
  const { data } = await api.post<Lesson>("/lessons", lesson);
  return data;
};

export const scanQrCode = async (qrCodeRequest: QrCodeRequest): Promise<QrCodeResponse> => {
  const { data } = await api.post<QrCodeResponse>("/qr", qrCodeRequest);
  return data;
};

