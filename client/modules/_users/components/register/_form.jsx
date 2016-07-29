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

//    this.onChange = this.onChange.bind(this);
    this.resetForm = () => { this.refs.form.reset(); };
    this.validSubmit = (data) => {
      // console.log('validSubmit', data);
      this.props.submitAction(data.email, data.password1, data.password2);
    };

    this.enableButton = () => {
      // console.log('enable button');
      if (!this.canSubmit) { this.setState({ canSubmit: true }); }
    };

    this.disableButton = () => {
      // console.log('disable button');
      if (this.canSubmit) { this.setState({ canSubmit: false }); }
    };

    this.invalidSubmit = () => { /*  console.log('invalidSubmit', data); */ };

    this.state = {
      layout: 'vertical',
      validatePristine: true,
      disabled: false,
      canSubmit: false
    };
  }

  render() {

    let formClassName = 'vertical m-t';

    var sharedProps = {
      layout: this.state.layout,
      validatePristine: this.state.validatePristine,
      disabled: this.state.disabled
    };

    const {exception} = this.props;

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
            {exception ?
            <div data-cuke="bad-content" className="alert alert-danger" onClick="">
              <span className="unicon fatal icon-white icon-24" ></span>
              {exception}
            </div> : null }

            <Input
                {...sharedProps}
                name="email"
                value=""
                label="Email"
                type="email"
                placeholder="This is an email input."

                data-cuke="email"

                autoComplete="off"

                validations="isEmail"
                validationError="Please provide a valid email address."

            />


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

            <input data-cuke='submit' className="btn btn-primary block full-width m-b"
              formNoValidate={true}
              disabled={!this.state.canSubmit}
              type="submit"
              defaultValue="Register" />

          </Row>

        </Formsy.Form>

    );
  }
}
