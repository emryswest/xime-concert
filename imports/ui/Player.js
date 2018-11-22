import React, { Component } from 'react';

// Task component - represents a single todo item
export default class Player extends Component {
  render() {
    return (
      <li>{this.props.player.text}</li>
    );
  }
}
