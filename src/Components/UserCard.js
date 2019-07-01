import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'



const UserCard = (props) => {
  console.log(props);
  return (
    <div class="user-info">
    <div class="ui text menu">
      <div class="ui right dropdown item">
        <img src={props.currentUser.user_photo} />
        {props.currentUser.display_name}

        <div class="menu">

        </div>
      </div>
    </div>
  </div>

  )
}

export default UserCard;






// <div class="ui card">
// <div class="image"><img src={props.currentUser.user_photo} /></div>
// <div class="content">
// <div class="header">{props.currentUser.display_name}</div>
// <div class="description">{props.currentUser.followers}</div>
// </div>
// </div>
