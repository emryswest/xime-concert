import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Players } from '../api/players.js';


// Task component - represents a single todo item
export default class Player extends Component {
toggleChecked() {
  // Set the checked property to the opposite of its current value
    Meteor.call('players.setChecked', this.props.player._id, !this.props.player.checked);
}

deleteThisPlayer() {
    Meteor.call('players.remove', this.props.player._id);
}

togglePrivate() {
  Meteor.call('players.setPrivate', this.props.player._id, ! this.props.player.private);
}

  render() {
    // Give tasks a different className when they are checked off,
// so that we can style them nicely in CSS
    const playerClassName = classnames({
      checked: this.props.player.checked,
      private: this.props.player.private,
    });

    return (
      <li className={playerClassName}>
        <button className="delete" onClick={this.deleteThisPlayer.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.player.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.player.private ? 'Private' : 'Public' }
          </button>
        ) : ''}

        <span className="text">
          <strong>{this.props.player.username}</strong>: {this.props.player.text}
        </span>
      </li>
    );
  }
}
