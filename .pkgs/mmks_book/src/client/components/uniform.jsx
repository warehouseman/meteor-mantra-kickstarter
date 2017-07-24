import React from 'react';

import GraphQLBridge from 'uniforms/GraphQLBridge';

import {
  AutoForm,
  TextField,
  SelectField,
  LongTextField,
  ErrorsField,
  SubmitField,
  NumField
} from 'uniforms-bootstrap3';


const nameModule = 'Book';

const BookForm = class extends React.Component {

  constructor(props) {
    super(props);

    this.submitForm = (values) => {
      if (values) {
        this.props.clearErrors();
        this.props.submitAction(values, this.props.mutate);
      }
    };

    this.schemaValidator = (model) => {
      this.props.validateAction(model);
    };

    this.updateState = (field, value) => {
      if ( field === 'author' ) {
        //        console.log('Author', this.schemaData);
        this.schemaData.author.value = value;
      }
    };

    const { API_AST } = this.props.context();

    this.state = {model: this.props.record || { author: {} }};

    this.schemaType = API_AST.getType(nameModule);
    this.schemaData = {
      author: {
        options: this.props.authorOptions,
        value: this.state.model.author._id,
      }
    };

    // this.schemaData = { };
    // this.schemaData.author = {
    //   options: this.props.authorOptions,
    //   value: this.state.model.author._id,
    // };

    /* eslint-disable no-console */
    console.log('Book model record : ', this.props.record);
    console.log('Schema author options : ', this.props.authorOptions);
    console.log('Book schema : ', this.schemaType);
    console.log('Schema validator : ', this.schemaValidator);
    console.log('Schema data : ', this.schemaData);
    /* eslint-enable no-console */
    this.bridge = new GraphQLBridge(
      this.schemaType
      , this.schemaValidator
      , this.schemaData
    );
  }

  render() {

    console.log('Rendering model : ', this.state.model); // eslint-disable-line no-console

    const title = this.props._id ? 'Editing : ' + this.state.model.title : 'Add a book :';

    return (
      <div>
        <h3>{title}</h3>

        <AutoForm
          schema={this.bridge}
          onSubmit={doc => this.submitForm(doc)}
          onChange={(field, value) => this.updateState(field, value)}
          model={this.state.model}
          validate="onChange"
        >
          <div className="row-fluid">
            <div data-cuke="title" className="col-md-4">
              <TextField data-cuke="title" name="title" label="Title"
                placeholder="The book's title."/>
            </div>
            <div data-cuke="author" className="col-md-6">
              <SelectField name="author" label="Author" />
            </div>
            <div data-cuke="pages" className="col-md-2">
              <NumField name="pages" label="# of pages"/>
            </div>
          </div>
          <div data-cuke="content" className="row-fluid">
            <LongTextField name="content" label="Content"
              placeholder="Brief synopsis" />
          </div>

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

export default BookForm;
