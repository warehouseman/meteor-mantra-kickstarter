const Queries = `
    ###  Partner data.
    ####  Query example :
    #    {
    #      getPartner(partnerId: 1) {
    #        partnerId
    #        partnerName
    #        isCorporate
    #        isClient
    #        isSupplier
    #        citizenId
    #        email
    #        status
    #      }
    #    }
    getPartner(
      partnerId: Int,
      partnerName: String,
      isCorporate: String,
      isClient: String,
      isSupplier: String,
      citizenId: String,
      email: String,
      status: String,
    ): [Partner]
`;

const Mutations = `

  ### Mutations
  #### Create Partner
  #    mutation createPartner(
  #      $partnerName: String!,
  #      $isCorporate: String!,
  #      $isClient: String!,
  #      $isSupplier: String!,
  #      $citizenId: String!,
  #      $email: String,
  #      $status: String!
  #    ) {
  #      createPartner(
  #        partnerName: $partnerName,
  #        isCorporate: $isCorporate,
  #        isClient: $isClient,
  #        isSupplier: $isSupplier,
  #        citizenId: $citizenId,
  #        email: $email,
  #        status: $status
  #      ) {
  #        partnerId
  #        partnerName
  #        isCorporate
  #        isClient
  #        isSupplier
  #        citizenId
  #        email
  #        status
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerName": "Dashiel Hammet",
  #       "isCorporate": "Y",
  #       "isClient": "Y",
  #       "isSupplier": "Y",
  #       "citizenId": "171393141-6",
  #       "email": "a@b.c",
  #       "status": "A"
  #    }
  createPartner(
    partnerName: String!
    isCorporate: String!
    isClient: String!
    isSupplier: String!
    citizenId: String!
    email: String
    status: String!
  ): Partner

  #### Hide Partner
  #    mutation hidePartner($partnerId: Int!) {
  #      hidePartner(partnerId: $partnerId) {
  #        partnerName
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerId": 565
  #    }
  hidePartner(
    partnerId: Int!
  ): Partner

  #### Update Partner
  #    mutation updatePartner(
  #      $partnerId: Int!,
  #      $partnerName: String!,
  #      $isCorporate: String!,
  #      $isClient: String!,
  #      $isSupplier: String!,
  #      $citizenId: String!,
  #      $email: String,
  #      $status: String!,
  #    ) {
  #      updatePartner(
  #        partnerId: $partnerId,
  #        partnerName: $partnerName,
  #        isCorporate: $isCorporate,
  #        isClient: $isClient,
  #        isSupplier: $isSupplier,
  #        citizenId: $citizenId,
  #        email: $email,
  #        status: $status,
  #      ) {
  #        partnerId
  #        partnerName
  #        isCorporate
  #        isClient
  #        isSupplier
  #        citizenId
  #        email
  #        status
  #      }
  #    }
  #### Variables
  #    {
  #       "partnerId": 654,
  #       "partnerName": "Dashiel Hammet",
  #       "isCorporate": "Y",
  #       "isClient": "Y",
  #       "isSupplier": "Y",
  #       "citizenId": "171393141-6",
  #       "email": "a@b.c",
  #       "status": "A"
  #    }
  updatePartner(
    partnerId: Int!
    partnerName: String!
    isCorporate: String!
    isClient: String!
    isSupplier: String!
    citizenId: String
    email: String
    status: String!
  ): Partner

`;

const Types = `

    type Partner {
      #  Partner id
        partnerId: Int
      #  Partner name
        partnerName: String
      #  Is corporate
        isCorporate: String
      #  Is client
        isClient: String
      #  Is supplier
        isSupplier: String
      #  Civil status
        civilStatus: String
      #  Gender
        gender: String
      #  Nationality
        nationality: String
      #  Citizen id
        citizenId: String
      #  Group code
        groupCode: Int
      #  Phone primary
        phonePrimary: String
      #  Phone secondary
        phoneSecondary: String
      #  Phone mobile
        phoneMobile: String
      #  Email
        email: String
      #  Web site
        webSite: String
      #  Contact person
        contactPerson: String
      #  Notes
        notes: String
      #  Sales rep
        salesRep: String
      #  Status
        status: String
      #  Created by
        createdBy: String
      #  Delivery country
        deliveryCountry: String
      #  Delivery state
        deliveryState: String
      #  Delivery city
        deliveryCity: String
      #  Delivery county
        deliveryCounty: String
      #  Delivery parish
        deliveryParish: String
      #  Delivery postal code
        deliveryPostalCode: String
      #  Delivery street
        deliveryStreet: String
      #  Delivery street no
        deliveryStreetNo: String
      #  Residence country
        residenceCountry: String
      #  Residence state
        residenceState: String
      #  Residence city
        residenceCity: String
      #  Residence county
        residenceCounty: String
      #  Residence parish
        residenceParish: String
      #  Residence postal code
        residencePostalCode: String
      #  Residence street
        residenceStreet: String
      #  Residence street no
        residenceStreetNo: String
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
