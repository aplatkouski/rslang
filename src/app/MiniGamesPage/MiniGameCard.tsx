import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import styles from './styles';

const MiniGameCard = ({ classes, description, path, title }: any) => {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2" gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography color="textSecondary" component="p" variant="body2">
          {description}
        </Typography>
        <Typography color="textSecondary" component="p" variant="body2">
          Счет: ...
        </Typography>
      </CardContent>
      <CardActions>
        <NavLink className={classes.link} to={path}>
          <Button color="primary" disableElevation variant="contained">
            Играть
          </Button>
        </NavLink>
      </CardActions>
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGameCard);
