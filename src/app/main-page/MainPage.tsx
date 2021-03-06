import { Container, Grid, Link, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import promotions from 'assets/data/promotions.json';
import backgroundImg from 'assets/img/back.png';
import studyImg from 'assets/img/study.png';
import teamImg from 'assets/img/team.png';
import React from 'react';
import ReactPlayer from 'react-player/youtube';
import { NavLink } from 'react-router-dom';
import { ROUTES, VIDEO_URL } from '../../constants';
import PromotionCard from './promotion-card/PromotionCard';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const MainPage = ({ classes }: Props): JSX.Element => {
  return (
    <main className={classes.app}>
      <Container className={classes.container}>
        <div className={classes.ellipse}>
          <img alt="ellipse" src={backgroundImg} style={{ maxWidth: '100%' }} />
        </div>
        <div className={classes.title}>
          <Typography variant="h1">
            RSLang - удобное приложение для изучения английского языка!
          </Typography>
          <img alt="test" src={studyImg} />
        </div>
      </Container>
      <Container className={classes.container}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">Наши преимущества</Typography>
          </Grid>
          {promotions.map(({ content, img, title }, index) => (
            <Grid key={title} item md={6} sm={12} xs={12}>
              <PromotionCard
                content={content}
                img={img}
                isReverse={Boolean(index % 2)}
                title={title}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <div className={classes.background}>
        <Container className={classes.container}>
          <Typography variant="h3">Как работает наше приложение</Typography>
          <div className={classes.playerWrapper}>
            <ReactPlayer
              className={classes.video}
              controls
              height="100%"
              style={{ margin: 0 }}
              url={VIDEO_URL}
              width="100%"
            />
          </div>
        </Container>
      </div>
      <Container className={classes.container}>
        <div className={classes.team}>
          <img alt="test" src={teamImg} />
          <div className={classes.info}>
            <Typography className={classes.infoText} variant="h5">
              Команда
            </Typography>
            <Typography className={classes.infoText} variant="subtitle1">
              А узнать, кто трудился над этим приложением, вы можете&ensp;
              <Link component={NavLink} to={ROUTES.aboutTeam.url} underline="none">
                тут!
              </Link>
            </Typography>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default withStyles(styles, { withTheme: true })(MainPage);
