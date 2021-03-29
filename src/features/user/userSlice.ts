import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import { IUser, IUserLogInData, ILoginErrors, ILoginStatus } from '../../types';
import {
  api,
  LOCALSTORAGE_KEY,
  LOG_IN_API,
  SERVER_OK_STATUS,
  WRONG_AUTHENTICATION_DATA_MESSAGE,
} from '../../constants';

interface IUserState extends IUser, ILoginErrors, ILoginStatus {}

const initialState: IUserState = {
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
  errLogInMessage: undefined,
  inProgress: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUser>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.errLogInMessage = undefined;
      state.inProgress = false;
    },
    unsetUser: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
      state.name = '';
      state.errLogInMessage = undefined;
      state.inProgress = false;
    },
    setLogInError: (state, action: PayloadAction<string>) => {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
      state.name = '';
      state.errLogInMessage = action.payload;
      state.inProgress = false;
    },
    delLogInErrMessage: (state) => {
      state.errLogInMessage = undefined;
    },
    setLoginProgress: (state, action: PayloadAction<boolean>) => {
      state.inProgress = action.payload;
    },
  },
});

export const logInViaLocalStorage = (): AppThunk => (dispatch) => {
  const savedUserData = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || 'null'
  ) as IUser | null;

  if (savedUserData) {
    const { token, refreshToken, userId, name } = savedUserData;
    const userData: IUser = {
      token,
      refreshToken,
      userId,
      name,
    };
    dispatch(setUser(userData));
  }
};

export const logIn = (logInData: IUserLogInData): AppThunk => async (dispatch) => {
  dispatch(setLoginProgress(true));
  try {
    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(logInData),
    };
    const response = await fetch(`${api}/${LOG_IN_API}`, options);

    if (response.status !== SERVER_OK_STATUS) {
      dispatch(setLogInError(WRONG_AUTHENTICATION_DATA_MESSAGE));
    } else {
      const user = (await response.json()) as IUser;

      dispatch(setUser(user));

      const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
      const savedUserData = lsItem ? (JSON.parse(lsItem) as IUser) : {};

      localStorage.setItem(
        LOCALSTORAGE_KEY,
        JSON.stringify({
          ...savedUserData,
          ...user,
        })
      );
    }
  } catch (e) {
    dispatch(setLogInError(e.message));
  }
  dispatch(setLoginProgress(false));
};

export const logOut = (): AppThunk => async (dispatch) => {
  const noUserData: IUserState = {
    token: '',
    refreshToken: '',
    userId: '',
    name: '',
    errLogInMessage: undefined,
    inProgress: false,
  };

  const lsItem: string | null = localStorage.getItem(LOCALSTORAGE_KEY);
  const savedUserData = lsItem ? (JSON.parse(lsItem) as IUser) : {};

  localStorage.setItem(
    LOCALSTORAGE_KEY,
    JSON.stringify({
      ...savedUserData,
      ...noUserData,
    })
  );

  dispatch(unsetUser());
};

export const {
  setUser,
  unsetUser,
  setLogInError,
  delLogInErrMessage,
  setLoginProgress,
} = userSlice.actions;

export const getCurrUser = (state: RootState) => {
  return {
    token: state.user.token,
    refreshToken: state.user.refreshToken,
    userId: state.user.userId,
    name: state.user.name,
  };
};

export const getErrLogInMessage = (state: RootState) => state.user.errLogInMessage;

export const getLoginStatus = (state: RootState) => state.user.inProgress;

export default userSlice.reducer;
