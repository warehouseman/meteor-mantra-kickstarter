const Queries = `
    ###  The items of the delivery note 'entrega_id'.
    ####  Example :
    #    {
    #      deliveryItem(entrega_lines_id: 1) {
    #        entrega_lines_id
    #        cod
    #        entrega_id
    #        createdAt
    #      }
    #    }
    deliveryItem(entrega_lines_id: Int, entrega_id: Int, cod: String, createdAt: Date): [DeliveryItem]
`;

const Mutations = `
`;

const Types = `

    type DeliveryItem {

      entrega_lines_id:  Int
      entrega_id: Int
      cod: String
      createdAt: DateTime

    }
`;


export const schema = {
  qry: Queries,
  mut: Mutations,
  typ: Types
};

/*


{
  deliveryItem(entrega_lines_id: 4) {
    entrega_lines_id
    cod
    entrega_id
    createdAt
  }
}

*/
