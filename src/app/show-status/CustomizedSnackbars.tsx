import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useCallback, useEffect, useState } from 'react';
import { IStatus } from 'types';
import { requestStatus } from '../../constants';
import LinearIndeterminate from './linear-indeterminate/LinearIndeterminate';

interface Props {
  request: IStatus;
}

const Alert = (props: AlertProps) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <MuiAlert elevation={6} variant="filled" {...props} />
);

const CustomizedSnackbars = ({ request }: Props): JSX.Element => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (request.status === requestStatus.rejected && request.error) {
      setOpen(true);
    }
  }, [request.error, request.status]);

  const handleClose = useCallback((_: React.SyntheticEvent, reason?: string) => {
    if (reason !== 'clickaway') setOpen(false);
  }, []);

  if (request.status === requestStatus.pending) {
    return <LinearIndeterminate />;
  }

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={6000}
      onClose={handleClose}
      open={open}
    >
      <Alert onClose={handleClose} severity="error">
        {request.error}
      </Alert>
    </Snackbar>
  );
};

export default CustomizedSnackbars;
