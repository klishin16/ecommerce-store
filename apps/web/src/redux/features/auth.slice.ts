'use client'
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthService } from "@/services";
import { TOKEN_KEY } from "@/constants";
import { ILoginPayload, IRegisterPayload, IUser } from "@ecommerce-store/common";
import { IAuthState } from "@/types";
import { RootState } from "@/redux";


export const register = createAsyncThunk(
  "auth/register",
  async (payload: IRegisterPayload, thunkAPI) => {
    try {
      return await AuthService.register(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const login = createAsyncThunk(
  "auth/login",
  async (payload: ILoginPayload, thunkAPI) => {
    try {
      return await AuthService.login(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const getToken = createAsyncThunk(
  "auth/getToken",
  async (_, thunkAPI) => {
    try {
      const token = (thunkAPI.getState() as RootState).auth.token;
      if (token) {
        return token
      }
      console.log('No token in store, trying get from localStorage')
      if (typeof window !== 'undefined') {
        const localStorageToken = localStorage.getItem(TOKEN_KEY);
        if (localStorageToken) {
          return AuthService.profile(localStorageToken)
            .then((profile) => {
              thunkAPI.dispatch(authActions.setToken(localStorageToken))
              thunkAPI.dispatch(authActions.setUser(profile))
              return localStorageToken;
            })
            .catch(() => {
              return thunkAPI.rejectWithValue('Unauthorized');
            })
        }

      }
      return thunkAPI.rejectWithValue('No token')
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (_, thunkAPI) => {
    try {
      const localStorageToken = localStorage.getItem(TOKEN_KEY);
      if (!localStorageToken) {
        return thunkAPI.rejectWithValue('No token')
      }
      const profile = await AuthService.profile(localStorageToken)
      thunkAPI.dispatch(authActions.setAll({
        token: localStorageToken,
        user: profile,
        isAuthenticated: true
      }))
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
)

const initialState: IAuthState = {
  token: null,
  isAuthenticated: false,
  user: null,
  isLoading: false
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => ({
      ...state,
      user: action.payload
    }),
    setToken: (state, action: PayloadAction<string>) => ({
      ...state,
      token: action.payload
    }),
    setAuthenticated: (state, action: PayloadAction<boolean>) => ({
      ...state,
      isAuthenticated: action.payload
    }),
    setAll: (state, action: PayloadAction<{ token: string; isAuthenticated: boolean, user: IUser }>) => ({
      ...state,
      token: action.payload.token,
      isAuthenticated: action.payload.isAuthenticated,
      user: action.payload.user
    }),
    logout: (state) => {
      localStorage.removeItem(TOKEN_KEY);
      return {
        ...state,
        user: null
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(register.pending, state => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        /** Registration succeeded */
        localStorage.setItem(TOKEN_KEY, action.payload.access_token);
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        /** Registration failed */
        state.isLoading = false;
      })
      .addCase(login.pending, state => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        // Login succeeded
        state.isAuthenticated = true;
        state.token = action.payload.access_token;
        localStorage.setItem(TOKEN_KEY, action.payload.access_token);
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        // Login failed
        state.isLoading = false;
      });
  }
});

export const authActions = {register, login, getToken, authenticate, ...authSlice.actions};
export default authSlice.reducer;
