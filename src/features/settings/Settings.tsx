import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Menu,
  Tooltip,
} from '@material-ui/core';
import { WithStyles, withStyles } from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/Settings';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import React, { BaseSyntheticEvent } from 'react';
import { getCurrUser } from '../user/userSlice';

import { changeSettings, selectSettings } from './settingsSlice';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const Settings = ({ classes }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const user = useAppSelector(getCurrUser);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const checkboxSelector = (flag: boolean): JSX.Element => {
    if (!flag) {
      return (
        <Tooltip title="Авторизуйтесь, чтобы изменять параметр">
          <span>
            <Checkbox checked={false} disabled />
          </span>
        </Tooltip>
      );
    }
    return <Checkbox checked={buttons} name="buttons" onChange={handleChange} />;
  };
  const handleClick = (event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSettings({ ...settings, [event.target.name]: event.target.checked }));
  };
  const { translation, buttons } = settings;
  return (
    <>
      <Tooltip title="Настройки">
        <Button
          aria-controls="customized-menu"
          aria-haspopup="true"
          className={classes.button}
          color="primary"
          onClick={handleClick}
          variant="contained"
        >
          <SettingsIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        id="customized-menu"
        keepMounted
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <div className={classes.settings}>
          <FormControl component="fieldset">
            <FormLabel className={classes.label} component="legend">
              Выберите настройки:
            </FormLabel>
            <FormGroup>
              <FormControlLabel
                className={classes.controls}
                control={
                  <Checkbox
                    checked={translation}
                    name="translation"
                    onChange={handleChange}
                  />
                }
                label="Отображать перевод"
              />
              <FormControlLabel
                className={classes.controls}
                control={checkboxSelector(Boolean(user.token))}
                label="Отображать кнопки на карточке слова"
              />
            </FormGroup>
          </FormControl>
        </div>
      </Menu>
    </>
  );
};

export default withStyles(styles, { withTheme: true })(Settings);
