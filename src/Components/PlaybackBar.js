import React from 'react';
import { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import MediaControlCard from './MediaControlCard';
// ======================================

class PlaybackBar extends React.Component {

  state = {
    showBottom: false
  }

  render () {
    return (
      <div class="playback-bar">
        <div class="ui bottom fixed inverted menu">
          <div class='right item' style={{ display: 'flex', height: '.5vh' }}>
            {
              this.props.selectedTrack != "" ?
              <iframe src={this.props.selectedTrack} width="500" height="100" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              :
              <Fragment />
            }
          </div>
          <div class='right item'>
            notSpotify()
          </div>
          <i class="inverted angle up icon" style={{ display: 'none', paddingTop: '0vh' }} onClick={this.props.showBottom} size='large'/>
          <a class='right item' href='https://github.com/tpr1992/Mod-5-Project-Frontend/tree/v3' icon='inverted github icon'>Github
            <i class="inverted github icon" />
          </a>
        </div>
      </div>
    )
  }
}

export default PlaybackBar;
