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
    //  let index1;

      // show those for US or for anyone!
      myTasks = myTasks.filter(task =>
        task.targetuser == Meteor.userId()
      );
      if (myTasks.length > 1) {
  Meteor.call('tasks.remove', myTasks[0]._id);
}

  //    myTasks = myTasks.reverse();

      myTasks = myTasks.length > 1 ? [ myTasks[myTasks.length - 1] ] : myTasks;

  //    index1 = myTasks.find[1];

  //    console.log(index1);


      return myTasks.map((task) => {
          return (
            <Task
              key={task._id}
              task={task}
            />
          );
      });
    }

    passMyTasks() {
      let passMyTasks = this.props.tasks;
      passMyTasks = passMyTasks.filter(task =>
      task.targetuser == Meteor.userId()
      );
      return (
        passMyTasks
      )
    }
  render() {
let passMyTasks = this.passMyTasks();

    return (
      <div>
        <div className="app-container">
        <header>
        <AccountsUIWrapper />
          <h1>Players</h1>

        </header>
          <UserList passMyTasks={passMyTasks}/>
          <div className="material">
            <ul>
              {this.renderTasks()}
            </ul>
          </ div>

          <FileUpload />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {


  return {
    tasks: Tasks.find({}, { sort: { createdAt: 1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
