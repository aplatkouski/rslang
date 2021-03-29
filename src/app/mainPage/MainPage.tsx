import { Container, Grid, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import React from 'react';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const MainPage = ({ classes }: Props): JSX.Element => (
  <main className={classes.app}>
    <Container className={classes.container}>
      <Typography variant="h1">
        RSLang - отличное приложение для изучения английского языка!
      </Typography>
    </Container>
    <Container className={classes.container}>
      <Grid container spacing={3}>
        <Grid item sm={6} xs={6}>
          <div>
            <p>block</p>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <div>
            <p>block</p>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <div>
            <p>block</p>
          </div>
        </Grid>
        <Grid item sm={6} xs={6}>
          <div>
            <p>block</p>
          </div>
        </Grid>
      </Grid>
    </Container>
    <Container className={classes.container}>
      <div>
        <p>Video</p>
      </div>
    </Container>
    <Container className={classes.container}>
      <div>
        <p>About team</p>
      </div>
    </Container>
  </main>
);

export default withStyles(styles, { withTheme: true })(MainPage);
