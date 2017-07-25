import { merge } from 'lodash';

import bookResolvers from './bookResolvers';
import authorResolvers from './authorResolvers';
import partnerResolvers from './partnerResolvers';
import dateTimeResolvers from './dateTimeResolvers';
import deliveryItemResolvers from './deliveryItemResolvers';

export default merge(
  bookResolvers,
  authorResolvers,
  partnerResolvers,
  dateTimeResolvers,
  deliveryItemResolvers
);
