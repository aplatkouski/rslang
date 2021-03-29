import { Container, Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { NavLink } from 'react-router-dom';

import styles from './styles';
import statsImg from '../../assets/img/stats.png';
import gameImg from '../../assets/img/game.png';
import settingsImg from '../../assets/img/settings.png';
import dictionaryImg from '../../assets/img/dictionary.png';
import studyImg from '../../assets/img/study.png';
import teamImg from '../../assets/img/team.png';
import backgroundImg from '../../assets/img/back.png';

type Props = WithStyles<typeof styles>;

const MainPage = ({ classes }: Props): JSX.Element => {
  const size = 6;
  return (
    <main className={classes.app}>
      <Container className={classes.container}>
        <div className={classes.ellips}>
          <img alt="ellips" src={backgroundImg} />
        </div>
        <div className={classes.title}>
          <Typography variant="h1">
            RSLang - удобное приложение для изучения английского языка!
          </Typography>
          <img alt="test" src={studyImg} />
        </div>
      </Container>
      <Container className={classes.container}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h3">Наши преимущества</Typography>
          </Grid>
          <Grid item md={size} sm={12}>
            <div className={classes.card}>
              <div className={classes.description}>
                <Typography variant="h5">Игры</Typography>
                <Typography variant="subtitle1">
                  Сделайте изучение слов более увлекательным с помощью мини-игр
                </Typography>
              </div>
              <img alt="test" src={gameImg} />
            </div>
          </Grid>
          <Grid item md={size} sm={12}>
            <div className={classes.card}>
              <img alt="test" src={dictionaryImg} />
              <div className={classes.description}>
                <Typography variant="h5">Словарь</Typography>
                <Typography variant="subtitle1">
                  Авторизованный пользователь может заносить сложные слова в словарь
                </Typography>
              </div>
            </div>
          </Grid>
          <Grid item md={size} sm={12}>
            <div className={classes.card}>
              <div className={classes.description}>
                <Typography variant="h5">Пользовательские настройки</Typography>
                <Typography variant="subtitle1">
                  Пользователь может настраивать интерфейс под себя
                </Typography>
              </div>
              <img alt="test" src={settingsImg} />
            </div>
          </Grid>
          <Grid item md={size} sm={12}>
            <div className={classes.card}>
              <img alt="test" src={statsImg} />
              <div className={classes.description}>
                <Typography variant="h5">Статистика</Typography>
                <Typography variant="subtitle1">
                  Следите за своим прогрессом каждый день. А авторизованным пользователям
                  доступна возможность просмотра долгосрочной статистики
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={classes.background}>
        <Container className={classes.container}>
          <Typography variant="h3">Как работает наше приложение</Typography>
          <ReactPlayer
            className={classes.video}
            controls
            url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
          />
        </Container>
      </div>
      <Container className={classes.container}>
        <div className={classes.team}>
          <img alt="test" src={teamImg} />
          <div className={classes.info}>
            <Typography variant="h5">Команда</Typography>
            <Typography variant="subtitle1">
              А узнать, кто трудился над этим приложением вы можете&ensp;
              <NavLink to="/about-team">тут!</NavLink>
            </Typography>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default withStyles(styles, { withTheme: true })(MainPage);
