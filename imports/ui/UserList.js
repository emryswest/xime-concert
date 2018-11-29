import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

// App component - represents the whole app
class UserList extends Component {
  constructor(props) {
    super(props);

    this.clickUser = this.clickUser.bind(this);

  }

  clickUser(aUser) {
    let intermediate = aUser._id;
    selectedUser = intermediate;
//    console.log(intermediate);
  }

  render() {

    let users = Meteor.users.find({})
    let display = users.map((aUser, key) => {
      // Send out components that show details of each file
      return <div className="individual-user" key={key}>
      <li onClick={this.clickUser.bind(this, aUser)} targetuser={selectedUser}>{aUser.username}</li>
      </div>
    })

    return (
      <div className="container">
        <header>
          <h1>Users</h1>
        </header>
        <ul>
        {display}
        </ul>
      </div>
    );
  }
}

export default UserList;
