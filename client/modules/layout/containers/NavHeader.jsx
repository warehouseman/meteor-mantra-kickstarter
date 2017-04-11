import React from 'react';

export default class extends React.Component {

  render() {

    const {brand, leftContent, rightContent} = this.props;

    return (

      <header className="main-header">
        <div className="navbar navbar-default navbar-fixed-top">

          <div className="container">

            <div className="navbar-header">
              <button type="button" className="navbar-toggle"
                data-toggle="collapse" data-target=".navbar-default-collapse">
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="/">{brand ? brand() : 'logo goes here'}</a>
            </div>


            <div className="navbar-collapse collapse navbar-default-collapse">

              {leftContent ? leftContent() : null }

              {rightContent ? rightContent() : null }


            </div>


          </div>

        </div>
      </header>

    );
  }
}
