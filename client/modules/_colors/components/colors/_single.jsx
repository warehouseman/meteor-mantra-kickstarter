import React from 'react';
// import Authorized from '/client/access_control/acComposer.js';

export default class extends React.Component {

  hideRecord() {
    this.props.hideAction(this.props._id);
  }

  render() {
    const {_id, record} = this.props;
    return (
      <div>
        {record.saving ? <p>Saving...</p> : null}
        <h2><x-cuke id="title">{record.title}</x-cuke></h2>
        <p>
          <x-cuke id="age">{record.age} {record.age === 1 ? 'year' : 'years'} old.</x-cuke>
        </p>
        <p>
          <x-cuke id="content">{record.content}</x-cuke>
          <br />
          <a data-cuke='edit-color' href={'/colors/' + _id + '/edit'}>edit</a> |&nbsp;
          <a data-cuke='delete-color' href="#" onClick={this.hideRecord.bind(this)}>delete</a>
        </p>
      </div>
    );
/*
          <Authorized accesspoint='colors.update'>
            <a data-cuke='edit-color' href={'/colors/' + _id + '/edit'}>edit</a> |&nbsp;
          </Authorized>
          <Authorized accesspoint='colors.update'>
            <a data-cuke='delete-color' href="#" onClick={this.hideRecord.bind(this)}>delete</a>
          </Authorized>
*/

  }
}
