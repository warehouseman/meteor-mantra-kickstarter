const Queries = `
    ###  The items of the delivery note "fkDelivery".
    ####  Query example :
    #    {
    #      getDeliveryItem(itemId: 1, offset: 0, limit: 10) {
    #        itemId
    #        fkDelivery
    #        code
    #      }
    #    }
    getDeliveryItem(
      offset: Int,
      limit : Int,
      itemId: Int,
      fkDelivery: Int,
      code: String,
    ): [DeliveryItem]
`;

const Mutations = `

  ### Mutations
  #### Create Delivery Item
  #    mutation createDeliveryItem(
  #      $fkDelivery: Int!,
  #      $code: String!
  #    ) {
  #      createDeliveryItem(
  #        fkDelivery: $fkDelivery,
  #        code: $code
  #      ) {
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
  #    mutation updateDeliveryItem(
  #      $itemId: Int!,
  #      $fkDelivery: Int!,
  #      $code: String!,
  #    ) {
  #      updateDeliveryItem(
  #        itemId: $itemId,
  #        fkDelivery: $fkDelivery,
  #        code: $code,
  #      ) {
  #        itemId
  #        fkDelivery
  #        code
  #      }
  #    }
  #### Variables
  #    {
  #       "itemId": 999,
  #       "fkDelivery": 444,
  #       "code": "Izzz004"
  #    }
  updateDeliveryItem(
    itemId: Int!
    fkDelivery: Int
    code: String
  ): DeliveryItem

`;

const Types = `

    type DeliveryItem {
      #  Item id
        itemId: Int
      #  Fk delivery
        fkDelivery: Int
      #  Code
        code: String
      #  Creation date and time (automatic)
         createdAt: DateTime
      #  Last change date and time (automatic)
         updatedAt: DateTime
      #  Disabling date and time (automatic)
         deletedAt: DateTime
    }
`;


export default {
  qry: Queries,
  mut: Mutations,
  typ: Types
};
