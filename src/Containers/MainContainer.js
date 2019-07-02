import React from 'react';
import { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import SearchResults from '../Components/SearchResults';
import UserPlaylists from '../Components/UserPlaylists';
import MediaControlCard from '../Components/MediaControlCard';

class MainContainer extends React.Component {

  render () {
    return (
      <Grid centered>
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
        </Grid.Row>
      </Grid>
    )
  }
}

export default MainContainer;
