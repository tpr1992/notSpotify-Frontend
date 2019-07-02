import React from 'react'
import SearchResults from '../Components/SearchResults'
import MediaControlCard from '../Components/MediaControlCard'
import StackGrid from "react-stack-grid";
import { Grid } from 'semantic-ui-react'

class MainContainer extends React.Component {

  mapSearchResults = () => {
    console.log('Search Results', this.props.searchResults.length);
    if (this.props.searchResults.length > 0) {
      this.props.searchResults.map(artist => {
        return <SearchResults key={artist} artist={artist} />
      })
    }
  }
  render () {
    console.log(this.props)
    return (
      <Grid centered>
        <Grid.Row columns={5}>
          {
            this.props.searchResults ?
            this.props.searchResults.map(result => {
              return  <Grid.Column onClick={() => this.props.selectTrack(result.external_urls.spotify)}> {<SearchResults result={result} key={result.id} />} </Grid.Column>
            })
            :
            ""
          }
        </Grid.Row>
      </Grid>
    )
  }
}

export default MainContainer;
