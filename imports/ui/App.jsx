import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import { Players } from '../api/players.js';
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

    Meteor.call('players.insert', text);

  ReactDOM.findDOMNode(this.refs.textInput).value = '';
}

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }


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
                     placeholder="Type to add new players"
                   />
                 </form>
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
  Meteor.subscribe('players');

  return {
    players: Players.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Players.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
