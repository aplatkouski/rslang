import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import * as React from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: theme.spacing(2),
      objectFit: 'fill',
      width: 'auto',
      '&:hover': {
        transform: 'scale(1.3)',
      },
    },
  })
);

export interface Props {
  alt: string;
  src: string;
  title: string;
}

const SvgImg = ({ alt, src, title }: Props): JSX.Element => {
  const classes = useStyles();

  return <img alt={alt} className={classes.root} src={src} title={title} />;
};

export default SvgImg;
