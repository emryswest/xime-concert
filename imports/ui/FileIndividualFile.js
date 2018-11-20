import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserFiles } from '../api/files.js';

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.removeFile = this.removeFile.bind(this);
    this.toggleChecked = this.toggleChecked.bind(this);

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


  toggleChecked() {
  // Set the checked property to the opposite of its current value
  UserFiles.update(this.props.fileId, {
    $set: { checked: !this.props.fileId.checked },
  });
}

  render() {

const taskClassName = this.props.fileId.checked ? 'checked' : '';

    return (
      <li className={taskClassName}>
        <button className="delete" onClick={this.removeFile}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.fileId.checked}
          onClick={this.toggleChecked}
        />

        <span className="text">
          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
           target="_blank"><strong>{this.props.fileName}</strong></a>
        </span>
      </li>
    );
  }
}
export default IndividualFile;
