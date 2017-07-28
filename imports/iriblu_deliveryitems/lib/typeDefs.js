const Queries = `
    ###  The itemised details of a delivery note.
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


export default {
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
