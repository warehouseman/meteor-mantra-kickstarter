/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('tbPartners', {
    partnerId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      field: 'partner_id'
    },
    partnerName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'partner_name'
    },
    partnerCompany: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_company'
    },
    partnerClient: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_client'
    },
    partnerSupplier: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_supplier'
    },
    partnerCivilStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_civil_status'
    },
    partnerGender: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_gender'
    },
    partnerNationality: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      field: 'partner_nationality'
    },
    partnerLegalId: {
      type: DataTypes.STRING(15),
      allowNull: false,
      field: 'partner_legal_id'
    },
    partnerGroupCode: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      field: 'partner_group_code'
    },
    partnerTelfPrimary: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'partner_telf_primary'
    },
    partnerTelfSecundary: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'partner_telf_secundary'
    },
    partnerCelularPhone: {
      type: DataTypes.STRING(20),
      allowNull: true,
      field: 'partner_celular_phone'
    },
    partnerEmail: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_email'
    },
    partnerWebPage: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_webPage'
    },
    partnerContactPerson: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_contact_person'
    },
    partnerNotes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_notes'
    },
    partnerSalesPerson: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_sales_person'
    },
    partnerStatus: {
      type: DataTypes.CHAR(1),
      allowNull: false,
      field: 'partner_status'
    },
    partnerCreateBy: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_create_by'
    },
    partnerCreationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'partner_creation_date'
    },
    partnerLastUpdate: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'partner_last_update'
    },
    partnerCountryAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_country_acc'
    },
    partnerStateAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_state_acc'
    },
    partnerCityAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_city_acc'
    },
    partnerCantonAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_canton_acc'
    },
    partnerParishAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_parish_acc'
    },
    partnerPostalCodeAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'partner_postal_code_acc'
    },
    streetAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'street_acc'
    },
    buldingAcc: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'bulding_acc'
    },
    countryRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'country_res'
    },
    stateRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'state_res'
    },
    cityRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'city_res'
    },
    cantonRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'canton_res'
    },
    parishRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'parish_res'
    },
    postalCodeRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'postal_code_res'
    },
    streetRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'street_res'
    },
    buldingRes: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'bulding_res'
    },
    createdAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'createdAt'
    },
    updatedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
      field: 'updatedAt'
    },
    deletedAt: {
      type: DataTypes.TIME,
      allowNull: true,
      field: 'deletedAt'
    }
  }, {
    tableName: 'tb_partners'
  });
};
