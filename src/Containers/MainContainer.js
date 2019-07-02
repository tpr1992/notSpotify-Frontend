import React from 'react';
import { Grid } from 'semantic-ui-react';
import StackGrid from 'react-stack-grid';
import SearchResults from '../Components/SearchResults';
import MediaControlCard from '../Components/MediaControlCard';

class MainContainer extends React.Component {

  render () {
    console.log(this.props)
    return (
      <Grid centered>
        <Grid.Row columns={5}>
          {
            this.props.searchResults ?
            this.props.searchResults.map(result => {
              return  <Grid.Column> {<SearchResults selectTrack={this.props.selectTrack} result={result} key={result.id} />} </Grid.Column>
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
