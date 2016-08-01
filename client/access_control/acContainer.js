/* eslint-disable no-console */
import {useDeps, composeAll, composeWithTracker} from 'mantra-core';

import Authorized from './acComponent';
import authComposer from './acComposer';
// import authComposer from './acComposer';


export default composeAll(
  composeWithTracker(authComposer),
  useDeps()
)(Authorized);
