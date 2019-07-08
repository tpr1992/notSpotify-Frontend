import React from 'react';
import { Fragment } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import MediaControlCard from './MediaControlCard';
// ======================================

class SidePlaybackBarArrow extends React.Component {
  render () {
    return (
      <div class="playback-bar">
        <div class="ui left fixed inverted menu">
            <i class="inverted angle right icon" style={{paddingTop: '50vh'}} onClick={this.props.showSidebar} size='large'/>
        </div>
      </div>
    )
  }
}

export default SidePlaybackBarArrow;
