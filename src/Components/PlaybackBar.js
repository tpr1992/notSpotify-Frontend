import React from 'react'
import { Menu } from 'semantic-ui-react'
// ======================================

class PlaybackBar extends React.Component {

  render () {
    return (
      <div class="playback-bar">
      <div class="ui bottom fixed inverted menu">
        <div class="item">
          <img src={this.props.nowPlayingImage} />
        </div>
        <a class="item">{this.props.nowPlayingArtist}</a>
        <a class="item">{this.props.nowPlayingName}</a>
      </div>
    </div>
    )
  }
}

export default PlaybackBar;

// <i class="inverted play circle outline icon" size="large"></i>
