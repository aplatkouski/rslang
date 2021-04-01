import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import MiniGameCard from './MiniGameCard';
import { MINI_GAMES } from '../../constants';
import styles from './styles';

interface MiniGamesPageProps {
  classes: any;
}

const MiniGamesPage = ({ classes }: MiniGamesPageProps) => {
  return (
    <div className={classes.miniGamesPage}>
      <div className={classes.title}> Mini Games</div>
      <div className={classes.games}>
        {MINI_GAMES.map(({ title, path, description }) => {
          return <MiniGameCard description={description} path={path} title={title} />;
        })}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGamesPage);
