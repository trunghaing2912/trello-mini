import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import {
  loginApi,
  type AuthUser,
  type LoginRequest,
  type LoginResponse,
} from "../api/authApi";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>(
  "auth/login",

  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginApi(payload);

      return data;
    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const axiosError = error as {
          response?: {
            data?: {
              message?: string;
            };
          };
        };

        return rejectWithValue(
          axiosError.response?.data?.message || "Login failed",
        );
      }

      return rejectWithValue("Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.status = "idle";
    },

    clearError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.status = "succeeded";
        },
      )

      .addCase(login.rejected, (state, action) => {
        state.error = action.payload ?? "Login failed";
        state.status = "failed";
      });
  },
});

export const { logout, clearError } = authSlice.actions;

export default authSlice.reducer;
