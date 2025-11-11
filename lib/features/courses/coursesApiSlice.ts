import {createAppSlice} from "@/lib/createAppSlice";
import {Course, fetchCourses, Participant, updateCourse} from "@/lib/features/courses/courseAPI";

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
  }),
  selectors: {
    selectCourses: (state) => state.courses,
    selectCourse: (state, courseId: string) => state.courses.find(course => course.id == courseId),
    selectStatus: (counter) => counter.status,
  },
});

export const { loadCourses, addParticipantForCourse, saveCourse } = coursesSlice.actions;
export const { selectCourses, selectStatus, selectCourse } = coursesSlice.selectors;
