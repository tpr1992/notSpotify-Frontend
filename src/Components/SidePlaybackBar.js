import React from 'react';
import { Fragment } from 'react';
import { Menu } from 'semantic-ui-react';
import MediaControlCard from './MediaControlCard';
// ======================================

class SidePlaybackBar extends React.Component {

  render () {
    return (
      <div class="playback-bar">
        <div class="ui left fixed inverted menu">
            {
              this.props.selectedTrack != "" ?
              <iframe style={{marginTop: '25vh'}} src={this.props.selectedTrack} width="250" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              :
              <Fragment />
            }

        </div>
      </div>
    )
  }
}

export default SidePlaybackBar;


// return (
//   <div class="playback-bar">
//     <div class="ui left fixed inverted menu">
//       {
//         this.props.trackPlaying ?
//         <Fragment>
//           <div class="item">
//             <img src={this.props.nowPlayingImage} />
//           </div>
//           <a class="item">{this.props.nowPlayingArtist}</a>
//           <a class="item">{this.props.nowPlayingName}</a>
//         </Fragment>
//         :
//         <Fragment />
//       }
//       <div class='right item' style={{display: 'flex'}}>
//         {
//           this.props.selectedTrack != "" ?
//           <iframe src={this.props.selectedTrack} width="500" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
//           :
//           <Fragment />
//         }
//       </div>
//     </div>
//   </div>
// )
