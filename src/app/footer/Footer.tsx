import { Grid, Link, Typography } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import ContributorLinks from 'app/footer/contributorLinks/ContributorLinks';
import SvgImg from 'app/footer/svgImg/SvgImg';
import contributors from 'assets/data/contributors.json';
import RsSchoolLogo from 'assets/icons/rsschool-logo.svg';
import clsx from 'clsx';
import * as React from 'react';
import { useLocation } from 'react-router-dom';
import { ROUTES } from '../../constants';

import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const AppIntro = (): JSX.Element => (
  <Typography color="inherit" variant="body2">
    <Link
      color="inherit"
      href="https://github.com/aplatkouski/rslang"
      title="RSLang source"
      underline="none"
    >
      RS Lang
    </Link>
    , 2021.
  </Typography>
);

const Footer = ({ classes }: Props): JSX.Element => {
  const { pathname } = useLocation();
  const isGameRoute = pathname.includes(ROUTES.games.url);

  if (isGameRoute) {
    return <div />;
  }

  return (
    <footer className={classes.footer}>
      <Grid className={classes.container} container>
        <Grid className={clsx(classes.item, classes.rsLang)} item md sm={12} xs={12}>
          <AppIntro />
        </Grid>
        <Grid container item justify="center" md={9} sm={12}>
          <ContributorLinks contributors={contributors} />
        </Grid>
        <Grid className={classes.item} item md sm={12}>
          <Link
            color="inherit"
            href="https://rs.school/react/"
            rel="noopener"
            target="_blank"
            underline="none"
          >
            <SvgImg alt="RSSchool logo" src={RsSchoolLogo} title="rs.school" />
          </Link>
        </Grid>
      </Grid>
    </footer>
  );
};

export default withStyles(styles, { withTheme: true })(Footer);
