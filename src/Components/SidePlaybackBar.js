import React from 'react';
import { Fragment } from 'react';
import MediaControlCard from './MediaControlCard';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';
// ======================================

class SidePlaybackBar extends React.Component {

  render () {
    console.log(this.props.currentUser);
    return (
      <div class="playback-bar">
        <div class="ui left fixed overlay inverted menu">
          {
            this.props.selectedTrack != "" ?
            <Fragment>
              <iframe src={this.props.selectedTrack} style={{ marginTop: '30vh' }} width="250" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
            </Fragment>
            :
            <Fragment />
          }
          <i class="inverted angle right icon" style={{ position: 'relative', zIndex: '1', marginTop: '50vh', cursor: 'pointer' }} onClick={this.props.showSidebar} size='large'/>
          <Sidebar />
        </div>
      </div>
    )
  }
}

export default SidePlaybackBar;
