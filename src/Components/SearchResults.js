import React from 'react';
import { Grid } from 'semantic-ui-react';
// ======================================

const searchResults = (props) => {
  console.log(props);
  return (
    <div class="ui card" onClick={() => props.selectTrack(props.result.external_urls.spotify)} style={{backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', opacity: 1}}>
      <div class="image"><img src={props.result.album.images[0].url} /></div>
      <div class="content">
        <div class="search-result-header">{props.result.artists[0].name}</div>
        <div class="track">{props.result.name}</div>
      </div>
    </div>
  )
}

export default searchResults;
