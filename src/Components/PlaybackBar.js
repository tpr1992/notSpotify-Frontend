import React from 'react';
import { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import MediaControlCard from './MediaControlCard';
// ======================================

class PlaybackBar extends React.Component {

  render () {
    return (
      <div class="playback-bar">
        <div class="ui bottom fixed inverted menu">
          {
            this.props.trackPlaying ?
            <Fragment>
              <div class="item">
                <img src={this.props.nowPlayingImage} />
              </div>
              <a class="item">{this.props.nowPlayingArtist}</a>
              <a class="item">{this.props.nowPlayingName}</a>
            </Fragment>
            :
            <Fragment />
          }
          <div class='right item' style={{display: 'flex'}}>
            {
              this.props.selectedTrack != "" ?
              <iframe src={this.props.selectedTrack} width="500" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              :
              <Fragment />
            }
          </div>
          <a class='right item' href='https://github.com/tpr1992' icon='inverted github icon'>Github
            <i class="inverted github icon" />
          </a>
        </div>
      </div>
    )
  }
}

export default PlaybackBar;
