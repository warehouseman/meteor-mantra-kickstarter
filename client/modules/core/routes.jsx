import React from 'react';
import {mount} from 'react-mounter';

import {
  LayoutDefault,
} from '../../configs/theme.jsx';

// import MainLayout from './components/main_layout.jsx';
import PostList from './containers/postlist';
import Post from './containers/post';
import NewPost from './containers/newpost';
import ApolloList from './containers/apolist';
import ApolloPost from './containers/apopost';

export default function (injectDeps, {FlowRouter}) {
  const MainLayoutCtx = injectDeps(LayoutDefault);

  FlowRouter.route('/', {
    name: 'posts.list',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<PostList />)
      });
    }
  });

  FlowRouter.route('/post/:postId', {
    name: 'posts.single',
    action({postId}) {
      mount(MainLayoutCtx, {
        content: () => (<Post postId={postId}/>)
      });
    }
  });

  FlowRouter.route('/new-post', {
    name: 'newpost',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<NewPost/>)
      });
    }
  });

  FlowRouter.route('/apo', {
    name: 'apollolist',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ApolloList/>)
      });
    }
  });

  FlowRouter.route('/apop', {
    name: 'apollolist',
    action() {
      mount(MainLayoutCtx, {
        content: () => (<ApolloPost/>)
      });
    }
  });
}
