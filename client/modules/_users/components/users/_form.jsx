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
      role: AllRoles
      // ,content: t.maybe(t.String)
    });

//       t.enums.of('Owner Administrator Staff Member Customer Registered')

    const formOptions = {
      config: {
      },
      fields: {
        firstName: {
          label: 'Name'
        },
        lastName: {
          label: 'Family name'
        },
        email: {
          label: 'Electronic mail address'
        },
        role: {
          label: 'Privilege level',
          factory: t.form.Radio
        }
      }
    };

//    const debug = true;
    // const {_id, error, record, email } = this.props;
    const {_id, error, email, user } = this.props;

    const defaultValues = {
      ...this.props
    };

    defaultValues.role = user.roles.headOffice[0];

    const Form = t.form.Form;

    const formTitle = _id ? 'Edit ' + email : 'Add new record';
    const buttonLabel = 'Save';

    // console.log('_users/components/users/_form.jsx --> Default values :', defaultValues);

    return (
      <div>

          <h3>{formTitle}</h3>

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

        <button className="btn btn-primary" onClick={this.submitForm}>{buttonLabel}</button>


      </div>
    );
  }
});

        // {debug ? <button className="btn btn-primary" onClick={this.componentLog}>
        //            component log
        //         </button> : null }
