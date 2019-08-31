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
import MediaControlCard from './Components/MediaControlCard';
import NowPlayingSwitch from './Components/NowPlayingSwitch';
import FeaturedPlaylists from './Components/FeaturedPlaylists';
import SidePlaybackBarArrow from './Components/SidePlaybackBarArrow';
// ======================================
import { Grid, Button, Form, Input, Segment, Menu } from 'semantic-ui-react';
// ======================================

//  Might delete, this is using older API
const spotifyWebApi = new Spotify()

class App2 extends Component {

  state = {
    // ======================
    //  Main state
    query: '',
    loading: true,
    loggedIn: null,
    showUser: false,
    currentUser: '',
    noResults: false,
    showSidebar: true,
    userPlaylists: [],
    searchResults: [],
    featuredPlaylists: [],
    artistSearchResults: [],
    nowPlayingChecked: false,
    showFeaturedPlaylists: false,
    // ======================
    //  Handle scaling for popout media player
    hrMargin: '10%',
    displayStyle: 'none',
    leftSpacing: '14rem',
    mainTitleMargin: '0%',
    windowAlignment: 'right',
    windowWidth: 'width: 100%',
    // ======================
    //  Media player
    track: '',
    selectedTrack: '',
    trackPlaying: false,
    userClickedOnTrack: 0,
    initialSongPlayed: false
  }

