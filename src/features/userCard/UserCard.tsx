import userAltImg from 'assets/img/UnknownUser.png';
import * as t from 'types';
import React, { useRef } from 'react';
import { getCurrUser } from 'features/user/userSlice';
import { useSelector } from 'react-redux';
import { withStyles, WithStyles } from '@material-ui/core';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const UserCard = ({ classes }: Props): JSX.Element => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const currentUser: t.IUser = useSelector(getCurrUser);

  function handleLoadAlternativeImg() {
    if (imgRef && imgRef.current) {
      imgRef.current.src = userAltImg;
    }
  }

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {currentUser ? (
        <div className={`${classes.root} ${classes.userCard}`}>
          <img
            ref={imgRef}
            alt=""
            className={`${classes.large} ${classes.img}`}
            onError={handleLoadAlternativeImg}
            src={currentUser.photoSrc}
          />
          <p className={`${classes.userName}`}>{currentUser.name}</p>
        </div>
      ) : (
        <span />
      )}
    </>
  );
};

export default withStyles(styles, { withTheme: true })(UserCard);
