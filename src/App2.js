import './App.css';
import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js'
// =====================================
import MainContainer from './Containers/MainContainer'
import MediaControlCard from './Components/MediaControlCard'
import NowPlayingSwitch from './Components/NowPlayingSwitch'
import PlaybackBar from './Components/PlaybackBar'
// ======================================
import { Slider } from 'material-ui-slider';
import { Grid, Button, Form, Input } from 'semantic-ui-react'
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

  showPlaying = () => {
    console.log(this.state.nowPlayingChecked);
  }


  render() {
    console.log(this.state.searchResults)
    return (
      <div className="App">
      <a href='http://localhost:8888/'>
      <Button color='green'>
      Connect to Spotify
      </Button>
      </a>
      <br />
      <hr />
      <div>
      <div class="ui icon input">
      <Input icon='search' iconPosition='right' type='text' placeholder="Search Artists..." value={this.state.query} onChange={this.searchArtists} />
      </div>

      <hr />

      </div>
      {
        this.state.nowPlayingArtist.length > 0 && this.state.nowPlayingChecked === false ?
        <MediaControlCard nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage} />
        :
        ""
      }
      {
        this.state.nowPlayingChecked ?
        <Button inverted color='green' onClick={this.getNowPlaying}>What's Playing?</Button>
        :
        <Button color='green' onClick={this.getNowPlaying}>What's Playing?</Button>
      }
      <MainContainer searchResults={this.state.searchResults} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} nowPlayingImage={this.state.nowPlayingImage}  />
      <PlaybackBar nowPlayingImage={this.state.nowPlayingImage} nowPlayingArtist={this.state.nowPlayingArtist} nowPlayingName={this.state.nowPlayingName} />
      </div>
    );
  }
}


export default App2;
