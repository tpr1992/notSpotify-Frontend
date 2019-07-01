import React from 'react'
import { Grid } from 'semantic-ui-react'
// ======================================


const searchResults = (props) => {
  console.log(props);
  // debugger
  return (
    <div class="ui card" style={{}}>
    <div class="image"><img src={props.result.album.images[1].url} /></div>
    <div class="content">
    <div class="header">{props.result.artist}</div>
    <div class="description">{props.result.name}</div>
    </div>
    </div>
  )
}


export default searchResults;
