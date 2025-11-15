import {createAppSlice} from "@/lib/createAppSlice";
import {fetchUsers} from "@/lib/features/users/usersAPI";
import {User} from "@/lib/features/users/types";

export interface UserSliceState {
  users: User[];
  status: "idle" | "loading" | "failed";
}

const initialState: UserSliceState = {
  users: [],
  status: "loading",
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: (create) => ({
    loadUsers: create.asyncThunk(
      async () => {
        const response = await fetchUsers();
        return response._embedded.users;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.users = action.payload;
        },
        rejected: (state) => {
          state.status = "failed";
        },
      },
    ),
  }),
  selectors: {
    selectUsers: (state) => state.users,
    selectUser: (state, courseId: string) => state.users.find(course => course.id == courseId),
    selectStatus: (counter) => counter.status,
  },
});

export const { loadUsers } = usersSlice.actions;
export const { selectUsers, selectStatus, selectUser } = usersSlice.selectors;
