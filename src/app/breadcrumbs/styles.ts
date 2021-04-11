import { createStyles, fade, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      [theme.breakpoints.down('sm')]: {
        width: theme.spacing(60),
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        width: theme.spacing(45),
      },
      '& li[class=MuiBreadcrumbs-separator]': {
        marginLeft: theme.spacing(0.25),
        marginRight: theme.spacing(0.25),
        color: fade(theme.palette.text.primary, 0.2),
      },
    },
    link: {
      padding: theme.spacing(0.5),
      color: fade(theme.palette.text.primary, 0.5),
    },
    lastLink: {
      paddingLeft: theme.spacing(0.5),
      color: theme.palette.text.primary,
    },
  });

export default styles;
