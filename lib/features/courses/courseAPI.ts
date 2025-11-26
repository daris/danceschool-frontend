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
  try {
    const { data } = await api.get<Course[]>("/courses");
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};

// Add participant to a course
export const addParticipant = async (userId: string, courseId: string): Promise<Participant> => {
  try {
    const { data } = await api.post<Participant>("/participants", {userId, courseId});
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};

export const setAttendanceStatusApi = async (attendance: Attendance): Promise<Attendance> => {
  try {
    const { data } = await api.post<Attendance>("/attendances/set-status", {
      userId: attendance.userId,
      lessonId: attendance.lessonId,
      status: attendance.status,
    });
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};

export const createCourseApi = async (course: Course): Promise<Course> => {
  try {
    const { data } = await api.post<Course>("/courses", course);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};


export const createLessonApi = async (lesson: CreateLesson): Promise<Lesson> => {
  try {
    const {data} = await api.post<Lesson>("/lessons", lesson);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};

export const scanQrCode = async (qrCodeRequest: QrCodeRequest): Promise<QrCodeResponse> => {
  try {
    const { data } = await api.post<QrCodeResponse>("/qr", qrCodeRequest);
    return data;
  } catch (err) {
    const error = err as AxiosError<{ message: string }>;
    throw new Error(error.response?.data.message || error.message || "Unknown API error");
  }
};

