import React from 'react';
// import ReactDOM from 'react-dom';

import Formsy from 'formsy-react';
import {
  // Checkbox,
  // CheckboxGroup,
  Input,
  // RadioGroup,
  Row,
  // Select,
  // File,
  // Textarea

} from 'formsy-react-components';

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.validSubmit = this.validSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.invalidSubmit = this.invalidSubmit.bind(this);

    this.state = {
      layout: 'vertical',
      validatePristine: true,
      disabled: false,
      canSubmit: false
    };
  }

  resetForm() {
    // console.log('resetForm');
    this.refs.form.reset();
  }

  onChange() {
    // console.log('onChange ', this.props.canSubmit);
  }

  validSubmit(data) {
    // console.log('validSubmit', this.props._code);
    this.props.submitAction(this.props._code, data.password1, data.password2);
  }

  invalidSubmit() {
    // console.log('invalidSubmit');
  }

  enableButton() {
    if ( !this.state.canSubmit ) { this.setState({canSubmit: true}); }
  }

  disableButton() {
    if ( this.state.canSubmit ) { this.setState({canSubmit: false}); }
  }

  render() {

    let formClassName = 'vertical m-t';

    const { exception, users, _code } = this.props;
//    this.debug(' render() ', _code);

    let sharedProps = {
      layout: this.state.layout,
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled
    };

    let user = users.findOne( { 'emails.verifier': _code } );

    let fail = exception;
    if ( !user ) {
      fail = 'You are not authorized to change a password here';
      sharedProps.disabled = true;
    }


    return (

        <Formsy.Form className={formClassName}
          onValidSubmit={this.validSubmit}
          onInvalidSubmit={this.invalidSubmit}
          onValid={this.enableButton}
          onInvalid={this.disableButton}
          onChange={this.onChange}

          data-cuke='register'
          ref="form">

          <fieldset>

            {fail ?
            <div data-cuke="bad-content" className="alert alert-danger" onClick="">
              <span className="unicon fatal icon-white icon-24" ></span>
              {fail}
            </div> : null }

            <p>
              Enter your password twice as shown.  Then log in again, please.
            </p>

            <Input
                {...sharedProps}
                name="password1"
                value=""
                label="Password"
                type="password"

                data-cuke="password1"

                validations="minLength:8"
                validationError="Your password must be at least 8 characters long."
                placeholder="Choose a password"
            />
            <Input
                {...sharedProps}
                name="password2"
                value=""
                label="Confirm password"
                type="password"

                data-cuke="password2"

                validations="equalsField:password1"
                validationErrors={{
                  equalsField: 'Passwords must match.'
                }}

                placeholder="Retype password"
            />

          </fieldset>

          <Row layout={this.state.layout}>

            <input

              data-cuke='submit'
              className="btn btn-primary block full-width m-b"

              formNoValidate={false}
              disabled={!this.state.canSubmit}
              type="submit"
              defaultValue="Reset Password" />

          </Row>

        </Formsy.Form>

    );
  }
}