  componentDidMount() {
    this.hitOAuth()
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
        loggedIn: true,
        currentUser: data,
        showUser: !this.state.showUser
      })
    })
  }

  //  Opens top tracks of selected artist via artistSearch
  goToArtistPage = (artistUri) => {
    this.selectTrack(artistUri)
  }

  hitOAuth = () => {
    // fetch('http://localhost:3001/api/v2/oauth')
    // .then(res => res.json())
    // .then(data => {
    //   debugger
    // })
  }

  //  Run on componentDidMount, gets user's playlists
  getPlaylists = () => {
    fetch('http://localhost:3001/api/v2/get_playlists')
    .then(res => res.json())
    .then(data => {
      this.setState({
        query: '',
        searchResults: [],
        userPlaylists: data,
        artistSearchResults: []
      }, () => this.handleLoader())
    })
  }

  //  WIP - return to later
  browseFeaturedPlaylists = () => {
    fetch('http://localhost:3001/api/v2/browse_featured_playlists')
    .then(res => res.json())
    .then(data => {
      this.setState({
        searchResults: [],
        featuredPlaylists: data,
        showFeaturedPlaylists: !this.state.showFeaturedPlaylists
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

  //  Grab link from track info in api, change embeded player source to selected track. Function runs wheevern a track or playlist are clicked
  selectTrack = (link) => {
    this.setState({
      hrMargin: '32%',
      displayStyle: null,
      leftSpacing: '14rem',
      mainTitleMargin: '20%',
      windowAlignment: 'right',
      showSidebar: !this.state.showSidebar,
      selectedTrack: link.split('com').join('com/embed'),
      userClickedOnTrack: this.state.userClickedOnTrack + 1
    }, () => this.handleSidebar())
  }

  //  Make sure user cannot hide the sidebar before the player is rendered initially
  showSidebar = () => {
    if (this.state.userClickedOnTrack > 0) {
      this.setState({
        showSidebar: !this.state.showSidebar,
        hrMargin: this.state.showSidebar === true ? '10%' : '32%',
        displayStyle: this.state.showSidebar === true ? 'none' : null,
        leftSpacing: this.state.showSidebar === true ? '0rem' : '14rem',
        mainTitleMargin: this.state.showSidebar === true ? '0%' : '20%',
        windowAlignment: this.state.showSidebar === true ? 'center' : 'right'
      })
    }
  }

  //  If showSidebar is toggled to false (not showing) but the user clicks a new track, override the state and show the player
  handleSidebar = () => {
    if (this.state.showSidebar != true && this.state.selectedTrack.length > 0) {
      this.setState({
        hrMargin: '32%',
        showSidebar: true,
        displayStyle: null,
        leftSpacing: '14rem',
        mainTitleMargin: '20%',
        windowAlignment: 'right',
        windowWidth: 'width: 75%'
      })
    }
  }

  //  Handle scaling for sidebar and grid elements
  resizeWindow = () => {
    let newState;
    newState = this.state.showSidebar === true && this.state.userClickedOnTrack > 0 ? "width: 75%" : "width: 100%";
    this.setState({
      hrMargin: '10%',
      leftSpacing: '0rem',
      mainTitleMargin: '0%',
      windowWidth: newState,
      windowAlignment: 'center'
    })
  }

  //  Searching spotify db for tracks and artists, then sort into respective states
  searchTracks = (event) => {
    event.preventDefault()
    this.setState({
      loading: true,
      noResults: false,
      searchResults: [],
      userPlaylists: [],
      artistSearchResults: []
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
      if (results.length === 0) {
        this.setState({
          loading: false,
          noResults: true
        })
      }
      else {
        results.forEach(result => {
          if (result.type === 'artist' && result.images.length !== 0) {
            this.setState({
              noResults: false,
              artistSearchResults: [...this.state.artistSearchResults, result]
            }, () => this.setState({
              loading: false,
              userSearched: true
            }))
          }
          else if (result.type === 'track' && result.album.images.length !== 0) {
            this.setState({
              noResult: false,
              searchResults: [...this.state.searchResults, result]
            }, () => this.setState({
              loading: false,
              userSearched: true
            }))
          }
        })
      }
    })
  }


  render() {
    return (

      <div className='App' style={{ textAlign: 'center', marginLeft: this.state.spaceLeft }}>
        <div class='ui sticky'>
          <div class='main-title' style={{ marginLeft: this.state.mainTitleMargin }}>
            <span id='logo-header'>
              <h1 id='header-text'>notSpotify();<i class='spotify icon'/></h1>
            </span>
          </div>
        </div>

        <SpotifyAuth setUser={ this.setUser } />

        {
          this.state.loggedIn && this.state.showUser ?
          <UserCard currentUser={ this.state.currentUser[0] } />
          :
          null
        }

        <br />
        <hr style={{ marginLeft: this.state.hrMargin, marginRight: '10%' }} />

        <div id='custom-search-box' style={{ filter: 'drop-shadow(0px 11px 32px #d4d4d5)', marginLeft: this.state.mainTitleMargin }}>
          <div class='box box2' style={{ filter: 'drop-shadow(0px 11px 35px #d4d4d5)' }}>
            <div class='evenboxinner'>
              <form onSubmit={ this.searchTracks } >
                <Input icon='inverted search' type='text' id='custom-search' value={ this.state.query } placeholder='Search...' onChange={ this.captureSearch } style={{ zIndex: '1', cursor: 'pointer' }} />
              </form>
            </div>
          </div>

          <Button color='green' onClick={ this.searchTracks }>Submit</Button>
          <Button color='green' onClick={ this.getPlaylists }>My playlists</Button>
          <Button color='green' onClick={ this.browseFeaturedPlaylists } style={{ display: 'none' }}>Featured playlists</Button>

        </div>

        <hr style={{ marginTop: '1rem', marginLeft: this.state.hrMargin, marginRight: '10%' }} />

        {
          this.state.loading ?
          <div style={{ marginTop: 40, marginRight: 10, padding: 15, filter: 'drop-shadow(0px 11px 35px #d4d4d5)' }} class="ui active inline loader"></div>
          :
          null
        }

        {
          this.state.showFeaturedPlaylists && this.state.featuredPlaylists.length > 0 ?
          <FeaturedPlaylists playlists={ this.state.featuredPlaylists } selectTrack={ this.selectTrack } />
          :
          null
        }

        <MainContainer loading={ this.state.loading } noResults={ this.state.noResults } goToArtistPage={ this.goToArtistPage } spacing={ this.state.leftSpacing } windowWidth={ this.state.windowWidth } windowAlignment={ this.state.windowAlignment } showSidebar={ this.state.showSidebar } userClickedOnTrack={ this.state.userClickedOnTrack } userPlaylists={ this.state.userPlaylists } selectTrack={ this.selectTrack } showFeaturedPlaylists={ this.state.showFeaturedPlaylists } featuredPlaylists={ this.state.featuredPlaylists } artistSearchResults={ this.state.artistSearchResults } searchResults={ this.state.searchResults } />

        <SidePlaybackBar displayStyle={ this.state.displayStyle } currentUser={ this.state.currentUser[0] } showSidebar={ this.showSidebar } handleLoader={ this.handleLoader } selectedTrack={ this.state.selectedTrack } trackPlaying={ this.state.trackPlaying } />

      </div>
      
    )
  }
}

export default App2;
