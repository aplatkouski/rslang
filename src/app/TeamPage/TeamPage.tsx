import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Avatar, Container, Divider, Link, Typography } from '@material-ui/core';
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
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar className={classes.avatar} src={avatar} />
          <Link href={link}>{name}</Link>
        </div>
        <Typography>{description}</Typography>
      </div>
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
