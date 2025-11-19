export enum AttendanceStatus {
  NORMAL = 'NORMAL',
  FULL_PASS = 'FULL_PASS',
  RESCHEDULED = 'RESCHEDULED',
}

export interface Attendance {
  id: string;
  status: AttendanceStatus | null;
  userId: string;
  lessonId: string;
}

export interface Lesson {
  id: string;
  startTime: string;
  endTime: string;
  courseId: string;
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

export interface CreateLesson {
  startTime: string;
  endTime: string;
  courseId: string;
}

export interface QrCodeRequest {
  id: string;
  type: 'LESSON' | 'PASS';
}

export interface QrCodeResponse {
  message: string;
}