import {Action, AnyAction, createAsyncThunk, createSlice, isRejectedWithValue, PayloadAction} from "@reduxjs/toolkit";
import {removeToken, saveToken} from "../services/token";
import {AppDispatch, RootState} from "./store";
import {useGetAllQuery} from "./usersApi";


const initialState = {
  token: '',
  isLoading: false,
  isSuccess: false,
}

const registerUserThunk = createAsyncThunk<{ token: string }, { email: string, name: string, password: string }>(
  'auth/register',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await fetch('/register', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        return await response.json();
      }

      return rejectWithValue('some thing went wrong');

    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
)

const loginUserThunk = createAsyncThunk<{ token: string }, { email: string, password: string }>(
  'auth/login',
  async (credentials, {rejectWithValue}) => {
    try {
      const response = await fetch('/login', {
        method: "POST",
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      if (response.ok) {
        console.log('no')
        return await response.json();
      }

      return rejectWithValue('some thing went wrong');

    } catch (error) {
      console.log(error);
      return rejectWithValue((error as Error).message);
    }
  }
)


const checkTokenThunk = createAsyncThunk<{ token: string }, string>(
  'auth/checkToken',
  async (token, {rejectWithValue}) => {
    try {
      const response = await fetch(`/login?token=${token}`, {
        method: "get",
      });

      if (response.ok) {
        console.log('23')
        return await response.json();
      }

      return rejectWithValue('some thing went wrong');
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      removeToken();
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload?.token || '';
        saveToken(state.token);
      })
      .addCase(checkTokenThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(checkTokenThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.token = action.payload.token;
        saveToken(state.token);
      })
      .addCase(checkTokenThunk.rejected, (state, action) => {
        console.log('reject token')
        state.isLoading = false;
        state.isSuccess = false;
        state.token = '';
        removeToken();
      })
      .addCase(loginUserThunk.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(action.payload);
        state.token = action.payload.token;
        saveToken(state.token);
      })
  }
});

export default authSlice;
export const {logout} = authSlice.actions;
export {registerUserThunk, checkTokenThunk, loginUserThunk};
export const selectAuth = (state: RootState) => state.auth;

