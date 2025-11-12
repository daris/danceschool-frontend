import {createAppSlice} from "@/lib/createAppSlice";
import {
  Attendance,
  AttendanceStatus,
  Course,
  fetchCourses,
  Lesson,
  Participant,
  updateCourse
} from "@/lib/features/courses/courseAPI";

export interface CourseSliceState {
  courses: Course[];
  status: "idle" | "loading" | "failed";
}

const initialState: CourseSliceState = {
  courses: [],
  status: "loading",
};

export const coursesSlice = createAppSlice({
  name: "courses",
  initialState,
  reducers: (create) => ({
    loadCourses: create.asyncThunk(
      async () => {
        const response = await fetchCourses();
        return response._embedded.courses;
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
    saveCourse: create.asyncThunk(
      async (params: {course: Course}) => {
        const course: Course = await updateCourse(params.course);
        return {course: course};
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";

          state.courses = state.courses.map(course =>
            course.id === action.payload.course.id ? action.payload.course : course
          );
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
    setLessonAttendanceStatusForUser: create.asyncThunk(
      async (params: {courseId: string, lessonId: string, userId: string, status: AttendanceStatus}) => {

        return {userId: params.userId, status: params.status, courseId: params.courseId, lessonId: params.lessonId};
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";

          const attendance = {userId: action.payload.userId, status: action.payload.status} as Attendance;
          const course = state.courses.find(course => course.id == action.payload.courseId);
          const lesson = course?.lessons.find(lesson => lesson.id == action.payload.lessonId);
          if (lesson) {
            lesson.attendances = lesson.attendances.filter(l => l.userId != action.payload.userId);
            lesson.attendances.push(attendance);
          }
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectCourses: (state) => state.courses,
    selectCourse: (state, courseId: string) => state.courses.find(course => course.id == courseId),
    selectStatus: (counter) => counter.status,
  },
});

export const { loadCourses, addParticipantForCourse, saveCourse, setLessonAttendanceStatusForUser } = coursesSlice.actions;
export const { selectCourses, selectStatus, selectCourse } = coursesSlice.selectors;
