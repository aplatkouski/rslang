import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Avatar, Container, Divider, Grid, Link, Typography } from '@material-ui/core';
import GitHubLogo from 'assets/icons/github-logo-dark.svg';
import clsx from 'clsx';
import SvgImg from './svgImg/SvgImg';
import { info } from './profileInfo';
import styles from './styles';

type Props = WithStyles<typeof styles>;

interface MemberBlockProps {
  avatar: string;
  description: string;
  name: string;
  link: string;
  classes: any;
}

const MemberBlock = ({ avatar, description, name, link, classes }: MemberBlockProps) => {
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <div className={classes.title}>
            <Avatar className={classes.avatar} src={avatar} />
          </div>
        </Grid>
        <Grid item xs={6}>
          <div className={clsx(classes.contribution, classes.title)}>
            <Link className={classes.title} href={link}>
              <SvgImg alt="GitHub logo" src={GitHubLogo} title={link} /> {name}
            </Link>
            <Typography>{description}</Typography>
          </div>
        </Grid>
      </Grid>
      <Divider className={classes.divider} variant="middle" />
    </>
  );
};

const TeamPage = ({ classes }: Props): JSX.Element => {
  return (
    <Container>
      {info.map((item: any) => (
        <MemberBlock
          key={Math.random()}
          avatar={item.avatar}
          classes={classes}
          description={item.description}
          link={item.link}
          name={item.name}
        />
      ))}
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(TeamPage);
