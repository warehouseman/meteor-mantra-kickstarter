import context from '../../server/context';
const db = context().Database;

db.import('Partner', require('./tblSqlzr'));
export default db.models.Partner;
