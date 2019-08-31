import React from 'react';
import { Fragment } from 'react';
import MediaControlCard from './MediaControlCard';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';
// ======================================

class SidePlaybackBar extends React.Component {

  render () {
    return (

      <div class="playback-bar">
        <div class="ui left fixed overlay inverted menu">

          <iframe id='player-controls' src={ this.props.selectedTrack } style={{ display: this.props.displayStyle, boxShadow: '0px 2px 35px 1px #d4d4d5', marginTop: '15vh' }} width="250" height="800" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>

          <i class="inverted angle right icon" style={{ position: 'relative', zIndex: '1', marginTop: '50vh', cursor: 'pointer' }} onClick={ this.props.showSidebar } size='large'/>

          <Sidebar />
        </div>
      </div>

    )
  }
}

export default SidePlaybackBar;
