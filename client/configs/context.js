import * as Collections from '/lib/collections';

import ACL from '/lib/access_control';
import App from '/lib/app';

import {Meteor} from 'meteor/meteor';
import {FlowRouter} from 'meteor/kadira:flow-router';
import {ReactiveDict} from 'meteor/reactive-dict';
import {Tracker} from 'meteor/tracker';

import {buildASTSchema, parse} from 'graphql';

import API from '/lib/api/typeDefs';
const API_AST = buildASTSchema(parse(API[0]));

import apolloClient from 'apollo-client';
import GQL from 'graphql-tag';

import { meteorClientConfig as MeteorClientConfig } from 'meteor/apollo';

const ApolloClient = new apolloClient(MeteorClientConfig());

export default function () {
  return {
    Meteor,
    FlowRouter,
    Collections,
    LocalState: new ReactiveDict(),
    Tracker,
    App,
    ACL,

    API_AST,
    ApolloClient,
    GQL
    // ,
    // MeteorClientConfig

  };
}
