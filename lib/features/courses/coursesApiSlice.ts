import {createAppSlice} from "@/lib/createAppSlice";
import {Course, fetchCourses} from "@/lib/features/courses/courseAPI";

export interface CounterSliceState {
  courses: Course[];
  status: "idle" | "loading" | "failed";
}

const initialState: CounterSliceState = {
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
  }),
  selectors: {
    selectCourses: (state) => state.courses,
    selectCourse: (state, courseId: string) => state.courses.find(course => course.id == courseId),
    selectStatus: (counter) => counter.status,
  },
});

export const { loadCourses } = coursesSlice.actions;
export const { selectCourses, selectStatus, selectCourse } = coursesSlice.selectors;
