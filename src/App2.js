import './App.css';
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
// =====================================
import UserCard from './Components/UserCard';
import PlaybackBar from './Components/PlaybackBar';
import SpotifyAuth from './Components/SpotifyAuth';
import MusicControls from './Components/MusicControls';
import MainContainer from './Containers/MainContainer';
import SidePlaybackBar from './Components/SidePlaybackBar';
import SidePlaybackBarArrow from './Components/SidePlaybackBarArrow';
import MediaControlCard from './Components/MediaControlCard';
import NowPlayingSwitch from './Components/NowPlayingSwitch';
// ======================================
import { Grid, Button, Form, Input, Segment, Menu } from 'semantic-ui-react';
// ======================================

//  Might delete, this is using older API
const spotifyWebApi = new Spotify()

class App2 extends Component {

  state = {
    //  Might delete, these were for old API
    nowPlayingName: '',
    nowPlayingArtist: '',
    nowPlayingImage: '',
    nowPlayingAlbumReleaseYear: '',
    nowPlayingAlbumName: '',
    artist: [],
    searchResults: [],
    query: '',
    nowPlayingChecked: false,
    loading: true,
    loggedIn: null,
    showUser: false,
    userPlaylists: [],
    showSidebar: true,
    //  Counter for checking if a track has been played during a session yet. Use for sidebar logic.
    userClickedOnTrack: 0,

    windowWidth: 'width: 100%',
    windowAlignment: 'right',
    leftSpacing: '14rem',
    mainTitleMargin: '0%',
    hrMargin: '10%',
    // isWindowScaled: false,
    currentUser: '',
    trackPlaying: false,
    initialSongPlayed: false,
    track: '',
    selectedTrack: ''
  }

  componentDidMount() {
    // setTimeout(this.handleLoader, 1500)
    this.getPlaylists()
    this.resizeWindow()
  }

  //  Invoke whenever a fetch completes
  handleLoader = () => {
    this.setState({
      loading: false
    })
  }

  // Get search input
  captureSearch = (event) => {
    this.setState({
      query: event.target.value
    })
  }

  //  Set user, fetching from spotify auth to set values
  setUser = () => {
    fetch('http://localhost:3001/api/v2/users')
    .then(res => res.json())
    .then(data => {
      this.setState({
        currentUser: data,
        loggedIn: true,
        showUser: !this.state.showUser
      })
    })
  }

  getPlaylists = () => {
    fetch('http://localhost:3001/api/v2/get_playlists')
    .then(res => res.json())
    .then(data => {
      this.setState({
        userPlaylists: data,
        searchResults: []
      }, () => this.handleLoader())
    })
  }

  //  Setting currently playing in playback bar and in custom controls
  getCurrentlyPlayingInfo = () => {
    fetch('http://localhost:3001/api/v2/tracks/get_currently_playing')
    .then(res => res.json())
    .then(data => {
      this.setState({
        track: data
      })
    })
  }

