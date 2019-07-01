import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CardContent from '@material-ui/core/CardContent';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// ======================================


const useStyles = makeStyles(theme => ({
  // card: {
  //   display: 'flex',
  //   align: 'justify'
  // },
  // details: {
  //   display: 'flex',
  //   flexDirection: 'column',
  // },
  // content: {
  //   flex: '1 1 auto',
  // },
  cover: {
    width: 151,
  },
  // controls: {
  //   display: 'inline-flex',
  //   alignItems: 'center'
  // },
  playIcon: {
    height: 38,
    width: 38,
  },
  pauseIcon: {
    height: 38,
    width: 38
  }
})
);

export default function MediaControlCard(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (


    <div className={classes.details}>

      <Typography component="h5" variant="h5">
        {props.currentlyPlayingTrack}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {props.currentlyPlayingArtist}
      </Typography>

      <div className={classes.controls}>
        <div className='ui card' style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconButton aria-label="Previous" onClick={props.prevTrack}>
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>

          {
            props.trackPlaying ?
            <IconButton aria-label="Play/pause" onClick={props.pauseTrack}>
              <PauseIcon className={classes.pauseIcon} />
            </IconButton>

            :

            <IconButton aria-label="Play/pause" onClick={props.playTrack}>
              <PlayArrowIcon className={classes.playIcon} />
            </IconButton>
          }

          <IconButton aria-label="Next" onClick={props.nextTrack}>
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </div>
      </div>

    </div>

  );
}
