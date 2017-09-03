import Partner from './attach';
import Sequelize from 'sequelize';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const resolvers = {

  Queries: {
    getPartner(_, args) {
      // LG('Partner :: ', Partner);
      LG('Partner :: ', args);
      let res = Partner.findAll({ where: args });
      // LG('return :: ', res);
      return res;
    }
  },

  Mutations: {

    createPartner: (_, args) => {
      LG('Creating a Partner :: ', args);
      let aPartner = Partner.build(
        {
          partnerName: args.partnerName,
          isCorporate: args.isCorporate,
          isClient: args.isClient,
          isSupplier: args.isSupplier,
          citizenId: args.citizenId,
          email: args.email,
          status: args.status,
        });

      return aPartner.save().then(
        (saveResult) => {
          const { errors, dataValues } = saveResult;
          if (dataValues) {
            LG('New partner data values : ', dataValues);
            return Partner
              .findById( dataValues.partnerId )
              .then(newPartner => {
                if (!newPartner) {
                  LG('Unable to find the newly created partner :: ', dataValues.partnerId);
                  return { message: 'New partner <' + dataValues.partnerId + '>  created, but not found!' };
                }
                return dataValues;
              })
              .catch((error) => {
                LG('Sequelize error while reloading the partner, "' + args.email + '"', error);
              });
          }
          if (errors) {
            LG('Sequelize error while finding the partner, "' + args.email + '"', errors);
          }
        }
      ).catch( (error) => {
        LG('Sequelize error while saving the partner, "' + args.email + '"', error);
      });
    },

    updatePartner: (_, args) => {
      LG('Updating partner :: ', args);
      LG('... id\'d by :: ', args.partnerId);
      LG('... by email :: ', args.email);

      return Partner
        .findById( args.partnerId )
        .then(thePartner => {
          if (!thePartner) {
            LG('Unable to find the partner :: ', args.partnerId);
            return { message: 'Partner not found' };
          }
          return thePartner
            .update({
              partnerName: args.partnerName,
              isCorporate: args.isCorporate,
              isClient: args.isClient,
              isSupplier: args.isSupplier,
              citizenId: args.citizenId,
              email: args.email,
              status: args.status,
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
              LG('There was an error updating the partner :: ', error);
            });
        })
        .catch((error) => {
          LG('There was an error finding the partner :: ', error);
        });
    },

    hidePartner: (_, args) => {
      LG('Hiding a Partner :: ', args);

      return Partner
        .findById( args.partnerId )
        .then(thePartner => {
          if (!thePartner) {
            LG('Unable to find the partner :: ', args.partnerId);
            return { message: 'Partner not found' };
          }

          LG(' Date now : ', Date.now(), '  :  ' , Sequelize.literal('CURRENT_TIMESTAMP'));
          return thePartner
            .destroy()
            .then( sequelizeResult => {
              LG('Partner hidden :: #', sequelizeResult.dataValues.partnerId);
              const { errors, dataValues } = sequelizeResult;
              if (dataValues) {
                LG('got some GraphQL results', dataValues);
                return dataValues;
              }
              if (errors) {
                LG('got some GraphQL execution errors', errors);
              }
            }).catch( error => {
              LG('There was an error updating the partner :: ', error);
            });
        })
        .catch((error) => {
          LG('There was an error hiding the partner :: ', error);
        });
    },

  }
};

export default resolvers;
