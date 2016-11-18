import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../lib/compose-with-tracker.js';

// import authComposer from '/client/access_control/Authorize';
import authComposer from '/client/access_control/acComposer';

export const singleComposer = ({context}, onData) => {
  onData(null, { } );

};

export default (component) => composeAll(
    composeWithTracker(authComposer),
    composeWithTracker(singleComposer),
    useDeps()
  )(component);
