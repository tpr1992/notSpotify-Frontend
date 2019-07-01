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
import { Slider } from 'material-ui-slider';
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
      track: ''
    }
    if (params.access_token) {
      spotifyWebApi.setAccessToken(params.access_token)
    }
  }

  searchArtists = (event) => {
    this.setState({
      query: event.target.value
    }, () => this.railsFetch())
  }

  handleClick = () => {
    this.search()
  }

  getNowPlaying = () => {
    spotifyWebApi.getMyCurrentPlaybackState()
    .then(res => {
      this.setState({
        nowPlayingName: res.item.name,
        nowPlayingArtist: res.item.artists[0].name,
        nowPlayingImage: res.item.album.images[0].url,
        nowPlayingAlbumReleaseYear: res.item.album.release_date.slice(0, 4),
        nowPlayingAlbumName: res.item.album.name,
        nowPlayingChecked: !this.state.nowPlayingChecked
      })
    })
  }

  getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
    while ( e = r.exec(q)) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }

  railsFetch = () => {
    fetch(`http://localhost:3001/api/v2/tracks/search?q=${this.state.query}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        searchResults: data
      })
    })
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
          <h1 id='header-text'>notSpotify();</h1>
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
              <input type="text" id="custom-search" value={this.state.query} placeholder="Search..." onChange={this.captureSearch} />
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
        <MainContainer searchResults={this.state.searchResults} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage}  />
        <PlaybackBar nowPlayingImage={this.state.track.image} nowPlayingArtist={this.state.track.artist} nowPlayingName={this.state.track.name} />
      </div>
    );
  }
}


export default App2;


// <div class="ui icon input">
// <Input icon='search' iconPosition='right' type='text' placeholder="Search Artists..." value={this.state.query} onChange={this.searchArtists} />
// </div>
//


// {
//   this.state.trackPlaying ?
//   <Button color='inverted green' onClick={this.pauseTrack}>Pause Track</Button>
//   :
//   <Button color='inverted green' onClick={this.playTrack}>Play Track</Button>
// }


// <Grid textAlign='center' columns={2}>
//   <Grid.Row>
//     <Grid.Column>
//       <Button color='green' href="https://accounts.spotify.com/authorize?client_id=d8f04e0940df408a9779e2e17192ec02&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fv2%2Foauth&response_type=code&scope=user-read-email+user-read-birthdate+user-read-private+user-read-currently-playing+playlist-modify-public+playlist-read-private+playlist-modify-private+user-library-read+user-read-playback-state+user-library-modify+user-modify-playback-state+user-follow-read+streaming" onClick={this.setUser}>
//         Connect to Spotify
//       </Button>
//     </Grid.Column>
//     <Grid.Column>
//       {
//         this.state.loggedIn ?
//         <UserCard currentUser={this.state.currentUser[0]} />
//         :
//         ""
//       }
//
//     </Grid.Column>
//   </Grid.Row>
// </Grid>
//
