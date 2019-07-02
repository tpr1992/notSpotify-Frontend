import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'


const UserCard = (props) => {
  console.log(props);
  return (
    <div class="user-info">
      <div class="ui text menu">
        <div class="ui right dropdown item">
          <img src={props.currentUser.user_photo} alt="user-photo" />
          {props.currentUser.display_name}
          <div class="menu">
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCard;
