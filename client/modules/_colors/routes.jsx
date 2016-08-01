import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
  // Simple
} from '../../configs/theme.jsx';

import ColorsList from './containers/collection.jsx';
import ColorsView from './containers/single.jsx';
import ColorsAdd from './containers/add.jsx';
import ColorsEdit from './containers/edit.jsx';

export default function (injectDeps, {FlowRouter}) {

  const LayoutDefaultCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/colors', {
    name: '_colors.colorsList',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<ColorsList />)
      });
    }
  });

  FlowRouter.route('/colors/add', {
    name: '_colors.colorsAdd',
    action() {
      mount(LayoutDefaultCtx, {
        content: () => (<ColorsAdd />)
      });
    }
  });

  FlowRouter.route('/colors/:_id', {
    name: '_colors.colorsView',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<ColorsView _id={_id}/>)
      });
    }
  });

  FlowRouter.route('/colors/:_id/edit', {
    name: '_colors.colorsEdit',
    action({_id}) {
      mount(LayoutDefaultCtx, {
        content: () => (<ColorsEdit _id={_id}/>)
      });
    }
  });

}
