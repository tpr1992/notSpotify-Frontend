import React from 'react'
import { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';


const ArtistSearchResults = (props) => {
  // debugger
  console.log(props.artistSearchResults);
  console.log(props.artistSearchResults[0].images.length);
  return (
    <Fragment>
      {
        props.artistSearchResults[0].images.length > 0 ?

        <div class="ui card" onClick={() => props.selectTrack(props.result.external_urls.spotify)} style={{backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', height: '335px'}}>
          <div class="image">
            <img src={props.result.images[0].url || props.result.images[1].url} style={{height: '201px', borderRadius: '100px'}} />
          </div>
          <div class="content">
            <div class="search-result-header">{props.result.name}</div>
            <div class="meta">
              <span style={{color: 'white'}}>
                {props.result.followers.total} Followers
              </span>
            </div>
          </div>
        </div>
        :
        <Fragment />
      }
    </Fragment>
  )
}

export default ArtistSearchResults;
