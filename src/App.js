import React, { Component } from 'react';
import './App.css';
import Spotify from 'spotify-web-api-js'
// ======================================
import MediaControlCard from './Components/MediaControlCard'
import NowPlayingSwitch from './Components/NowPlayingSwitch'
import MainContainer from './Containers/MainContainer'
//=======================================
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Divider from '@material-ui/core/Divider';
import Switch from '@material-ui/core/Switch';
import { Slider } from 'material-ui-slider';
// ======================================
import { Grid, Button, Form } from 'semantic-ui-react'
// ======================================


const spotifyWebApi = new Spotify()

class App extends Component {

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
      nowPlayingChecked: false
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
        nowPlayingAlbumName: res.item.album.name
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

  showPlaying = () => {
    console.log(this.state.nowPlayingChecked);
  }

  render() {
    console.log(this.state.searchResults)
    return (
      <div className="App">
        <Button variant="contained" href='http://localhost:8888'>
          Connect to Spotify
        </Button>
        <br />
        <hr />
        <div>
          <InputBase id="outlined-name" variant="outlined" type='text' placeholder="Search Artists..." value={this.state.query} onChange={this.searchArtists} />
          <IconButton aria-label="Search" onClick={this.railsFetch}>
            <SearchIcon />
          </IconButton>
          <hr />
          <NowPlayingSwitch onClick={this.showPlaying} nowPlayingChecked={this.state.nowPlayingChecked} />
        </div>
        {
          this.state.nowPlayingArtist.length > 0 ?
          <MediaControlCard nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage} />
          :
          ""
        }
        <button onClick={this.getNowPlaying}>Check Now Playing</button>
        <button onClick={this.railsFetch}>Fetch Rails</button>
        <MainContainer searchResults={this.state.searchResults} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage}  />

      </div>
    );
  }
}

export default App;

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
