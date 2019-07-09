import './App.css';
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
// =====================================
import UserCard from './Components/UserCard';
import PlaybackBar from './Components/PlaybackBar';
import MusicControls from './Components/MusicControls';
import MainContainer from './Containers/MainContainer';
import MediaControlCard from './Components/MediaControlCard';
import NowPlayingSwitch from './Components/NowPlayingSwitch';
// ======================================
import { Grid, Button, Form, Input, Segment, Menu } from 'semantic-ui-react';
// ======================================

//  Might delete, this is using older API
const spotifyWebApi = new Spotify()

class App2 extends Component {

  constructor() {
    super()
    // const params = this.getHashParams()
    this.state = {
      // loggedIn: params.access_token ? true : false,
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
    // if (params.access_token) {
    //   spotifyWebApi.setAccessToken(params.access_token)
    // }
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
        loggedIn: true
      })
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
  selectTrack = (link) => {
    this.setState({
      selectedTrack: link.split('com').join('com/embed')
    })
  }

  //  Searching spotify db for ONLY tracks
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
        <Button color='green' href="https://accounts.spotify.com/authorize?client_id=d8f04e0940df408a9779e2e17192ec02&redirect_uri=http%3A%2F%2Flocalhost%3A3001%2Fapi%2Fv2%2Foauth&response_type=code&scope=user-read-email+user-read-birthdate+user-read-private+user-read-currently-playing+playlist-modify-public+playlist-read-private+playlist-modify-private+user-library-read+user-read-playback-state+user-library-modify+user-modify-playback-state+user-follow-read+streaming" onClick={this.setUser}>
          Connect to Spotify
        </Button>
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


// =======================================================



// searchArtists = (event) => {
//   this.setState({
//     query: event.target.value
//   }, () => this.railsFetch())
// }
//
// handleClick = () => {
//   this.search()
// }
//
// getNowPlaying = () => {
//   spotifyWebApi.getMyCurrentPlaybackState()
//   .then(res => {
//     this.setState({
//       nowPlayingName: res.item.name,
//       nowPlayingArtist: res.item.artists[0].name,
//       nowPlayingImage: res.item.album.images[0].url,
//       nowPlayingAlbumReleaseYear: res.item.album.release_date.slice(0, 4),
//       nowPlayingAlbumName: res.item.album.name,
//       nowPlayingChecked: !this.state.nowPlayingChecked
//     })
//   })
// }
//
// getHashParams() {
//   var hashParams = {};
//   var e, r = /([^&;=]+)=?([^&;]*)/g,
//   q = window.location.hash.substring(1);
//   while ( e = r.exec(q)) {
//     hashParams[e[1]] = decodeURIComponent(e[2]);
//   }
//   return hashParams;
// }
//
// railsFetch = () => {
//   fetch(`http://localhost:3001/api/v2/tracks/search?q=${this.state.query}`)
//   .then(res => res.json())
//   .then(data => {
//     this.setState({
//       searchResults: data
//     })
//   })
// }


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


  //  ** Custom controls - Play song
  // playTrack = () => {
  //   fetch('http://localhost:3001/api/v2/tracks/play_track')
  //   .then(this.setState({
  //     trackPlaying: true,
  //     initialSongPlayed: true
  //   }, () => this.getCurrentlyPlayingInfo())
  // )}
  //
  // //  **Custom controls - Pause song
  // pauseTrack = () => {
  //   fetch('http://localhost:3001/api/v2/tracks/pause_track')
  //   .then(this.setState({
  //     trackPlaying: false
  //   })
  // )}
  //
  // //  **Custom controls - Next song
  // nextTrack = () => {
  //   fetch('http://localhost:3001/api/v2/tracks/next_track')
  //   .then(this.getCurrentlyPlayingInfo)
  // }
  //
  // //  **Custom controls - Previous song
  // prevTrack = () => {
  //   fetch('http://localhost:3001/api/v2/tracks/prev_track')
  //   .then(this.getCurrentlyPlayingInfo)
  // }
