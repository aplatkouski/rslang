import { IconButton, Link, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const burgerItems = [{ route: ROUTES.statistics.url, title: ROUTES.statistics.title }];

const Burger = ({ classes }: Props): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Tooltip title="Игры">
        <IconButton
          aria-controls="long-menu"
          aria-haspopup="true"
          aria-label="more"
          className={classes.button}
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="simple-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        {burgerItems.map(({ route, title }) => (
          <MenuItem key={title} onClick={handleClose}>
            <Link component={NavLink} to={route} underline="none">
              {title}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Burger);
