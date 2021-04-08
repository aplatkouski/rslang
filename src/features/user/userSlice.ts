import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import userAltImg from 'assets/img/UnknownUser.png';
import { fetchUserWords } from 'features/user-words/userWordsSlice';
import { ICredentials, IUser, IUserLogInData } from 'types';
import {
  api,
  GET_USER_API,
  GET_USER_PHOTO_API,
  LOCALSTORAGE_KEY,
  LOG_IN_API,
  SERVER_OK_STATUS,
  WRONG_AUTHENTICATION_DATA_MESSAGE,
} from '../../constants';

export const status = {
  idle: 'idle' as const,
  fulfilled: 'fulfilled' as const,
  pending: 'pending' as const,
};

type Status = keyof typeof status;

interface IState {
  current?: IUser;
  error?: string;
  status: Status;
  defaultPhoto: string;
}

const initialState: IState = {
  status: 'idle',
  defaultPhoto: userAltImg,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserWithDefPhoto: (state, action: PayloadAction<IUser>) => {
      state.current = action.payload;
      state.current.photoSrc = userAltImg;
      state.error = undefined;
      state.status = status.fulfilled;
    },
    unsetUser: (state) => {
      state.current = undefined;
      state.error = undefined;
      state.status = status.idle;
    },
    setLogInError: (state, action: PayloadAction<string>) => {
      state.current = undefined;
      state.error = action.payload;
      state.status = status.idle;
    },
    delLogInErrMessage: (state) => {
      state.error = undefined;
    },
    setLoginStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    setUserPhoto: (state, action: PayloadAction<string>) => {
      if (state.current) state.current.photoSrc = action.payload;
    },
  },
});

export const logInViaLocalStorage = (): AppThunk => async (dispatch) => {
  const savedUserData = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || 'null'
  ) as IUser | null;

  // Если после перезагрузки в localstorage что-то о пользователе обнаруживается,
  // то пробуем получить от сервера информацию о данном пользователе.
  if (savedUserData) {
    const { token, userId } = savedUserData;

    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };
    const response = await fetch(`${api}/${GET_USER_API(userId)}`, options);

    // Если получить информацию о пользователе с сервера не получается, то такой
    // пользователь имеет просроченный токен. Ему необходимо заново пройти процедуру
    // аутентификации.
    // В противном случае пользователь успешно входит в систему, и мы подгружаем его фото.
    if (response.status === SERVER_OK_STATUS) {
      dispatch(setUserWithDefPhoto(savedUserData));
      dispatch(getUserPhotoSrc(userId, token));
      dispatch(fetchUserWords({ userId, userToken: token }));
    } else {
      dispatch(logOut());
    }
  }
};

export const logIn = (logInData: IUserLogInData): AppThunk => async (dispatch) => {
  dispatch(setLoginStatus(status.pending));

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
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(user));

      dispatch(setUserWithDefPhoto(user));
      const { userId, token: userToken } = user;
      dispatch(getUserPhotoSrc(userId, userToken));
      dispatch(fetchUserWords({ userId, userToken }));
    }
  } catch (e) {
    dispatch(setLogInError(e.message));
  }
  dispatch(setLoginStatus(status.fulfilled));
};

export const logOut = (): AppThunk => async (dispatch) => {
  const noUserData: IState = {
    status: status.idle,
    defaultPhoto: userAltImg,
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

export const getUserPhotoSrc = (userId: string, userToken: string): AppThunk => async (
  dispatch
) => {
  if (userId && userToken) {
    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${userToken}`,
        Accept: 'application/json',
      },
    };
    const response = await fetch(`${api}/${GET_USER_PHOTO_API(userId)}`, options);
    const blob = await response.blob();

    dispatch(setUserPhoto(URL.createObjectURL(blob)));
  }
};

export const {
  setUserWithDefPhoto,
  unsetUser,
  setLogInError,
  delLogInErrMessage,
  setLoginStatus,
  setUserPhoto,
} = userSlice.actions;

const fakeUse: IUser = {
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
  photoSrc: '',
};

export const getCurrUser = (state: RootState): IUser => state.user.current || fakeUse;

export const getErrLogInMessage = (state: RootState) => state.user.error;

export const getLoginStatus = (state: RootState) => state.user.status;

export const selectCredentials = (state: RootState): ICredentials => {
  const { token: userToken, userId } = state.user.current || fakeUse;
  return {
    userToken,
    userId,
  };
};

export default userSlice.reducer;
