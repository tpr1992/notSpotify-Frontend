import React from 'react'
import { Fragment } from 'react';
import { Grid } from 'semantic-ui-react';


const ArtistSearchResults = (props) => {
  // debugger
  console.log(props.artistSearchResults);
  return (
    <Fragment>
      {
        props.artistSearchResults[0].images.length > 0 ?

        <div class='ui card' onClick={() => props.selectTrack(props.result.external_urls.spotify)} style={{backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', height: '335px'}}>
          <div class="image" style={{margin: '5%'}}>
            {
              props.showSidebar && props.userClickedOnTrack > 0 ?
              <img src={props.result.images[0].url || props.result.images[1].url} style={{ height: '20vh', width: '20vh', borderRadius: '100px' }} />
              :
              <img src={props.result.images[0].url || props.result.images[1].url} style={{ height: '21vh', width: '21vh', borderRadius: '100px' }} />
            }
          </div>
          <div class="content">
            <div class="search-result-header">{props.result.name}</div>
            <div class="ui mini statistic">
              <span class='value' style={{color: 'white', fontSize: '.8em', marginBottom: '1vh'}}>
                {props.result.followers.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,')}
              </span>
              <span class='label' style={{color: 'white', fontSize: '.65em'}}>
                Followers
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


// <div id='artist-search-header' style={{color: 'white', margin: '.3vh', padding: '.4vh'}}>
//   Artist
// </div>
