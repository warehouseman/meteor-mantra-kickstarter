const Queries = `
    ###  The items of the delivery note related by 'fkDelivery'.
    ####  Query example :
    #    {
    #      getDeliveryItem(itemId: 1) {
    #        itemId
    #        fkDelivery
    #        code
    #        createdAt
    #      }
    #    }
    getDeliveryItem(
      itemId: Int,
      fkDelivery: Int,
      code: String,
      createdAt: Date,
    ): [DeliveryItem]
`;

const Mutations = `

  ### Mutations
  #### Create Delivery Item
  #    mutation createDeliveryItem($fkDelivery: Int!, $code: String!) {
  #      createDeliveryItem(fkDelivery: $fkDelivery, code: $code) {
  #        itemId
  #        code
  #      }
  #    }
  #### Variables
  #    {
  #       "fkDelivery": 3,
  #       "code": "IBIB004"
  #    }
  createDeliveryItem(
    fkDelivery: Int!
    code: String!
  ): DeliveryItem

  #### Hide Delivery Item
  #    mutation hideDeliveryItem($itemId: Int!) {
  #      hideDeliveryItem(itemId: $itemId) {
  #        code
  #      }
  #    }
  #### Variables
  #    {
  #       "itemId": 3
  #    }
  hideDeliveryItem(
    itemId: Int!
  ): DeliveryItem

  #### Update Delivery Item
  #    mutation updateDeliveryItem($itemId: Int!, $code: String!) {
  #      updateDeliveryItem(itemId: $itemId, code: $code) {
  #        code
  #      }
  #    }
  #### Variables
  #    {
  #       "itemId": 3,
  #       "code": "IBIB004"
  #    }
  updateDeliveryItem(
    itemId: Int!
    fkDelivery: Int
    code: String
  ): DeliveryItem

`;

const Types = `

    type DeliveryItem {
      itemId: Int
      fkDelivery: Int
      code: String
      createdAt: DateTime
    }
`;


export default {
  qry: Queries,
  mut: Mutations,
  typ: Types
};

