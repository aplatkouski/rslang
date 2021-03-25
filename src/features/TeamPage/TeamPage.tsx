import React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import { Avatar, Container, Divider, Link, Typography } from '@material-ui/core';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const TeamPage = ({ classes }: Props): JSX.Element => {
  return (
    <Container>
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar
            className={classes.avatar}
            src="https://cdn.onlinewebfonts.com/svg/img_264570.png"
          />
          <Link href="https://github.com/aplatkouski">Artsiom Platkouski</Link>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc
          congue. Dignissim sodales ut eu sem integer vitae justo eget. Enim praesent
          elementum facilisis leo vel. Orci a scelerisque purus semper eget duis at tellus
          at. Eget aliquet nibh praesent tristique. Sed faucibus turpis in eu mi bibendum
          neque. Adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio
          ut. Posuere sollicitudin aliquam ultrices sagittis orci. Massa eget egestas
          purus viverra accumsan in. Auctor elit sed vulputate mi sit amet mauris commodo
          quis. Est velit egestas dui id ornare arcu odio. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales
          ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Amet dictum
          sit amet justo donec. Magna etiam tempor orci eu.
        </Typography>
      </div>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar src="https://cdn.onlinewebfonts.com/svg/img_264570.png" />
          <Link href="https://github.com/natallia-js">Natallia Fedartsova</Link>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc
          congue. Dignissim sodales ut eu sem integer vitae justo eget. Enim praesent
          elementum facilisis leo vel. Orci a scelerisque purus semper eget duis at tellus
          at. Eget aliquet nibh praesent tristique. Sed faucibus turpis in eu mi bibendum
          neque. Adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio
          ut. Posuere sollicitudin aliquam ultrices sagittis orci. Massa eget egestas
          purus viverra accumsan in. Auctor elit sed vulputate mi sit amet mauris commodo
          quis. Est velit egestas dui id ornare arcu odio. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales
          ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Amet dictum
          sit amet justo donec. Magna etiam tempor orci eu.
        </Typography>
      </div>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar src="https://cdn.onlinewebfonts.com/svg/img_264570.png" />
          <Link href="https://github.com/RVitaly1978">Vital Raicheu</Link>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc
          congue. Dignissim sodales ut eu sem integer vitae justo eget. Enim praesent
          elementum facilisis leo vel. Orci a scelerisque purus semper eget duis at tellus
          at. Eget aliquet nibh praesent tristique. Sed faucibus turpis in eu mi bibendum
          neque. Adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio
          ut. Posuere sollicitudin aliquam ultrices sagittis orci. Massa eget egestas
          purus viverra accumsan in. Auctor elit sed vulputate mi sit amet mauris commodo
          quis. Est velit egestas dui id ornare arcu odio. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales
          ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Amet dictum
          sit amet justo donec. Magna etiam tempor orci eu.
        </Typography>
      </div>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar src="https://cdn.onlinewebfonts.com/svg/img_264570.png" />
          <Link href="https://github.com/DmitryBogdan90">DmitryBogdan90</Link>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc
          congue. Dignissim sodales ut eu sem integer vitae justo eget. Enim praesent
          elementum facilisis leo vel. Orci a scelerisque purus semper eget duis at tellus
          at. Eget aliquet nibh praesent tristique. Sed faucibus turpis in eu mi bibendum
          neque. Adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio
          ut. Posuere sollicitudin aliquam ultrices sagittis orci. Massa eget egestas
          purus viverra accumsan in. Auctor elit sed vulputate mi sit amet mauris commodo
          quis. Est velit egestas dui id ornare arcu odio. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales
          ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Amet dictum
          sit amet justo donec. Magna etiam tempor orci eu.
        </Typography>
      </div>
      <Divider className={classes.divider} variant="middle" />
      <div className={classes.item}>
        <div className={classes.title}>
          <Avatar src="https://cdn.onlinewebfonts.com/svg/img_264570.png" />
          <Link href="https://github.com/vzabavski">Vital Zabavski</Link>
        </div>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Volutpat consequat mauris nunc
          congue. Dignissim sodales ut eu sem integer vitae justo eget. Enim praesent
          elementum facilisis leo vel. Orci a scelerisque purus semper eget duis at tellus
          at. Eget aliquet nibh praesent tristique. Sed faucibus turpis in eu mi bibendum
          neque. Adipiscing at in tellus integer feugiat. Egestas dui id ornare arcu odio
          ut. Posuere sollicitudin aliquam ultrices sagittis orci. Massa eget egestas
          purus viverra accumsan in. Auctor elit sed vulputate mi sit amet mauris commodo
          quis. Est velit egestas dui id ornare arcu odio. Egestas quis ipsum suspendisse
          ultrices gravida dictum fusce ut. Ultrices mi tempus imperdiet nulla malesuada
          pellentesque. Vitae elementum curabitur vitae nunc sed velit dignissim sodales
          ut. Gravida arcu ac tortor dignissim convallis aenean et tortor at. Amet dictum
          sit amet justo donec. Magna etiam tempor orci eu.
        </Typography>
      </div>
    </Container>
  );
};

export default withStyles(styles, { withTheme: true })(TeamPage);
