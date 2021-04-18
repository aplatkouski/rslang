import { IconButton, Link, Menu, MenuItem, Tooltip } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useAppParams, useAppSelector } from 'common/hooks';
import { selectAllGames } from 'features/games/gamesSlice';
import React, { useCallback, useEffect, useState } from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ROUTES } from '../../../constants';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {}

const burgerItems = [ROUTES.statistics];

const Burger = ({ classes }: Props): JSX.Element => {
  const match = useRouteMatch<{ 0: string }>('/textbook/dictionary/(.+)/:group/:page');
  const [dictionary, setDictionary] = useState('textbook');

  useEffect(() => {
    if (match && match.params && match.params[0]) {
      setDictionary(match.params[0]);
    }
  }, [match]);

  const { group, page } = useAppParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const games = useAppSelector(selectAllGames);

  const gameMenu = games.map((game) => ({
    title: game.name,
    url: `${ROUTES.games.url}/${game.id}/${dictionary}/${group}/${page}`,
  }));

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
        {[...gameMenu, ...burgerItems].map(({ url, title }) => (
          <MenuItem key={title} onClick={handleClose}>
            <Link component={NavLink} to={url} underline="none">
              {title}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Burger);
