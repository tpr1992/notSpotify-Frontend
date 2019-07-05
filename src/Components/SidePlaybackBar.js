import React from 'react';
import { Fragment } from 'react';
import { Menu, Icon, Sidebar } from 'semantic-ui-react';
import MediaControlCard from './MediaControlCard';
// ======================================

class SidePlaybackBar extends React.Component {

  render () {
    return (
      <div class="playback-bar">
        <div class="ui left fixed inverted menu">
            {
              this.props.selectedTrack != "" ?
              <iframe src={this.props.selectedTrack} style={{marginTop: '25vh'}} width="250" height="500" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
              :
              <Fragment />
            }
            <i class="inverted angle right icon" style={{paddingTop: '50vh'}} onClick={this.props.showSidebar} size='large'/>
            <Sidebar />
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

// class SidePlaybackBar extends React.Component {
//   state = { visible: false }
//
//    handleHideClick = () => this.setState({ visible: false })
//    handleShowClick = () => this.setState({ visible: true })
//    handleSidebarHide = () => this.setState({ visible: false })
//
//    render() {
//      const { visible } = this.state
//
//      return (
//        <div>
//          <Button.Group>
//            <Button disabled={visible} onClick={this.handleShowClick}>
//              Show sidebar
//            </Button>
//            <Button disabled={!visible} onClick={this.handleHideClick}>
//              Hide sidebar
//            </Button>
//          </Button.Group>
//
//          <Sidebar.Pushable as={Segment}>
//            <Sidebar
//              as={Menu}
//              animation='overlay'
//              icon='labeled'
//              inverted
//              onHide={this.handleSidebarHide}
//              vertical
//              visible={visible}
//              width='thin'
//            >
//              <Menu.Item as='a'>
//                <Icon name='home' />
//                Home
//              </Menu.Item>
//              <Menu.Item as='a'>
//                <Icon name='gamepad' />
//                Games
//              </Menu.Item>
//              <Menu.Item as='a'>
//                <Icon name='camera' />
//                Channels
//              </Menu.Item>
//            </Sidebar>
//            <Sidebar.Pusher>
//   <Segment basic>
//     <Header as='h3'>Application Content</Header>
//     <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
//   </Segment>
// </Sidebar.Pusher>
// </Sidebar.Pushable>
// </div>
// )
// }
// }
//
// export default SidePlaybackBar;
