import { WithStyles, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useGameLogo } from '../../../common/hooks';
import promotionCardStyles from './promotion-card-styles';

interface Props extends WithStyles<typeof promotionCardStyles> {
  content: string;
  img: string;
  // eslint-disable-next-line react/require-default-props
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
