const Queries = `
    partner(partner_id: Int, partnerName: String, partnerEmail: String): [Partner]
`;

const Mutations = `
`;

const Types = `

    type Partner {
      partnerId: Int
      partnerName: String
      company: Boolean
      client: Boolean
      supplier: Boolean
      civil_status: Boolean
      partnerGender: String
      nationality: Boolean
      legal_id: String
      group_code: Int
      telf_primary: String
      telf_secundary: String
      celular_phone: String
      partnerEmail: String
      webPage: String
      contact_person: String
      notes: String
      sales_person: String
      status: Boolean
      create_by: String
      createdAt: DateTime
      last_update: DateTime
      country_acc: String
      state_acc: String
      city_acc: String
      canton_acc: String
      parish_acc: String
      postal_code_acc: String
      street_acc: String
      bulding_acc: String
      country_res: String
      state_res: String
      city_res: String
      canton_res: String
      parish_res: String
      postal_code_res: String
      street_res: String
      bulding_res: String
    }
`;

export const schema = {
  qry: Queries,
  mut: Mutations,
  typ: Types
};


/*



{
  partner(partner_id: 4) {
    partnerId
    partnerName
    partnerEmail
    createdAt
  }
}

*/
