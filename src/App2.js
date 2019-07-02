import './App.css';
import React, { Component } from 'react'
import Spotify from 'spotify-web-api-js'
// =====================================
import UserCard from './Components/UserCard'
import PlaybackBar from './Components/PlaybackBar'
import MusicControls from './Components/MusicControls'
import MainContainer from './Containers/MainContainer'
import MediaControlCard from './Components/MediaControlCard'
import NowPlayingSwitch from './Components/NowPlayingSwitch'
// ======================================
import { Grid, Button, Form, Input, Segment, Menu } from 'semantic-ui-react'
// ======================================


const spotifyWebApi = new Spotify()

class App2 extends Component {

  constructor() {
    super()
    const params = this.getHashParams()
    this.state = {
      loggedIn: params.access_token ? true : false,
      nowPlayingName: '',
      nowPlayingArtist: '',
      nowPlayingImage: '',
      nowPlayingAlbumReleaseYear: '',
      nowPlayingAlbumName: '',
      artist: [],
      searchResults: [],
      query: '',
      nowPlayingChecked: false,

      currentUser: '',
      trackPlaying: false,
      initialSongPlayed: false,
      track: '',
      selectedTrack: ''
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  captureSearch = (event) => {
    this.setState({
      query: event.target.value
    }, () => console.log(this.state.query))
  }

  setUser = () => {
    console.log('Setting user');
    fetch('http://localhost:3001/api/v2/users')
    .then(res => res.json())
    .then(data => {
      this.setState({
        currentUser: data,
        loggedIn: true
      })
    })
  }

  getCurrentlyPlayingInfo = () => {
    console.log('now playing:');
    fetch('http://localhost:3001/api/v2/tracks/get_currently_playing')
    .then(res => res.json())
    .then(data => {
      this.setState({
        track: data
      })
    })
  }

  playTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/play_track')
    .then(this.setState({
      trackPlaying: true,
      initialSongPlayed: true
    }, () => this.getCurrentlyPlayingInfo())
  )}

  pauseTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/pause_track')
    .then(this.setState({
      trackPlaying: false
    })
  )}

  nextTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/next_track')
    .then(this.getCurrentlyPlayingInfo)
  }

  prevTrack = () => {
    fetch('http://localhost:3001/api/v2/tracks/prev_track')
    .then(this.getCurrentlyPlayingInfo)
  }

  selectTrack = (link) => {
    this.setState({
      selectedTrack: link.split('com').join('com/embed')
    })
  }

  searchTracks = () => {
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
      })
    })
  }

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <span id="logo-header">
          <h1 id='header-text'>notSpotify();<i class="spotify icon"/></h1>
        </span>

        CONNECT TO SPOTIFY BUTTON GOES HERE
        {
          this.state.loggedIn ?
          <UserCard currentUser={this.state.currentUser[0]} />
          :
          ""
        }
        <br />
        <hr />
        <div>
          <div class="box box2">
            <div class="evenboxinner">
              <Input icon='search' type="text" id="custom-search" value={this.state.query} placeholder="Search..." onChange={this.captureSearch} />
            </div>
          </div>
          <Button color='green' onClick={this.searchTracks}>Click me</Button>
          <hr />
        </div>
        {
          this.state.nowPlayingArtist.length > 0 && this.state.nowPlayingChecked === false ?
          <MediaControlCard nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage} />
          :
          ""
        }
        <MediaControlCard currentlyPlayingArtist={this.state.track.artist} currentlyPlayingTrack={this.state.track.name} currentlyPlayingImage={this.state.track.image} trackPlaying={this.state.trackPlaying} playTrack={this.playTrack} pauseTrack={this.pauseTrack} nextTrack={this.nextTrack} prevTrack={this.prevTrack} />
        <MainContainer selectTrack={this.selectTrack} searchResults={this.state.searchResults} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage}  />
        <PlaybackBar selectedTrack={this.state.selectedTrack} nowPlayingImage={this.state.track.image} nowPlayingArtist={this.state.track.artist} nowPlayingName={this.state.track.name} trackPlaying={this.state.trackPlaying} />
      </div>
    );
  }
}


export default App2;
