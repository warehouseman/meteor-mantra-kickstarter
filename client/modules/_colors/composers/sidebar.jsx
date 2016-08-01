import {useDeps} from 'react-simple-di';
import {composeWithTracker, composeAll} from 'react-komposer';

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
