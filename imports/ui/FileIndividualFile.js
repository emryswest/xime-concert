import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserFiles } from '../api/files.js';
import { getSelectedUser } from '../ui/selecteduser';

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.removeFile = this.removeFile.bind(this);
    this.sendTask = this.sendTask.bind(this);

  }

  propTypes: {
    fileName: PropTypes.string.isRequired,
    fileSize: PropTypes.number.isRequired,
    fileUrl: PropTypes.string,
    fileId: PropTypes.string.isRequired
  }

  removeFile(){
    UserFiles.remove(this.props.fileId);
    }

  sendTask() {
//    console.log(this.props);
    var text = this.props.fileUrl;
    Meteor.call('tasks.insert', text, getSelectedUser());
  }


  render() {


    return (
      <li className="bag-item">
        <button className="delete" onClick={this.removeFile}>
          &times;
        </button>


        <span className="text">
          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
           target="_blank"><strong></strong></a>
           { this.props.fileUrl.match(/^http.*\.(png|jpg|jpeg|gif|bmp)$/i) ? (
	        <img onClick={this.sendTask} className="filethumb" src={ this.props.fileUrl }/>
           ) : '' }

        </span>
      </li>
    );
  }
}
export default IndividualFile;
