import React from 'react';
// ======================================

const UserPlaylists = (props) => {
  return (

    <div class="ui card" onClick={ () => props.selectTrack(props.playlist.external_urls.spotify) } style={{ backgroundColor: '#1d1d1e', color: '#fff', textAlign: 'center', opacity: 1, minHeight: '60rvh' }}>
      <div class="image" style={{ cursor: 'pointer' }}><img src={ props.playlist.images[0].url } /></div>
      <div class="content">
        <div class="search-result-header" style={{ cursor: 'pointer', minHeight: '10vh' }}>{ props.playlist.name }</div>
        <div class="ui mini horizontal statistic">
          <span class='value' style={{ color: 'white', fontSize: '.8em', marginBottom: '1vh' }}>
            { props.playlist.total.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '1,') }
          </span>
          <span class='label' style={{ color: 'white', fontSize: '.7em' }}>
            Songs
          </span>
        </div>
      </div>
    </div>

  )
}

export default UserPlaylists;
