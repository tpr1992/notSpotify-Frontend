import React from 'react';
import { Fragment } from 'react';
import { Card } from 'semantic-ui-react';
// ======================================

const searchResults = (props) => {
  return (
    <Fragment>
      {
        props.result.album.images.length !== 0 || props.result.album.images === undefined ?
        <div class="ui card" onClick={() => props.selectTrack(props.result.external_urls.spotify)} style={{backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', minHeight: '60rvh' }}>
          <div class="image"><img src={props.result.album.images[0].url} /></div>
          <div class="content">
            <div class="search-result-header" onClick={() => props.goToArtistPage(props.result.artists[0].external_urls.spotify)}>{props.result.artists[0].name}</div>
            <div class="track">{props.result.name}</div>
          </div>
        </div>
        :
        <Fragment />
      }
    </Fragment>
  )
}

export default searchResults;
