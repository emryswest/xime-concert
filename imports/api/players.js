import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Players = new Mongo.Collection('players');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('players', function playersPublication() {
    return Players.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'players.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Players.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
'players.remove'(playerId) {
  check(playerId, String);

  const player = Players.findOne(playerId);
  if (player.private && player.owner !== this.userId) {
    // If the task is private, make sure only the owner can delete it
    throw new Meteor.Error('not-authorized');
  }

  Players.remove(playerId);
},

'players.setChecked'(playerId, setChecked) {
  check(playerId, String);
  check(setChecked, Boolean);
  const player = Players.findOne(taskId);
  if (player.private && player.owner !== this.userId) {
    // If the task is private, make sure only the owner can check it off
    throw new Meteor.Error('not-authorized');
  }

  Players.update(taskId, { $set: { checked: setChecked } });
},
'players.setPrivate'(playerId, setToPrivate) {
check(taskId, String);
check(setToPrivate, Boolean);

const task = Players.findOne(playerId);

// Make sure only the task owner can make a task private
if (player.owner !== this.userId) {
  throw new Meteor.Error('not-authorized');
}

Players.update(playerId, { $set: { private: setToPrivate } });
},
});
