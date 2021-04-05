import { Button, Tooltip } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Games } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';

import styles from './styles';

type Props = WithStyles<typeof styles>;

const GamesButton = ({ classes }: Props): JSX.Element => {
  const history = useHistory();

  const handleClick = () => {
    history.push('/games/myGame');
  };

  return (
    <Tooltip title="Мини-игры">
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        className={classes.button}
        color="primary"
        onClick={handleClick}
        variant="contained"
      >
        <Games />
      </Button>
    </Tooltip>
  );
};

export default withStyles(styles, { withTheme: true })(GamesButton);
