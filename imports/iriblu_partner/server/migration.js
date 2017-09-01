import Partner from './attach';
import { RDBMS as sequelize } from '../../api/meteorDependencies.js';

const LG = console.log; // eslint-disable-line no-console,no-unused-vars
const entity = 'Partner';

module.exports = function () {

  return Partner.findAll({
    attributes: [ [ sequelize.fn('COUNT', sequelize.col('email')), 'numRows' ] ]
  }).then( res => {

    if ( res[0].dataValues.numRows > 0 ) {
      LG('Table "%s" has %s rows', entity, res[0].dataValues.numRows );
    } else {
      LG('Migrating data into table "%s".', entity );
      return sequelize.query(
        /* eslint-disable quotes */
        `INSERT INTO partner (
           partner_id
         , partner_name
         , is_corporate
         , is_client
         , is_supplier
         , civil_status
         , gender
         , nationality
         , citizen_id
         , group_code
         , phone_primary
         , phone_secondary
         , phone_mobile
         , email
         , web_site
         , contact_person
         , notes
         , sales_rep
         , status
         , created_by
         , createdAt
         , updatedAt
         , delivery_country
         , delivery_state
         , delivery_city
         , delivery_county
         , delivery_parish
         , delivery_postal_code
         , delivery_street
         , delivery_street_no
         , residence_country
         , residence_state
         , residence_city
         , residence_county
         , residence_parish
         , residence_postal_code
         , residence_street
         , residence_street_no )
        SELECT
           p.partner_id as partner_id
         , p.partner_name as partner_name
         , p.partner_company as is_corporate
         , p.partner_client as is_client
         , p.partner_supplier as is_supplier
         , p.partner_civil_status as civil_status
         , p.partner_gender as gender
         , p.partner_nationality as nationality
         , p.partner_legal_id as citizen_id
         , p.partner_group_code as group_code
         , p.partner_telf_primary as phone_primary
         , p.partner_telf_secundary as phone_secondary
         , p.partner_celular_phone as phone_mobile
         , p.partner_email as email
         , p.partner_webPage as web_site
         , p.partner_contact_person as contact_person
         , p.partner_notes as notes
         , p.partner_sales_person as sales_rep
         , p.partner_status as status
         , p.partner_create_by as created_by
         , p.partner_creation_date as createdAt
         , p.partner_last_update as updatedAt
         , p.partner_country_acc as delivery_country
         , p.partner_state_acc as delivery_state
         , p.partner_city_acc as delivery_city
         , p.partner_canton_acc as delivery_county
         , p.partner_parish_acc as delivery_parish
         , p.partner_postal_code_acc as delivery_postal_code
         , p.street_acc as delivery_street
         , p.bulding_acc as delivery_street_no
         , p.country_res as residence_country
         , p.state_res as residence_state
         , p.city_res as residence_city
         , p.canton_res as residence_county
         , p.parish_res as residence_parish
         , p.postal_code_res as residence_postal_code
         , p.street_res as residence_street
         , p.bulding_res as residence_street_no
        FROM tb_partners p`,
        { type: sequelize.QueryTypes.INSERT }
        /* eslint-enable quotes  */
      ).then( rpt => {
        LG(' - Last "item_id" of %s for %s rows inserted into "%s".', rpt[0], rpt[1], entity);
      }).catch( err => LG('query error. ' + err.message));
    }
  }).catch( err => LG('findAll error. ' + err.message));

};
