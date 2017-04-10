export const schema = {

  qry: `
    partner(partner_id: Int, name: String, email: String, deleted: Boolean): [Partner]
`,
  mut: '',
  typ: `
    scalar Date

    type TimestampType {
       created: Date
    }

    type Partner {
      partner_id: Int
      name: String
      company: Boolean
      client: Boolean
      supplier: Boolean
      civil_status: Boolean
      gender: Boolean
      nationality: Boolean
      legal_id: String
      group_code: Int
      telf_primary: String
      telf_secundary: String
      celular_phone: String
      email: String
      webPage: String
      contact_person: String
      notes: String
      sales_person: String
      status: Boolean
      create_by: String
      creation_date: Date
      last_update: Date
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
`
};
