import userAltImg from 'assets/img/UnknownUser.png';
import { makeStyles } from '@material-ui/core/styles';
import * as t from 'types';
import React, { useRef, useEffect, useCallback } from 'react';
import { getCurrUser } from 'features/user/userSlice';
import { useSelector } from 'react-redux';
import { api, GET_USER_PHOTO_API } from '../../constants';

import './UserCard.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(0, 1),
  },
  large: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    borderRadius: '10px',
  },
}));

export default function UserCard(): JSX.Element {
  const classes = useStyles();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const currentUser: t.IUser = useSelector(getCurrUser);

  function handleLoadAlternativeImg() {
    if (imgRef && imgRef.current) {
      imgRef.current.src = userAltImg;
    }
  }

  const loadUserPhoto = useCallback(async () => {
    if (imgRef && imgRef.current) {
      const options = {
        method: 'GET',
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${currentUser.token}`,
          Accept: 'application/json',
        },
      };

      const response = await fetch(
        `${api}/${GET_USER_PHOTO_API(currentUser.userId)}`,
        options
      );

      const blob = await response.blob();

      imgRef.current.src = URL.createObjectURL(blob);
    }
  }, [currentUser.token, currentUser.userId]);

  useEffect(() => {
    if (currentUser && currentUser.token) {
      try {
        loadUserPhoto();
      } catch {
        handleLoadAlternativeImg();
      }
    }
  }, [currentUser, loadUserPhoto]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser ? (
        <div className={`${classes.root} user-card`}>
          <img
            ref={imgRef}
            alt=""
            className={`${classes.large} img`}
            onError={handleLoadAlternativeImg}
          />
          <p className="user-name">{currentUser.name}</p>
        </div>
      ) : (
        <span />
      )}
    </>
  );
}
