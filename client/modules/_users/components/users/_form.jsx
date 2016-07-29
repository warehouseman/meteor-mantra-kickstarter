import React from 'react';
import t from 'tcomb-form';

const enumRoles = [ 'Owner', 'Administrator', 'Staff', 'Member', 'Customer', 'Registered' ];

export default class extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = () => { this.refs.form.getValue(); };

    this.submitForm = (event) => {
      event.preventDefault();
      var values = this.refs.form.getValue();
      if (values) {
        console.log('submitForm values', values);
        console.log('submitForm props._id', this.props._id);
        if (this.props._id) {
          this.props.submitAction(values, this.props._id);
        } else {
          this.props.submitAction(values);
        }
      }
    };
  }

  render() {


    const AllRoles = t.enums.of( enumRoles, 'Roles');

    const RegisteredUser = t.struct({
      firstName: t.String,
      lastName: t.String,
      email: t.String,
      role: AllRoles
    }, 'RegisteredUser');

    const NewUser = RegisteredUser.extend({
      password1: t.String,
      password2: t.String,
    }, 'NewUser');

    const User = t.union([ RegisteredUser, NewUser ], 'User');
    User.dispatch = value => value && value.email ? RegisteredUser : NewUser;

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
      },
      order: [ 'firstName', 'lastName', 'email', 'password1', 'password2', 'role' ]
    };

    const {_id, exception, email, user } = this.props;

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

    console.log('_users/components/users/_form.jsx --> exception :', exception);

    return (
      <div>

          <h3 data-cuke="user-form-title">{formTitle}</h3>

          {exception ?
          <div className="alert alert-danger" onClick="">
            <span className="octicon octicon-megaphone" ></span>
            {exception}
          </div> : null }

          <Form ref="form"
            type={User}
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
}
