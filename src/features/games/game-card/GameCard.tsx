import { Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import { useImg } from 'common/hooks';
import React from 'react';
import { IGame } from 'types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  game: IGame;
}

const GameCard = ({ classes, game }: Props): JSX.Element => {
  const gameLogo = useImg(game.img);

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {game.name}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1">
          {game.id}
        </Typography>
      </CardContent>
      <CardMedia className={classes.cover} image={gameLogo} title={game.name} />
    </Card>
  );
};

export default withStyles(styles, { withTheme: true })(GameCard);
