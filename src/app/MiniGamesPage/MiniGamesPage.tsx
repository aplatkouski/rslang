import React from 'react';
import { WithStyles, withStyles } from '@material-ui/core/styles';

import MiniGameCard from './MiniGameCard';
import { MINI_GAMES } from '../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const MiniGamesPage = ({ classes }: Props) => {
  return (
    <div className={classes.miniGamesPage}>
      <div className={classes.title}> Mini Games</div>
      <div className={classes.games}>
        {MINI_GAMES.map(({ title, path, description }) => {
          return (
            <MiniGameCard
              key={title}
              description={description}
              path={path}
              title={title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGamesPage);
