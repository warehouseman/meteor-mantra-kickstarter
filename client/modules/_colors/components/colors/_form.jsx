import React from 'react';
import t from 'tcomb-form';
// import _ from 'lodash';

// const ValidationWarningTag = ({_idTag, _val}) => (
//   <x-cuke id={_idTag}>{_val}</x-cuke>
// );


export default React.createClass({

  debug(_place, _value) {
    const lgr = this.props.Logger;
    lgr.setLevel('info');
    lgr.blue.underline(_place)
       .bold(' - ' + _value)
       .gray(lgr.path(__filename))
       .debug();
  },

  submitForm(event) {
    event.preventDefault();
    var values = this.refs.form.getValue();
    this.debug('submitting', JSON.stringify(values));
    if (values) {
      this.props.clearErrors();
      if (this.props._id) {
        this.props.submitAction(values, this.props._id);
      } else {
        this.props.submitAction(values);
      }
    }
  },

  onChange() {
    let vals = this.refs.form.getValue(); // <- validate on every change
    this.debug('onChange', vals);
  },

  render() {

    const {record, state} = this.props;

    const ctx = {poolParty: { age: 21 }};
    const Age = t.refinement(t.Number, (n) => n >= ctx.poolParty.age);
    Age.getValidationErrorMessage = (value, path, context) =>
         'Nope. ' + value + ' is too young, Pool Party Age : ' + context.poolParty.age;
//       <ValidationWarningTag _idTag='invalid-age' _val={context.poolParty.age} />;

    const formModel = t.struct({
      title: t.String,
      age: Age,
      content: t.maybe(t.String)
    });

    const formOptions = {
      config: {
        horizontal: {
          md: [ 3, 9 ],
          sm: [ 6, 6 ]
        }
      },
      fields: {
        title: {
          label: 'Title (custom label)',
          attrs: {
            'data-cuke': 'title'
          }
        },
        age: {
          attrs: {
            'data-cuke': 'age'
          }
        },
        content: {
          type: 'textarea',
          attrs: {
            rows: 4,
            'data-cuke': 'content'
          }
        }
      }
    };

    const debug = false;

    const Form = t.form.Form;

    const title = this.props._id ? 'Edit: ' + record.title : 'Add new';
    const buttonLabel = 'Save';


    return (
      <div>

          <h3>{title}</h3>
          {state ?
          <div data-cuke="bad-content" className="alert alert-danger" onClick="">
            <span className="unicon fatal icon-white icon-24" ></span>
            {state}
          </div> : null }

          <Form ref="form"

            type={formModel}
            options={formOptions}

            value ={record}
            onChange={this.onChange}

            context={ ctx }

          />
        <button
          data-cuke="save-color" className="btn btn-primary"
          onClick={this.submitForm}>{buttonLabel}
        </button>

        {debug ? <button className="btn btn-primary"
          onClick={this.componentLog}>component log</button> : null
        }

      </div>
    );
  }

});
