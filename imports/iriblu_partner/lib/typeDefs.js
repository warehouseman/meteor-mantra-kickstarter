const Queries = `
    ###  The items of the delivery note related by 'fkDelivery'.
    ####  Query example :
    #    {
    #      getPartner(partnerId: 1) {
    #        partnerId
    #        partnerName
    #        isCorporate
    #        isClient
    #      }
    #    }
    getPartner(
      partnerId: Int,
      partnerName: String,
      isCorporate: String,
      isClient: String,
    ): [Partner]
`;

const Mutations = `

  ### Mutations
  #### Create Partner
  #    mutation createPartner($partnerName: String!, $isCorporate: String!) {
  #      createDeliveryItem(partnerName: $partnerName, isCorporate: $isCorporate) {
  #        partnerId
  #        isCorporate
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerName": 3,
  #       "isCorporate": "IBIB004",
  #    }
  createPartner(
    partnerName: String!
    isCorporate: String!
  ): Partner

  #### Hide Partner
  #    mutation hidePartner($partnerId: Int!) {
  #      hidePartner(partnerId: $partnerId) {
  #        isCorporate
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerId": 3,
  #    }
  hidePartner(
    itemId: Int!
  ): Partner

  #### Update Partner
  #    mutation updatePartner($partnerId: Int!, $partnerName: String!, $isCorporate: String!) {
  #      updateDeliveryItem(partnerId: $partnerId, partnerName: $partnerName, isCorporate: $isCorporate) {
  #        partnerId
  #        partnerName
  #        isCorporate
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerId": 999,
  #       "partnerName": 444,
  #       "isCorporate": "Izzz004",
  #    }
  updatePartner(
    partnerId: Int!
    partnerName: String
    isCorporate: String
  ): Partner

`;

const Types = `

    type Partner {
      partnerId: Int
      partnerName: String
      isCorporate: String
      isClient: String
      createdAt: DateTime
      updatedAt: DateTime
      deletedAt: DateTime
    }
`;


export default {
  qry: Queries,
  mut: Mutations,
  typ: Types
};
