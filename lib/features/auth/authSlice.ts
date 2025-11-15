import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "@/lib/api/axios";
import {AuthState} from "@/lib/features/auth/types";

const initialState: AuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("accessToken") : null,
  user: typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("user") || "null")
    : null,
  loading: false,
  error: null,
};

// Async login thunk
export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: { username: string; password: string }, thunkAPI) => {
    try {
      const resp = await api.post("/auth/login", { username, password });
      return resp.data; // { accessToken, user }
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || "Login failed");
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  selectors: {
    selectAuthUser: (auth) => auth.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.accessToken;
        state.user = action.payload.user;
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export const {selectAuthUser} = authSlice.selectors;
export default authSlice;