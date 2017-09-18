import React from 'react';
import { cloneDeep } from 'lodash';

import {
  AutoForm,
  TextField,
  RadioField,
  HiddenField,
  ErrorsField,
  SubmitField,
} from 'uniforms-bootstrap3';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const UserForm = class extends React.Component {

  constructor(props) {
    super(props);

    this.submitForm = (values) => {

      if (values) {

        const R = this.props.enumRoles;
        const id = values._id;
        values.roles.headOffice = R.slice(R.indexOf(values.role), R.length);

        this.props.clearErrors();

        this.props.submitAction(values, id);
      }
    };

    // LG('User model record : ', this.props.record);
    // LG('~~~~~~~~~~~~~~~~~~~ state ~~~~~~~~~~~~~~~~~~~~~~~~~');
    // LG(this.state);
    // LG('=================== props =========================');
    // LG(this.props);
    // LG('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');

    delete this.Schema;
    this.Schema = null;
    if ( this.props.record && this.props.record.user ) {

      // LG( this.props.fullSchema );
      // LG('~~~~~~~~~~~~~~~~~~~~~  ||  ~~~~~~~~~~~~~~~~~~~~~~~~');
      this.state = { model: this.props.record.user };
      this.Schema = this.props.fullSchema.omit( 'confirmPassword', 'password' );
      // LG( this.Schema );

    } else {

      // LG('~~~~~~~~~~~~~~~  NO USER TO EDIT  ~~~~~~~~~~~~~~~~~');
      this.Schema = cloneDeep(this.props.fullSchema);
      this.Schema.extend(this.props.PwdSchema);

      this.state = { model: {
        createdAt: new Date(),
        roles: { headOffice: [] }
      } };
    }

    this.roleTags = {};
    this.props.enumRoles.map( (k, i) => {
      this.roleTags[k] = this.props.icons[i];
    });

  }


  render() {

    console.log('Rendering model : ', this.state.model); // eslint-disable-line no-console

    const title = this.props._id ?
      'Editing : ' + this.state.model.profile.lastName + ', ' + this.state.model.profile.firstName :
      'Add a new user :';

    const xform = (value) => {
      return <div>
        <span className="rotate270text">{ this.roleTags[value] }</span>
         -- {value}
      </div>;
    };

    return (
      <div>
        <h3 data-cuke="user-form-title">{title}</h3>

        <AutoForm
          schema={this.Schema}
          onSubmit={doc => this.submitForm(doc)}
          model={this.state.model}
          validate="onChange"
        >

          <div data-cuke="email" className="row-fluid">
            <TextField name="emails.0.address"
              placeholder="Your email address." />
          </div>
          <div data-cuke="firstName" className="row-fluid">
            <TextField name="profile.firstName"
              placeholder="Your personal name." />
          </div>
          <div data-cuke="lastName" className="row-fluid">
            <TextField name="profile.lastName"
              placeholder="Your family name." />
          </div>


          {this.props._id ? (
            <br />
          ) : (
            <div>
              <div data-cuke="password" className="row-fluid">
                <TextField name="password"
                  placeholder="Password." />
              </div>
              <div data-cuke="confirmPassword" className="row-fluid">
                <TextField name="confirmPassword"
                  placeholder="Password confirmation." />
              </div>
            </div>
          )}

          <div data-cuke="role" className="row-fluid">
            <RadioField name="role" label="Privilege Level"
              transform={xform}
            />
          </div>


          <HiddenField name="roles"/>
          <ErrorsField data-cuke="errorMessage"/>

          {this.props.errorMessage ? (
            <span children={this.props.errorMessage} />
          ) : (
            <br />
          )}

          <SubmitField data-cuke="save-item"/>

        </AutoForm>
      </div>
    );
  }
};

export default UserForm;
