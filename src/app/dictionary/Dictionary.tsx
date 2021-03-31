import React from 'react';
// import { NavLink } from 'react-router-dom';
import {
  Accordion,
  AccordionSummary,
  // AccordionDetails,
  // ListItemText,
  // Box,
  Typography,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import * as t from 'types';
import { getCurrUser } from 'features/user/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function Dictionary(): JSX.Element {
  const classes = useStyles();
  const currentUser: t.IUser = useSelector(getCurrUser);

  const handleGet = () => {
    if (!currentUser.token) {
      return;
    }
    const params = new URLSearchParams([
      ['page', '0'],
      ['group', '0'],
      ['wordsPerPage', '3'],
      ['filter', '{"userWord.optional.mode":"hard"}'],
    ]);

    const options = {
      method: 'GET',
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${currentUser.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
      },
    };

    const api = 'https://rs-lang-server.herokuapp.com';
    const CREATE_USER_WORDS_API = (userId: string) => {
      return `users/${userId}/aggregatedWords`;
    };
    fetch(`${api}/${CREATE_USER_WORDS_API(currentUser.userId)}?${params}`, options)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log(result);
        return 0;
      })
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Изучаемые слова</Typography>
          <button onClick={handleGet} type="button">
            click
          </button>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Сложные слова</Typography>
        </AccordionSummary>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1a-content"
          expandIcon={<ExpandMoreIcon />}
          id="panel1a-header"
        >
          <Typography className="sector-title">Удаленные слова</Typography>
        </AccordionSummary>
      </Accordion>
    </div>
  );
}
