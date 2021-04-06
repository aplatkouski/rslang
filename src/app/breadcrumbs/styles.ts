import { createStyles, fade, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    root: {
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
