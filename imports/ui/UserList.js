import { withTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { setSelectedUser, getSelectedUser } from '../ui/selecteduser';

// App component - represents the whole app
class UserList extends Component {
  constructor(props) {
    super(props);

    this.clickUser = this.clickUser.bind(this);
  }

  clickUser(aUser) {
    let intermediate = aUser._id;
    if (intermediate == getSelectedUser()) {
        setSelectedUser(undefined);
    } else {
        setSelectedUser(intermediate);
        console.log(getSelectedUser());
    }	    
    this.setState({currentSelection: getSelectedUser()}); // force a re-render
  }



  render() {
    let users = Meteor.users.find({})
    let display = users.map((aUser, key) => {
      // Send out components that show details of each file
      return <div key={key}>
      <li className={aUser._id == getSelectedUser() ? 'highlighted-user' : 'individual-user'} onClick={this.clickUser.bind(this, aUser)}>{aUser.username}</li>
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
