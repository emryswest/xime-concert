import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { UserFiles } from '../api/files.js';

class IndividualFile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.removeFile = this.removeFile.bind(this);

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


  render() {


    return (
      <li>
        <button className="delete" onClick={this.removeFile}>
          &times;
        </button>

        <input type="checkbox" />

        <span className="text">
          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
           target="_blank"><strong>{this.props.fileName}</strong></a>
        </span>
      </li>
    );
  }
}
export default IndividualFile;
