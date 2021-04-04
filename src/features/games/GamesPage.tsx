import { Grid, WithStyles, withStyles } from '@material-ui/core';
import React from 'react';
import { IGame } from 'types';
import GameCard from './GameCard';
import gamesPageStyles from './games-page-styles';

interface Props extends WithStyles<typeof gamesPageStyles> {
  games: Array<IGame>;
}

const GamesPage = ({ classes, games }: Props): JSX.Element => (
  <Grid className={classes.root} container>
    {games.map((game) => (
      <Grid key={game.id} item>
        <GameCard game={game} />
      </Grid>
    ))}
  </Grid>
);

export default withStyles(gamesPageStyles, { withTheme: true })(GamesPage);
