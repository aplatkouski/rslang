import { Grid, Link } from '@material-ui/core';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import GitHubLogo from 'assets/icons/github-logo.svg';
import SvgImg from 'app/footer/svgImg/SvgImg';
import * as React from 'react';
import * as t from '../../../types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  contributors: Array<t.Contributor>;
}

const ContributorLinks = ({ contributors, classes }: Props): JSX.Element => (
  <>
    {contributors.map((contributor) => (
      <Grid key={contributor.name} className={classes.item} item md={3} sm={6}>
        <Link
          className={classes.link}
          href={contributor.gitHubLink}
          rel="noopener"
          target="_blank"
          underline="none"
          variant="body2"
        >
          {contributor.name}
          <SvgImg alt="GitHub logo" src={GitHubLogo} title="github.com" />
        </Link>
      </Grid>
    ))}
  </>
);

export default withStyles(styles, { withTheme: true })(ContributorLinks);
