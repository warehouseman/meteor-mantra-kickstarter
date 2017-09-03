const LG = console.log; // eslint-disable-line no-console,no-unused-vars

const Instance = 'Partner';
const Table = 'partner';

module.exports = function (sequelize, DataTypes) {
  let Partner = sequelize.define(Instance, {
    partnerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'partner_id',
      comment: 'partner_id',
    },
    partnerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'partner_name',
      comment: 'partner_name',
    },
    isCorporate: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'is_corporate',
      comment: 'partner_company',
    },
    isClient: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'is_client',
      comment: 'partner_client',
    },
    isSupplier: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'is_supplier',
      comment: 'partner_supplier',
    },
    civilStatus: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'civil_status',
      comment: 'partner_civil_status',
    },
    gender: {
      type: DataTypes.CHAR(1),
      allowNull: true,
      field: 'gender',
      comment: 'partner_gender',
    },
    nationality: {
      type: DataTypes.CHAR(2),
      allowNull: true,
      field: 'nationality',
      comment: 'partner_nationality',
    },
    citizenId: {
      type: DataTypes.STRING(15),
      allowNull: true,
      field: 'citizen_id',
      comment: 'partner_legal_id',
    },
    groupCode: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      field: 'group_code',
      comment: 'partner_group_code',
    },
    phonePrimary: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'phone_primary',
      comment: 'partner_telf_primary',
    },
    phoneSecondary: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'phone_secondary',
      comment: 'partner_telf_secundary',
    },
    phoneMobile: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'phone_mobile',
      comment: 'partner_celular_phone',
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'email',
      comment: 'partner_email',
    },
    webSite: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'web_site',
      comment: 'partner_webPage',
    },
    contactPerson: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'contact_person',
      comment: 'partner_contact_person',
    },
    notes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'notes',
      comment: 'partner_notes',
    },
    salesRep: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'sales_rep',
      comment: 'partner_sales_person',
    },
    status: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'status',
      comment: 'partner_status',
    },
    createdBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'created_by',
      comment: 'partner_create_by',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'createdAt',
      comment: 'partner_creation_date',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'updatedAt',
      comment: 'partner_last_update',
    },
    deliveryCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_country',
      comment: 'partner_country_acc',
    },
    deliveryState: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_state',
      comment: 'partner_state_acc',
    },
    deliveryCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_city',
      comment: 'partner_city_acc',
    },
    deliveryCounty: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_county',
      comment: 'partner_canton_acc',
    },
    deliveryParish: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_parish',
      comment: 'partner_parish_acc',
    },
    deliveryPostalCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_postal_code',
      comment: 'partner_postal_code_acc',
    },
    deliveryStreet: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_street',
      comment: 'street_acc',
    },
    deliveryStreetNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'delivery_street_no',
      comment: 'bulding_acc',
    },
    residenceCountry: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_country',
      comment: 'country_res',
    },
    residenceState: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_state',
      comment: 'state_res',
    },
    residenceCity: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_city',
      comment: 'city_res',
    },
    residenceCounty: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_county',
      comment: 'canton_res',
    },
    residenceParish: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_parish',
      comment: 'parish_res',
    },
    residencePostalCode: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_postal_code',
      comment: 'postal_code_res',
    },
    residenceStreet: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_street',
      comment: 'street_res',
    },
    residenceStreetNo: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'residence_street_no',
      comment: 'bulding_res',
    },
  }, {
    tableName: Table,
    timestamps: true,
    paranoid: true,
  });

  return Partner;
};
