import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Players } from '../api/players.js';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import Task from './Task.js';
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

<<<<<<< HEAD
    Meteor.call('players.insert', text);
=======
    Meteor.call('tasks.insert', text);
>>>>>>> bd4b6466a225be53e880d38ff1481d11c4d5e060

  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


<<<<<<< HEAD
  renderPlayers() {
    let filteredPlayers = this.props.players;
    if (this.state.hideCompleted) {
      filteredPlayers = filteredPlayers.filter(player => !player.checked);
    }
    return filteredPlayers.map((player) => {
    const currentUserId = this.props.currentUser && this.props.currentUser._id;
    const showPrivateButton = player.owner === currentUserId;

    return (
      <Player
        key={player._id}
        player={player}
=======
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
>>>>>>> bd4b6466a225be53e880d38ff1481d11c4d5e060
        showPrivateButton={showPrivateButton}
      />
    );
  });
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
                  Hide Completed Players
                </label>

          <AccountsUIWrapper />

                  <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                   <input
                     type="text"
                     ref="textInput"
<<<<<<< HEAD
                     placeholder="Type to add new players"
=======
                     placeholder="Type to add new tasks"
>>>>>>> bd4b6466a225be53e880d38ff1481d11c4d5e060
                   />
                 </form>
        </header>

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
<<<<<<< HEAD
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Players.find({ checked: { $ne: true } }).count(),
=======
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
>>>>>>> bd4b6466a225be53e880d38ff1481d11c4d5e060
    currentUser: Meteor.user(),
  };
})(App);
