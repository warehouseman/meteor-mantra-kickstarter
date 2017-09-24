var jsdom = require('jsdom');
// var jsdom = require('jsdom').jsdom;

const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;

var exposedProperties = ['window', 'navigator', 'document'];

global.document = document;
// global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
