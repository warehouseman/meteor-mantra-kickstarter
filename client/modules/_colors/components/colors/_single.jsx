
import React from 'react';

export default class extends React.Component {

  deleteRecord() {
    // console.log('deleteRecord ', this.props._id);
    this.props.deleteAction(this.props._id);
  }

  render() {
    const {_id, record} = this.props;
    return (
      <div>
        {record.saving ? <p>Saving...</p> : null}
        <h2><x-cuke id="title">{record.title}</x-cuke></h2>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <a href={'/colors/' + _id + '/edit'}>edit</a> |
          <a href="#" onClick={this.deleteRecord.bind(this)}>delete</a>
        </p>
      </div>
    );
  }
}
