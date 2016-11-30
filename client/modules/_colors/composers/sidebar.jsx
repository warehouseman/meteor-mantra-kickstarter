import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

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
