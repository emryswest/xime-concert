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
    let users = Meteor.users.find({});
    let passMyTasks = this.props.passMyTasks;
    console.log(passMyTasks.length);
    let numberOfUsers = Meteor.users.find().count();
    let display
    display = users.map((aUser, key) => {
      // Send out components that show details of each file

    })

    return (
      <div className={passMyTasks.length > 0 ? "players-container-condensed" : "players-container"}>
        {display}
      </div>
    );
  }
}

export default UserList;
