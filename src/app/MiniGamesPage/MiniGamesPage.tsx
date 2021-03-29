import React from 'react';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
import MiniGameCard from './MiniGameCard';

interface MiniGamesPageProps {
  classes: any;
}

const gamesInfo = [
  {
    title: 'AudioCall',
    path: '/mini-games/audio-call',
    description: 'Audio Call Description',
  },
  {
    title: 'Savanna',
    path: '/mini-games/savanna',
    description:
      'Тренировка “Саванна” – это тренажер по переводу твоего пассивного изученного словаря в активную стадию. Все это происходит за счет вовлечения реакции в процесс перевода. Тренируйся регулярно и сможешь на лету подбирать правильные слова при письме и в процессе говорения.',
  },
  { title: 'Sprint', path: '/mini-games/sprint', description: 'Sprint Description' },
];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
    },
    games: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
      },
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

const MiniGamesPage = ({ classes }: MiniGamesPageProps) => {
  return (
    <div className={classes.root}>
      <div className={classes.title}> Mini Games</div>
      <div className={classes.games}>
        {gamesInfo.map(({ title, path, description }) => {
          return <MiniGameCard description={description} path={path} title={title} />;
        })}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(MiniGamesPage);
