import database from '/server/api/db-connectors.js';

export default function () {
  return {
    Database: database,
  }
}
