import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Player from './Player.js';
import IndividualFile from './FileIndividualFile.js';
import AccountsUIWrapper from './AccountsUIWrapper.js';
import FileUpload from './FileUpload.js';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
  event.preventDefault();

  // Find the text field via the React ref
  const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('tasks.insert', text);

  // Clear form
  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
    const currentUserId = this.props.currentUser && this.props.currentUser._id;
    const showPrivateButton = task.owner === currentUserId;

    return (
      <Task
        key={task._id}
        task={task}
        showPrivateButton={showPrivateButton}
      />
    );
  });
  }

  getPlayers() {
    return [
      { _id: 1, text: 'This is Player 1' },
      { _id: 2, text: 'This is Player 2' },
      { _id: 3, text: 'This is Player 3' },
    ];
  }

  renderPlayers() {
    return this.getPlayers().map((player) => (
      <Player key={player._id} player={player} />
    ));
  }


  render() {
    return (
      <div className="container">
        <header>
          <h1>Players ({this.props.incompleteCount})</h1>

                <label className="hide-completed">
                  <input
                    type="checkbox"
                    readOnly
                    checked={this.state.hideCompleted}
                    onClick={this.toggleHideCompleted.bind(this)}
                  />
                  Hide Completed Tasks
                </label>

          <AccountsUIWrapper />

        </header>

        <ul>
          {this.renderPlayers()}
        </ul>

        <div>
        <FileUpload />
        </div>
      </div>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
