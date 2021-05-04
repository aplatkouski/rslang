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
import { getCurrUser } from 'features/user/userSlice';
import React, { BaseSyntheticEvent, useCallback } from 'react';
import { changeSettings, selectSettings } from './settingsSlice';
import styles from './styles';

type Props = WithStyles<typeof styles>;

const Settings = ({ classes }: Props): JSX.Element => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectSettings);
  const user = useAppSelector(getCurrUser);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeSettings({ ...settings, [event.target.name]: event.target.checked })
      );
    },
    [dispatch, settings]
  );

  const { isShowTranslations, isShowButtons } = settings;

  const checkboxSelector = useCallback((): JSX.Element => {
    if (!user) {
      return (
        <Tooltip title="Авторизуйтесь, чтобы изменять параметр">
          <span>
            <Checkbox checked={false} disabled />
          </span>
        </Tooltip>
      );
    }
    return (
      <Checkbox checked={isShowButtons} name="isShowButtons" onChange={handleChange} />
    );
  }, [handleChange, isShowButtons, user]);

  const handleClick = useCallback((event: BaseSyntheticEvent) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

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
                    checked={isShowTranslations}
                    name="isShowTranslations"
                    onChange={handleChange}
                  />
                }
                label="Отображать перевод"
              />
              <FormControlLabel
                className={classes.controls}
                control={checkboxSelector()}
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
