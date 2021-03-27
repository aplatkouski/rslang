import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from '@material-ui/core';
import React from 'react';

export const Settings = (): JSX.Element => {
  const [settings, setSettings] = React.useState({
    translation: true,
    buttons: true,
  });
  const handleChange = (event: any) => {
    setSettings({ ...settings, [event.target.name]: event.target.checked });
  };
  const { translation, buttons } = settings;
  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">Settings</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={translation}
                name="translation"
                onChange={handleChange}
              />
            }
            label="Translation"
          />
          <FormControlLabel
            control={
              <Checkbox checked={buttons} name="buttons" onChange={handleChange} />
            }
            label="Buttons"
          />
        </FormGroup>
      </FormControl>
    </div>
  );
};