  //  ** Custom controls - Play song
  playTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/play_track')
    .then(this.setState({
      trackPlaying: true,
      initialSongPlayed: true
    }, () => this.getCurrentlyPlayingInfo())
  )}

  //  **Custom controls - Pause song
  pauseTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/pause_track')
    .then(this.setState({
      trackPlaying: false
    })
  )}

  //  **Custom controls - Next song
  nextTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/next_track')
    .then(this.getCurrentlyPlayingInfo)
  }

  //  **Custom controls - Previous song
  prevTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/prev_track')
    .then(this.getCurrentlyPlayingInfo)
  }


  //  Grab link from track info in api, change embeded player source to selected track
  //  This runs when a track or playlist are clicked
  selectTrack = (link) => {
    this.setState({
      selectedTrack: link.split('com').join('com/embed'),
      userClickedOnTrack: this.state.userClickedOnTrack + 1,
      showSidebar: !this.state.showSidebar,
      windowAlignment: 'right',
      leftSpacing: '14rem',
      mainTitleMargin: '20%',
      hrMargin: '32%'
    }, () => this.handleSidebar())
  }

  //  Make sure user cannot hide the sidebar before the player is rendered initially

  showSidebar = () => {
    if (this.state.userClickedOnTrack > 0) {
      this.setState({
        showSidebar: !this.state.showSidebar,
        windowAlignment: this.state.showSidebar === true ? 'center' : 'right',
        leftSpacing: this.state.showSidebar === true ? '0rem' : '14rem',
        mainTitleMargin: this.state.showSidebar === true ? '0%' : '20%',
        hrMargin: this.state.showSidebar === true ? '10%' : '32%'
      })
    }
  }

  //  If showSidebar is toggled to false (not showing) but the user clicks a new track, override the state and show the player
  handleSidebar = () => {
    console.log('hello');
    if (this.state.showSidebar != true && this.state.selectedTrack.length > 0) {
      this.setState({
        showSidebar: true,
        windowAlignment: 'right',
        windowWidth: '75%',
        leftSpacing: '14rem',
        mainTitleMargin: '20%',
        hrMargin: '32%'
      })
    }
  }

  resizeWindow = () => {
    let newState;
    newState = this.state.showSidebar === true && this.state.userClickedOnTrack > 0 ? "75%" : "100%";
    this.setState({
      windowWidth: newState,
      windowAlignment: 'center',
      leftSpacing: '0rem',
      mainTitleMargin: '0%',
      hrMargin: '10%'
    })
  }

  //  Searching spotify db for ONLY tracks
  searchTracks = (event) => {
    event.preventDefault()
    this.setState({
      loading: true
    })
    fetch('http://localhost:3001/api/v2/search_tracks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: this.state.query
      })
    })
    .then(res => res.json())
    .then(results => {
      this.setState({
        searchResults: results
      }, () => this.setState({
        loading: false
      }))
    })
  }

  render() {
    console.log(this.state)
    return (


      <div className='App' style={{textAlign: 'center', marginLeft: this.state.spaceLeft}}>

        <div class='main-title' style={{marginLeft: this.state.mainTitleMargin}}>
          <span id='logo-header'>
            <h1 id='header-text'>notSpotify();<i class='spotify icon'/></h1>
          </span>
        </div>
        <SpotifyAuth setUser={this.setUser} />
        {
          this.state.loggedIn && this.state.showUser ?
          <UserCard currentUser={this.state.currentUser[0]} />
          :
          null
        }
        <br />
        <hr style={{marginLeft: this.state.hrMargin, marginRight: '10%'}} />

        <div id='custom-search-box' style={{marginLeft: this.state.mainTitleMargin}}>
          <div class='box box2'>
            <div class='evenboxinner'>
              <form onSubmit={this.searchTracks} >
                <Input icon='search' type='text' id='custom-search' value={this.state.query} placeholder='Search...' onChange={this.captureSearch} />
              </form>
            </div>
          </div>

          <Button color='green' onClick={this.searchTracks}>Submit</Button>
          <Button color='green' onClick={this.getPlaylists}>My playlists</Button>
        </div>
        <hr style={{marginTop: '1rem', marginLeft: this.state.hrMargin, marginRight: '10%'}} />
        {
          this.state.loading ?
          <div style={{marginTop: 40, marginRight: 10, padding: 15}} class="ui active inline loader"></div>
          :
          null
        }
        <MainContainer spacing={this.state.leftSpacing} windowWidth={this.state.windowWidth} windowAlignment={this.state.windowAlignment} userPlaylists={this.state.userPlaylists} selectTrack={this.selectTrack} searchResults={this.state.searchResults} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage}  />
        {
          this.state.showSidebar ?
          <SidePlaybackBar animation='overlay' showSidebar={this.showSidebar} handleLoader={this.handleLoader} selectedTrack={this.state.selectedTrack} nowPlayingImage={this.state.track.image} nowPlayingArtist={this.state.track.artist} nowPlayingName={this.state.track.name} trackPlaying={this.state.trackPlaying} />
          :
          <SidePlaybackBarArrow showSidebar={this.showSidebar} />
        }



      </div>
    )
  }
}

export default App2;
