import React from 'react';

const UserCard = (props) => {
  return (
    <div class="user-info">
      <div class="ui text menu">
        <img src={props.currentUser.user_photo} alt="user-photo" />
        {props.currentUser.display_name}
        <div class="menu">
        </div>
      </div>
    </div>
  )
}

export default UserCard;
