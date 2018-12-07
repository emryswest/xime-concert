import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { setSelectedUser, getSelectedUser } from '../ui/selecteduser';

export const Tasks = new Mongo.Collection('tasks');


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  // you have to specify the selectedUser so it gets sent to the server
  'tasks.insert'(text,selectedUser) {

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    user = selectedUser;
    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: this.userId,
      targetuser: user,
      username: Meteor.users.findOne(this.userId).username,
    });
    setSelectedUser(undefined);
  },
  'tasks.remove'(taskId) {
    check(taskId, String);

    const task = Tasks.findOne(taskId);

    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
  'tasks.setPrivate'(taskId, setToPrivate) {
  check(taskId, String);
  check(setToPrivate, Boolean);

  const task = Tasks.findOne(taskId);

  // Make sure only the task owner can make a task private
  if (task.owner !== this.userId) {
    throw new Meteor.Error('not-authorized');
  }

  Tasks.update(taskId, { $set: { private: setToPrivate } });
},
});
