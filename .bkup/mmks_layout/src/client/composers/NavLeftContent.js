import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

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
