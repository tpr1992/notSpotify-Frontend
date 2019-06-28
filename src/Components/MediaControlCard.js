import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// ======================================


const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    align: 'justify'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Card className={classes.card}>
    <div className={classes.details}>
    <CardContent className={classes.content}>
    <Typography component="h5" variant="h5">
    {props.nowPlayingName}
    </Typography>
    <Typography variant="subtitle1" color="textSecondary">
    {props.nowPlayingArtist}
    </Typography>
    </CardContent>
    <div className={classes.controls}>
    <IconButton aria-label="Previous">
    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
    </IconButton>
    <IconButton aria-label="Play/pause">
    <PlayArrowIcon className={classes.playIcon} />
    </IconButton>
    <IconButton aria-label="Next">
    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
    </IconButton>
    </div>
    </div>
    <CardMedia
    style={{width: 212}}
    className={classes.cover}
    src={props.nowPlayingImage}
    image={props.nowPlayingImage}
    title={props.nowPlayingArtist}
    />
    </Card>
  );
}
