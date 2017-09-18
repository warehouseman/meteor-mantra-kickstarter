import {useDeps} from 'react-simple-di';
import { composeAll, composeWithTracker } from 'mantra-core';

import { cloneDeep } from 'lodash';
import { UserSchema, PwdSchema, RoleSchema } from '/lib/user';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

export const schemaComposer = ({ context }, onData) => {
  const { ACL } = context();

  const enumRoles = ACL.AccessControl.getTrustLevels();
  const icons = ACL.AccessControl.getIcons();

  let fullSchema = {};
  fullSchema = cloneDeep( UserSchema );
  fullSchema.extend(RoleSchema);

  onData(null, { icons, enumRoles, fullSchema, PwdSchema });

};


export const depsMapper = (context, actions) => ({
  clearErrors: actions._users.clearErrors,
  context: () => context
});

export default (component) => composeAll(
  composeWithTracker(schemaComposer),
  useDeps(depsMapper)
)(component);
