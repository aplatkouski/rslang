import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import clsx from 'clsx';
import { useGameLogo } from 'common/hooks';
import React from 'react';
import promotionCardStyles from './styles';

interface Props extends WithStyles<typeof promotionCardStyles> {
  content: string;
  img: string;
  isReverse?: boolean;
  title: string;
}

const PromotionCard = (props: Props): JSX.Element => {
  const { classes, content, img, isReverse = false, title } = props;
  const cover = useGameLogo(img);

  return (
    <Card className={clsx(classes.root, isReverse && classes.reverse)}>
      <CardContent className={classes.content}>
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Typography color="textSecondary" variant="subtitle1">
          {content}
        </Typography>
      </CardContent>
      <CardMedia className={classes.cover} image={cover} title={title} />
    </Card>
  );
};

export default withStyles(promotionCardStyles, { withTheme: true })(PromotionCard);
