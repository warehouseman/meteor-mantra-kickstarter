import { useDeps } from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import { singleComposer } from './single.jsx';

export const editComposer = ({ context }, onData) => {
  const { LocalState, ACL } = context();
  const exception = LocalState.get('_users.UPDATE_ERROR');

  const enumRoles = ACL.AccessControl.getTrustLevels();
  const icons = ACL.AccessControl.getIcons();

  onData(null, { exception, icons, enumRoles });

};

export const depsMapper = (context, actions) => ({
  submitAction: actions._users.update,
  clearErrors: actions._users.clearUserErrors,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(singleComposer),
  composeWithTracker(editComposer),
  useDeps(depsMapper)
)(component);
