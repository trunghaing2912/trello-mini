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

export const AUTH_STORAGE_KEY = "trello.auth.v1";

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface PersistedAuth {
  user: AuthUser;
  token: string;
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
      await new Promise((resolve) => setTimeout(resolve, 800));

      return await loginApi(payload);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }

      return rejectWithValue("Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    restoreSession: (state, action: PayloadAction<PersistedAuth>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.status = "succeeded";
      state.error = null;
    },
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
          state.error = null;
        },
      )

      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.status = "failed";
        state.error = action.payload ?? "Login failed";
      });
  },
});

export const { restoreSession, logout, clearError } = authSlice.actions;

export default authSlice.reducer;
