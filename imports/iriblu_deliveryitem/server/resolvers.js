import DeliveryItem from './attach';
import Sequelize from 'sequelize';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const resolvers = {

  Queries: {
    getDeliveryItem(_, args) {
      // LG('################################## DeliveryItem :: ', DeliveryItem);
      LG('DeliveryItem :: ', args);
      let res = DeliveryItem.findAll({ where: args });
      // LG('return :: ', res);
      return res;
    }
  },

  Mutations: {

    createDeliveryItem: (_, args) => {
      LG('Creating a Delivery Item :: ', args);
      let aDeliveryItem = DeliveryItem.build(
        {
          fkDelivery: args.fkDelivery,
          code: args.code,
        });

      return aDeliveryItem.save().then(
        (saveResult) => {
          const { errors, dataValues } = saveResult;
          if (dataValues) {
            LG('New delivery item data values : ', dataValues);
            return DeliveryItem
              .findById( dataValues.itemId )
              .then(newDeliveryItem => {
                if (!newDeliveryItem) {
                  LG('Unable to find the newly created delivery item :: ', dataValues.itemId);
                  return { message: 'New delivery item <' + dataValues.itemId + '>  created, but not found!' };
                }
                return dataValues;
              })
              .catch((error) => {
                LG('Sequelize error while reloading the delivery item, "' + args.code + '"', error);
              });
          }
          if (errors) {
            LG('Sequelize error while finding the delivery item, "' + args.code + '"', errors);
          }
        }
      ).catch( (error) => {
        LG('Sequelize error while saving the delivery item, "' + args.code + '"', error);
      });
    },

    updateDeliveryItem: (_, args) => {
      LG('Updating delivery item :: ', args);
      LG('... id\'d by :: ', args.itemId);
      LG('... by codee :: ', args.code);

      return DeliveryItem
        .findById( args.itemId )
        .then(theDeliveryItem => {
          if (!theDeliveryItem) {
            LG('Unable to find the delivery item :: ', args.itemId);
            return { message: 'Delivery Item not found' };
          }
          return theDeliveryItem
            .destroy({
              code: args.code,
              fkDelivery: 9998
            }).then(
              (sequelizeResult) => {
                LG('**** updated ****', sequelizeResult.dataValues);
                const { errors, dataValues } = sequelizeResult;
                if (dataValues) {
                  LG('got some GraphQL results', dataValues);
                  return dataValues;
                }
                if (errors) {
                  LG('got some GraphQL execution errors', errors);
                }
              }
            ).catch( (error) => {
              LG('There was an error updating the delivery item :: ', error);
            });
        })
        .catch((error) => {
          LG('There was an error finding the delivery item :: ', error);
        });
    },

    hideDeliveryItem: (_, args) => {
      LG('Hiding a DeliveryItem :: ', args);

      return DeliveryItem
        .findById( args.itemId )
        .then(theDeliveryItem => {
          if (!theDeliveryItem) {
            LG('Unable to find the delivery item :: ', args.itemId);
            return { message: 'Delivery Item not found' };
          }

          LG(' Date now : ', Date.now(), '  :  ' , Sequelize.literal('CURRENT_TIMESTAMP'));
          return theDeliveryItem
            .destroy()
            .then( sequelizeResult => {
              LG('Delivery Item hidden :: #', sequelizeResult.dataValues.itemId);
              const { errors, dataValues } = sequelizeResult;
              if (dataValues) {
                LG('got some GraphQL results', dataValues);
                return dataValues;
              }
              if (errors) {
                LG('got some GraphQL execution errors', errors);
              }
            }).catch( error => {
              LG('There was an error updating the delivery item :: ', error);
            });
        })
        .catch((error) => {
          LG('There was an error hiding the delivery item :: ', error);
        });
    },

  }
};

export default resolvers;
