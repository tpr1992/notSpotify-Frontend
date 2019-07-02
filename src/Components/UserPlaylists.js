import React from 'react';
import { Grid, Label } from 'semantic-ui-react';
// ======================================

const UserPlaylists = (props) => {
  console.log(props);
  return (
    <div class="ui card" onClick={() => props.selectTrack(props.playlist.external_urls.spotify)} style={{backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', opacity: 1}}>
      <div class="image"><img src={props.playlist.images[0].url} /></div>
      <div class="content">
        <div class="search-result-header">{props.playlist.name}</div>
          <div class="meta">
            <span style={{color: 'white'}}>
              {props.playlist.total} Songs
            </span>
          </div>
      </div>
    </div>
  )
}

export default UserPlaylists;
