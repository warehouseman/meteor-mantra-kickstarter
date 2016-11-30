import widgetModule from './client';
import { Widget } from './lib';
import { methods, publications } from './server';

export const Client = widgetModule;

export const Lib = Widget;

export const Publications = publications;
export const Methods = methods;
