import React from 'react';
import { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import SearchResults from '../Components/SearchResults';
import UserPlaylists from '../Components/UserPlaylists';
import FeaturedPlaylists from '../Components/FeaturedPlaylists';
import MediaControlCard from '../Components/MediaControlCard';

class MainContainer extends React.Component {

  state = {
    alignment: 'centered'
  }

  render () {
    return (
      <Grid centered style={{marginLeft: this.props.spacing}}>
        <Grid.Row columns={5}>
          {
            this.props.searchResults.length > 0 ?
            this.props.searchResults.map(result => {
              return <Grid.Column> {<SearchResults selectTrack={this.props.selectTrack} result={result} key={result.id} />} </Grid.Column>
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
