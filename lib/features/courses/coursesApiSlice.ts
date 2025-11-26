import {createAppSlice} from "@/lib/createAppSlice";
import {
  addParticipant,
  createCourseApi,
  createLessonApi,
  fetchCourses,
  setAttendanceStatusApi
} from "@/lib/features/courses/courseAPI";
import {
  Attendance,
  Course,
  CourseUpdateAttendances,
  CreateLesson,
  Lesson,
  Participant
} from "@/lib/features/courses/types";
import {logout} from "@/lib/features/auth/authSlice";
import {PayloadAction} from "@reduxjs/toolkit";

export interface CourseSliceState {
  courses: Course[];
  status: "initial" | "idle" | "loading" | "failed";
}

const initialState: CourseSliceState = {
  courses: [],
  status: "initial",
};

export const coursesSlice = createAppSlice({
  name: "courses",
  initialState,
  reducers: (create) => ({
    loadCourses: create.asyncThunk(
      async () => {
        const response = await fetchCourses();
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.courses = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    addParticipantForCourse: create.asyncThunk(
      async (params: {userId: string, courseId: string}) => {
        await addParticipant(params.userId, params.courseId);
        return {userId: params.userId, courseId: params.courseId};
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";

          const participant = {id: '', userId: action.payload.userId} as Participant;
          state.courses.find(course => course.id == action.payload.courseId)?.participants.push(participant);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    setAttendanceStatus: create.asyncThunk(
      async (params: {attendance: Attendance, courseId: string}) => {
        const attendance = await setAttendanceStatusApi(params.attendance);

        return {attendance: {
          ...params.attendance,
          id: attendance.id
        }, courseId: params.courseId};
      },
      {
        fulfilled: (state, action) => {
          const attendance = action.payload.attendance;
          const course = state.courses.find(course => course.id == action.payload.courseId);
          const lesson = course?.lessons.find(lesson => lesson.id == attendance.lessonId);
          if (!lesson) return;

          const index = lesson.attendances.findIndex((a) => a.userId === attendance.userId);
          if (index !== -1) {
            lesson.attendances[index] = attendance;
          } else {
            lesson.attendances.push(attendance);
          }
        },
      },
    ),
    createCourse: create.asyncThunk(
      async (course: Course, { rejectWithValue }) => {
        try {
          return await createCourseApi(course);
        } catch (err: any) {
          return rejectWithValue(err.message);
        }
      },
      {
        fulfilled: (state, action) => {
          state.courses.push(action.payload);
        },
      },
    ),
    createLesson: create.asyncThunk(
      async (lesson: CreateLesson, { rejectWithValue }) => {
        try {
          const lessonData = await createLessonApi(lesson);
          return {lesson: {...lesson, ...lessonData, attendances: []} as Lesson};
        } catch (err: any) {
          return rejectWithValue(err.message);
        }
      },
      {
        fulfilled: (state, action) => {
          const lesson = action.payload.lesson;
          const course = state.courses.find(course => course.id == action.payload.lesson.courseId);
          course?.lessons.push(lesson);
        },
      },
    ),
    updateAttendanceLocally: create.reducer((state, action: PayloadAction<CourseUpdateAttendances>) =>  {
      const attendance = {id: action.payload.attendanceId, lessonId: action.payload.lessonId, userId: action.payload.userId, status: action.payload.status} as Attendance;
      const course = state.courses.find(course => course.id == action.payload.courseId);
      const lesson = course?.lessons.find(lesson => lesson.id == action.payload.lessonId);
      if (!lesson) return;

      const index = lesson.attendances.findIndex((a) => a.userId === attendance.userId);
      if (index !== -1) {
        lesson.attendances[index] = attendance;
      } else {
        lesson.attendances.push(attendance);
      }
    }),
  }),
  selectors: {
    selectCourses: (state) => state.courses,
    selectCourse: (state, courseId: string) => state.courses.find(course => course.id == courseId),
    selectStatus: (counter) => counter.status,
  },
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { loadCourses, addParticipantForCourse, setAttendanceStatus, createCourse, createLesson, updateAttendanceLocally } = coursesSlice.actions;
export const { selectCourses, selectStatus, selectCourse } = coursesSlice.selectors;
