import React from 'react';
import { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import SearchResults from '../Components/SearchResults';
import UserPlaylists from '../Components/UserPlaylists';
import MediaControlCard from '../Components/MediaControlCard';
import FeaturedPlaylists from '../Components/FeaturedPlaylists';
import ArtistSearchResults from '../Components/ArtistSearchResults';

class MainContainer extends React.Component {

  state = {
    alignment: 'centered'
  }

  render () {
    console.log(this.props.spacing);
    return (
      <Grid centered style={{marginLeft: this.props.spacing}}>
        <Grid.Row columns={ this.props.spacing === '0rem' ? 6 : 5 } >
          {
            this.props.artistSearchResults.length > 0 ?
            this.props.artistSearchResults.map(result => {
              return <Grid.Column> {<ArtistSearchResults artistSearchResults={this.props.artistSearchResults} selectTrack={this.props.selectTrack} result={result} key={result.id} showSidebar={this.props.showSidebar} userClickedOnTrack={this.props.userClickedOnTrack} />}</Grid.Column>
            })
            :
            <Fragment />
          }
          {
            this.props.searchResults.length > 0 ?
            this.props.searchResults.map(result => {
              return <Grid.Column> {<SearchResults goToArtistPage={this.props.goToArtistPage} selectTrack={this.props.selectTrack} result={result} key={result.id} />} </Grid.Column>
            })
            :
            this.props.userPlaylists.map(playlist => {
              return <Grid.Column> {<UserPlaylists selectTrack={this.props.selectTrack} playlist={playlist} key={playlist.id} />} </Grid.Column>
            })
          }
          {
            this.props.showFeaturedPlaylists === true ?
            this.props.featuredPlaylists.map(playlist => {
              return <Grid.Column> {<FeaturedPlaylists selectTrack={this.props.selectTrack} playlist={playlist} key={playlist.id} />} </Grid.Column>
            })
            :
            null
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default MainContainer;
