import { merge } from 'lodash';

import bookResolvers from './bookResolvers';
import authorResolvers from './authorResolvers';
// import partnerResolvers from './partnerResolvers';
import dateTimeResolvers from './dateTimeResolvers';
// imp ort deliveryItemResolvers from './deliveryItemResolvers';
import { resolvers as imported } from '/imports';

const importedResolvers = imported();
// console.log('server/api/resolvers   ||@@@@    importedResolvers  @@@@|| ', importedResolvers);
// console.log('   @@@@@     importedResolvers  @@@@ ', deliveryItemResolvers);

export default merge(
  bookResolvers,
  authorResolvers,
//  partnerResolvers,
  dateTimeResolvers,
  importedResolvers
//  deliveryItemResolverX
);
