import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AppThunk, RootState } from 'app/store';
import userAltImg from 'assets/img/UnknownUser.png';
import { fetchUserWords } from 'features/user-words/userWordsSlice';
import {
  api,
  GET_USER_API,
  GET_USER_PHOTO_API,
  LOCALSTORAGE_KEY,
  LOG_IN_API,
  SERVER_OK_STATUS,
  WRONG_AUTHENTICATION_DATA_MESSAGE,
} from '../../constants';
import {
  ICredentials,
  ILoginErrors,
  ILoginStatus,
  IUser,
  IUserLogInData,
} from '../../types';

interface IUserState extends IUser, ILoginErrors, ILoginStatus {}

const initialState: IUserState = {
  token: '',
  refreshToken: '',
  userId: '',
  name: '',
  errLogInMessage: undefined,
  inProgress: false,
  photoSrc: userAltImg,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserWithDefPhoto: (state, action: PayloadAction<IUser>) => {
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.userId = action.payload.userId;
      state.name = action.payload.name;
      state.errLogInMessage = undefined;
      state.inProgress = false;
      state.photoSrc = userAltImg;
    },
    unsetUser: (state) => {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
      state.name = '';
      state.errLogInMessage = undefined;
      state.inProgress = false;
      state.photoSrc = userAltImg;
    },
    setLogInError: (state, action: PayloadAction<string>) => {
      state.token = '';
      state.refreshToken = '';
      state.userId = '';
      state.name = '';
      state.errLogInMessage = action.payload;
      state.inProgress = false;
      state.photoSrc = userAltImg;
    },
    delLogInErrMessage: (state) => {
      state.errLogInMessage = undefined;
    },
    setLoginProgress: (state, action: PayloadAction<boolean>) => {
      state.inProgress = action.payload;
    },
    setUserPhoto: (state, action: PayloadAction<string>) => {
      state.photoSrc = action.payload;
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
    const { token, refreshToken, userId, name } = savedUserData;

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
      const userData: IUser = {
        token,
        refreshToken,
        userId,
        name,
        photoSrc: '',
      };
      dispatch(setUserWithDefPhoto(userData));
      dispatch(getUserPhotoSrc(userId, token));
      dispatch(fetchUserWords({ userId, userToken: token }));
    } else {
      dispatch(logOut());
    }
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

      dispatch(setUserWithDefPhoto(user));
      dispatch(getUserPhotoSrc(user.userId, user.token));
      dispatch(fetchUserWords({ userId: user.userId, userToken: user.token }));

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
    photoSrc: userAltImg,
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
    try {
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
    } catch {
      dispatch(setUserPhoto(userAltImg));
    }
  } else {
    dispatch(setUserPhoto(userAltImg));
  }
};

export const {
  setUserWithDefPhoto,
  unsetUser,
  setLogInError,
  delLogInErrMessage,
  setLoginProgress,
  setUserPhoto,
} = userSlice.actions;

export const getCurrUser = (state: RootState): IUser => {
  return {
    token: state.user.token,
    refreshToken: state.user.refreshToken,
    userId: state.user.userId,
    name: state.user.name,
    photoSrc: state.user.photoSrc,
  };
};

export const getErrLogInMessage = (state: RootState) => state.user.errLogInMessage;

export const getLoginStatus = (state: RootState) => state.user.inProgress;

export const selectCredentials = (state: RootState): ICredentials => ({
  userToken: state.user.token,
  userId: state.user.userId,
});

export default userSlice.reducer;
