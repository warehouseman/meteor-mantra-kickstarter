/* eslint-disable no-console */
import React from 'react';
import t from 'tcomb-form';

const enumRoles = [ 'Owner', 'Administrator', 'Staff', 'Member', 'Customer', 'Registered' ];
export default React.createClass({


  submitForm(event) {
    event.preventDefault();
    var values = this.refs.form.getValue();
    if (values) {
      // console.log('submitForm values', values);
      if (this.props._id) {
        this.props.submitAction(values, this.props._id);
      } else {
        this.props.submitAction(values);
      }
    }
  },

  onChange() {
    this.refs.form.getValue(); // <- validate on every change
  },

  render() {


    const AllRoles = t.enums.of( enumRoles, 'Roles');

    const formModel = t.struct({
      firstName: t.String,
      lastName: t.String,
      email: t.String,
      password1: t.String,
      password2: t.String,
      role: AllRoles
    });

    const formOptions = {
      config: {
      },
      fields: {
        firstName: {
          label: 'Name',
          attrs: {
            'data-cuke': 'firstName'
          }
        },
        lastName: {
          label: 'Family name',
          attrs: {
            'data-cuke': 'lastName'
          }
        },
        email: {
          label: 'Electronic mail address',
          attrs: {
            'data-cuke': 'email'
          }
        },
        password1: {
          label: 'Password',
          attrs: {
            'data-cuke': 'pword1'
          }
        },
        password2: {
          label: 'Repeat Password',
          attrs: {
            'data-cuke': 'pword2'
          }
        },
        role: {
          label: 'Privilege level',
          attrs: {
            'data-cuke': 'role'
          },
          factory: t.form.Radio
        }
      }
    };

    const {_id, error, email, user } = this.props;

    const defaultValues = {
      ...this.props
    };

    if ( !user || !user.roles ) {
      defaultValues.role = '';
    } else {
      defaultValues.role = user.roles.headOffice[0];
    }

    const Form = t.form.Form;

    const formTitle = _id ? 'Edit ' + email : 'Add new record';
    const buttonLabel = 'Save';

    // console.log('_users/components/users/_form.jsx --> Default values :', defaultValues);

    return (
      <div>

          <h3><x-cuke id="formTitle">{formTitle}</x-cuke></h3>

          {error ?
          <div className="alert alert-danger" onClick="">
            <span className="octicon octicon-megaphone" ></span>
            {error}
          </div> : null }

          <Form ref="form"
            type={formModel}
            options={formOptions}
            onChange={this.onChange}
            value={defaultValues}
          />

        <button data-cuke='user-save' className="btn btn-primary" onClick={this.submitForm}>
          {buttonLabel}
        </button>


      </div>
    );
  }
});
