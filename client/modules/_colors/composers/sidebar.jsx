import {useDeps} from 'react-simple-di';
import {composeAll} from 'react-komposer';
import composeWithTracker from '../../../../lib/compose-with-tracker.js';

import authComposer from '/client/access_control/acComposer';

export const sideBarComposer = ({context, clearErrors}, onData) => {

//  const accessPoint = {module: 'colors', action: 'add'};

  onData(null, { } );

};

export default (component) => composeAll(
    composeWithTracker(authComposer),
    composeWithTracker(sideBarComposer),
    useDeps()
  )(component);
