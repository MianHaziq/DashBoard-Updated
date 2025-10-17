import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  image?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface SignupPayload {
  firstName: string;
  email: string;
  password: string;
}

interface LoginPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  user:
    typeof window !== "undefined" && localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user") as string)
      : null,
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  loading: false,
  error: null,
};

export const signupUser = createAsyncThunk<
  AuthResponse, 
  SignupPayload, 
  { rejectValue: string } 
>("auth/signupUser", async ({ firstName, email, password }, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>(
      "http://localhost:5000/auth/signup",
      { firstName, email, password }
    );

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Signup failed");
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>("auth/loginUser", async ({ email, password }, thunkAPI) => {
  try {
    const response = await axios.post<AuthResponse>("http://localhost:5000/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
  }
});

export const fetchUserDetails = createAsyncThunk<
  User,
  void,
  { rejectValue: string }
>("auth/fetchUserDetails", async (_, thunkAPI) => {
  const token = localStorage.getItem("token");
  if (!token) return thunkAPI.rejectWithValue("No token found");

  try {
    const res = await axios.get<User>("http://localhost:5000/users/getUser", {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem("user", JSON.stringify(res.data));
    return res.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch user");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(signupUser.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
