import React from 'react';

export default class extends React.Component {

  render() {

    const { frags, _email } = this.props;

    const subj = frags.Subject;
    return (
      <div>

        <h3><x-cuke id="reset-success">Password Reset</x-cuke></h3>
        <div>Your password reset request has been sent.</div>
        <div>Please check the email "{subj}" in your account <i>{_email}</i>.</div>

      </div>
    );
  }
}
