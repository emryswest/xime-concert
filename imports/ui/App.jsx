import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from './Task.js';
import IndividualFile from './FileIndividualFile.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FileUpload from './FileUpload.js';
import UserList from './UserList.js';
import { getSelectedUser } from './selecteduser.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

  }

  handleSubmit(event) {
  event.preventDefault();

  // Find the text field via the React ref
  const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

  Meteor.call('tasks.insert', text, getSelectedUser());

  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}


  renderTasks() {
    let myTasks = this.props.tasks;
    let recentTask;

    // show those for US or for anyone!
    myTasks = myTasks.filter(task =>
      task.targetuser == Meteor.userId()
    );

    recentTask = myTasks.length > 0 ? myTasks.slice(0, 1) : 0;
    console.log(recentTask);


    return myTasks.map((task) => {

        return (
          <Task
            key={task._id}
            task={task}
          />
        );
    });
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Users</h1>
          <AccountsUIWrapper />
        </header>

        <div>
        <UserList />
        </div>

        <ul>
          {this.renderTasks()}
        </ul>

        <div>
        <FileUpload />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('players');


  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
