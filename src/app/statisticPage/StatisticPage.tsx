import { Grid, Typography } from '@material-ui/core';
import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';

import statisticImg from '../../assets/img/stats.png';
import dictionaryImg from '../../assets/img/dictionary.png';
import gameImg from '../../assets/img/game.png';
import { initialStats } from '../../constants';
import styles from './styles';

type Props = WithStyles<typeof styles>;

interface StatisticSectionProps extends WithStyles<typeof styles> {
  stats: any;
  title: string;
}

const StatisticSection = ({ classes, title, stats }: StatisticSectionProps) => {
  const { words, correctAnswers, answers, series } = stats;
  const correctProcents = Math.floor((correctAnswers / answers) * 100);
  return (
    <div className={classes.container}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <Typography variant="h4">{title}</Typography>
        </Grid>
        <Grid item md={title === 'Всего' ? 6 : 4} sm={12}>
          <div className={classes.card}>
            <img alt="test" src={dictionaryImg} />
            <div className={classes.description}>
              <Typography variant="h6">Изучено</Typography>
              <Typography variant="subtitle1">{words || 0}</Typography>
            </div>
          </div>
        </Grid>
        <Grid item md={title === 'Всего' ? 6 : 4} sm={12}>
          <div className={classes.card}>
            <img alt="test" src={statisticImg} />
            <div className={classes.description}>
              <Typography variant="h6">Правильных ответов</Typography>
              <Typography variant="subtitle1">{`${correctProcents || 0}%`}</Typography>
            </div>
          </div>
        </Grid>
        {title === 'Всего' ? null : (
          <Grid item md={4} sm={12}>
            <div className={classes.card}>
              <img alt="test" src={gameImg} />
              <div className={classes.description}>
                <Typography variant="h6">Самая длинная серия</Typography>
                <Typography variant="subtitle1">{`${series} праивльных ответа`}</Typography>
              </div>
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

const StatisticPage = ({ classes }: Props): JSX.Element => {
  const data = localStorage.getItem('stats');
  const stats = data ? JSON.parse(data) : initialStats;
  const { sprint, audiocall, savan, own } = stats;
  const totalWords = sprint.words + audiocall.words + savan.words + own.words;
  const totalAnswers = sprint.answers + audiocall.answers + savan.answers + own.answers;
  const totalcorrectAnswers =
    sprint.correctAnswers +
    audiocall.correctAnswers +
    savan.correctAnswers +
    own.correctAnswers;
  const totalStats = {
    words: totalWords,
    answers: totalAnswers,
    correctAnswers: totalcorrectAnswers,
    series: 0,
  };
  return (
    <div className={classes.container}>
      <Typography variant="h2">Статистика за сегодня</Typography>
      <StatisticSection classes={classes} stats={sprint} title="Спринт" />
      <StatisticSection classes={classes} stats={audiocall} title="Аудиовызов" />
      <StatisticSection classes={classes} stats={savan} title="Саванна" />
      <StatisticSection classes={classes} stats={own} title="Своя игра" />
      <StatisticSection classes={classes} stats={totalStats} title="Всего" />
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(StatisticPage);
