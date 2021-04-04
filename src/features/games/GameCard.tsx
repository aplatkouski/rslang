import { WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { IGame } from 'types';
import { useGameLogo } from '../../common/hooks';
import gameCardStyles from './game-card-styles';

interface Props extends WithStyles<typeof gameCardStyles> {
  game: IGame;
}

const GameCard = ({ classes, game }: Props): JSX.Element => {
  const gameLogo = useGameLogo(game.img);

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {game.name}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {game.id}
          </Typography>
        </CardContent>
      </div>
      <CardMedia className={classes.cover} image={gameLogo} title={game.name} />
    </Card>
  );
};

export default withStyles(gameCardStyles, { withTheme: true })(GameCard);
