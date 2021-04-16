import { Link, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuListItem } from '../types';
import styles from './styles';

interface Props extends WithStyles<typeof styles> {
  listItems: Array<MenuListItem>;
}

const SideMenuList = ({ listItems, classes }: Props): JSX.Element => (
  <List>
    {listItems.map((menuItem) => (
      <Link key={menuItem.title} component={NavLink} to={menuItem.url} underline="none">
        <ListItem button>
          <ListItemIcon>{menuItem.icon}</ListItemIcon>
          <ListItemText className={classes.menuTitle} primary={menuItem.title} />
        </ListItem>
      </Link>
    ))}
  </List>
);

export default withStyles(styles, { withTheme: true })(memo(SideMenuList));
