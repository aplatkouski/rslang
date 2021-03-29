import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import React from 'react';
import { Button, Card, CardActions, CardContent, Typography } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      margin: 10,
      maxHeight: 350,
      maxWidth: 300,
      height: '100vh',
      padding: 10,
      width: '100%',
    },
    description: {
      overflow: 'hidden',
    },
    link: {
      textDecoration: 'none',
    },
    title: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: theme.spacing(2.5),
      margin: theme.spacing(2.25),
      '& a': {
        marginTop: theme.spacing(1),
        fontSize: theme.spacing(2.5),
        color: theme.palette.text.secondary,
      },
      '& div': {
        width: '100px',
        height: '100px',
      },
    },
  });

const MiniGameCard = ({ classes, description, path, title }: any) => {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography component="h2" gutterBottom variant="h5">
          {title}
        </Typography>
        <Typography
          className={classes.description}
          color="textSecondary"
          component="p"
          variant="body2"
        >
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
