import { createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    sectorTitle: {
      fontSize: theme.typography.pxToRem(17),
      fontWeight: theme.typography.fontWeightBold,
    },
  });

export default styles;
