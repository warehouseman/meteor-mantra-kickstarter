import React from 'react';

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

    this.resetForm = () => { this.refs.form.reset(); };
    this.validSubmit = (data) => {
      /* console.log('validSubmit', data); */
      this.props.submitAction(data.email);
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
          ref="form">

          <fieldset>
            {exception ?
            <div data-cuke="bad-mailing" className="alert alert-danger" onClick="">
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

                data-cuke='rst-email'

                autoComplete="off"

                validations="isEmail"
                validationError="Please provide a valid email address."

            />

          </fieldset>

          <Row layout={this.state.layout}>

            <input className="btn btn-primary block full-width m-b"
              formNoValidate={true}
              disabled={!this.state.canSubmit}

              data-cuke='submit-rst-email'

              type="submit"
              defaultValue="Send new password" />

          </Row>

        </Formsy.Form>

    );
  }
}
