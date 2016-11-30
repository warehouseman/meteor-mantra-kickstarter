import React from 'react';
import t from 'tcomb-form';


export default class extends React.Component {

  constructor(props) {
    super(props);

//     this.onChange = () => {
// //      let vals = this.refs.form.getValue(); // <- validate on every change
// //      this.info( ' @ onChange ', JSON.stringify(vals) );
//     };

    this.submitForm = (event) => {
      event.preventDefault();
      var values = this.refs.form.getValue();
      if (values) {
        this.props.clearErrors();
        if (this.props._id) {
          this.props.submitAction(values, this.props._id);
        } else {
          this.props.submitAction(values);
        }
      }
    };
  }

  render() {

    const {record, exception} = this.props;

    const ctx = {someWidget: { size: 21 }};
    const Size = t.refinement(t.Number, (n) => n >= ctx.someWidget.size);
    Size.getValidationErrorMessage = (value, path, context) =>
         'Nope. ' + value + ' is too small, Bronze Minimum : ' + context.someWidget.size;

    const formModel = t.struct({
      title: t.String,
      size: Size,
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
        size: {
          attrs: {
            'data-cuke': 'size'
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
          {exception ?
          <div data-cuke="bad-content" className="alert alert-danger" onClick="">
            <span className="unicon fatal icon-white icon-24" ></span>
            {exception}
          </div> : null }

          <Form ref="form"

            type={formModel}
            options={formOptions}

            value ={record}
            onChange={this.onChange}

            context={ ctx }

          />
        <button
          data-cuke="save-item" className="btn btn-primary"
          onClick={this.submitForm}>{buttonLabel}
        </button>

        {debug ? <button className="btn btn-primary"
          onClick={this.componentLog}>component log</button> : null
        }

      </div>
    );
  }

}
