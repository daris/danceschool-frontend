import {createAppSlice} from "@/lib/createAppSlice";
import {fetchUsers} from "@/lib/features/users/usersAPI";
import {User} from "@/lib/features/users/types";
import {logout} from "@/lib/features/auth/authSlice";

export interface UserSliceState {
  users: User[];
  status: "initial" | "idle" | "loading" | "failed";
}

const initialState: UserSliceState = {
  users: [],
  status: "initial",
};

export const usersSlice = createAppSlice({
  name: "users",
  initialState,
  reducers: (create) => ({
    loadUsers: create.asyncThunk(
      async () => {
        const response = await fetchUsers();
        return response;
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
  extraReducers: (builder) => {
    builder.addCase(logout, () => initialState);
  },
});

export const { loadUsers } = usersSlice.actions;
export const { selectUsers, selectStatus, selectUser } = usersSlice.selectors;
