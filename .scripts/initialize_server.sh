#!/usr/bin/env bash
#
# set -eu;

# export RDBMS_DB="circle_test";

declare PRTY=" DBINI  --> ";
function initialize_server() {

  export LOG=/tmp/databaseInit.log;
  if [[ -f ${LOG} ]]; then
    chmod ugo+rw ${LOG};
  else
    touch ${LOG};
  fi;

  declare SRVR=$(sudo cat /var/log/syslog | grep -c PostgreSQL);
  declare CLNT=$(psql --version 2>/dev/null);
  if [[  ${SRVR} -lt 1 ]] || [[ "X${CLNT}X" = "XX" ]]; then
    echo -e "Installing PostgreSql";
    declare PGDGLIST="/etc/apt/sources.list.d/pgdg.list";
    sudo touch ${PGDGLIST};
    if [[ $(grep -c "postgres" ${PGDGLIST}) -lt 1 ]]; then
      echo "deb http://apt.postgresql.org/pub/repos/apt/ xenial-pgdg main" | sudo tee -a ${PGDGLIST};
    fi;
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | sudo apt-key add -;
    sudo apt-get update;

    sudo apt-get install -y postgresql-client-9.6 postgresql-9.6 postgresql-contrib-9.6 libpq-dev postgresql-server-dev-9.6

  fi;

  if [[ -f ./settings.json ]]; then
    local  RDBMS_DB=$(cat ./settings.json | jq -r .RDBMS_DB);
    local RDBMS_UID=$(cat ./settings.json | jq -r .RDBMS_UID);
    local RDBMS_PWD=$(cat ./settings.json | jq -r .RDBMS_PWD);
    local RDBMS_HST=$(cat ./settings.json | jq -r .RDBMS_HST);
#    local RDBMS_BKP=$(cat ./settings.json | jq -r .RDBMS_BKP);
  else
    local  RDBMS_DB="circle_test";
    local RDBMS_UID="ubuntu";
    local RDBMS_PWD="memorablecacaphony";
    local RDBMS_HST="localhost";
  fi;

 local RDBMS_BKP="http://bit.ly/mmks170317G";

  # local  RDBMS_DB="${RDBMS_DB:-$RDBMS_DB}";
  # local RDBMS_UID="${RDBMS_UID:-$RDBMS_UID}";
  # local RDBMS_PWD="${RDBMS_PWD:-$RDBMS_PWD}";
  # local RDBMS_HST="${RDBMS_HST:-$RDBMS_HST}";
  # local RDBMS_BKP="${RDBMS_BKP:-$RDBMS_BKP}";

  echo -e "Server Preparations Log :: $(date)
  ========================================================" > ${LOG};
  echo -e "\n${PRTY} Perform your server initializations here.

      RDBMS_BKP -- ${RDBMS_BKP}
      RDBMS_UID -- ${RDBMS_UID}
      RDBMS_PWD -- ${RDBMS_PWD}
"  | tee -a ${LOG};

  if [[ -z ${RDBMS_BKP} ]]; then
    echo -e "${PRTY} No PostgreSQL seed URL was specified. Skipping ..."  | tee -a ${LOG};
  else

    declare SEED_FILE="pgres_seed.sql";
    echo -e "${PRTY} Downloading and restoring PostgreSQL seed from URL ...
                       ${RDBMS_BKP}
         ... to have internal standard name '${SEED_FILE}'"  | tee -a ${LOG};

    curl -sz ${SEED_FILE} -L -o ${SEED_FILE} ${RDBMS_BKP};

    echo -e "${PRTY} Have seed file, '$(stat -c "%n %s bytes" ${SEED_FILE})'."  | tee -a ${LOG};

    # cat pgres_seed.sql;
    # exit;

    declare SCHEMA_NAME=$(cat ${SEED_FILE} \
      | grep -m 1 -Poh "(?<=\bSCHEMA\s)(\w+)" );

    declare SCHEMA_OWNER=$(cat ${SEED_FILE} \
      | grep "ALTER .* OWNER TO .*;"  \
      | grep -m 1 -oh "TO .*;"  \
      | cut -d " " -f 2  \
      | cut -d ";" -f 1);

    export CIRCLE_PG="psql -d ${RDBMS_DB}";

    if [[ $(psql postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='${USER}'") -lt 1 ]]; then
      sudo su -c "createuser --superuser ${USER}" postgres;
    fi;

    if [[ $(psql postgres -tAc "SELECT 1 FROM pg_database WHERE datname='${RDBMS_DB}'") -lt 1 ]]; then
      createdb ${RDBMS_DB};
    fi;

    if [[ -z ${SCHEMA_NAME} ]]; then
      echo -e "No schema name specified... >${SCHEMA_NAME}<"  | tee -a ${LOG};
      SCHEMA_NAME="public";
    else
      echo -e "${PRTY} Seed file specified schema, '${SCHEMA_NAME}'."  | tee -a ${LOG};
      ${CIRCLE_PG} -tc "CREATE SCHEMA IF NOT EXISTS ${SCHEMA_NAME}";
    fi;

    echo -e "${PRTY} Schema owner : '${SCHEMA_OWNER}'."  | tee -a ${LOG};
    export SCHEMA_USER="";
    if [[ -z ${SCHEMA_OWNER} ]]; then
      echo -e "${PRTY} No schema owner specified... >${SCHEMA_OWNER}<"  | tee -a ${LOG};
    else
      local CNT=$(${CIRCLE_PG} -tc "SELECT count(usename) FROM pg_user WHERE usename = '${SCHEMA_OWNER}'");
      (( ${CNT} < 1 )) && (
        echo "${PRTY} 'Creating user and giving schema ownership" | tee -a ${LOG}
        ${CIRCLE_PG} -tc "CREATE USER ${SCHEMA_OWNER}";
        ${CIRCLE_PG} -tc "GRANT ALL PRIVILEGES ON SCHEMA ${SCHEMA_NAME} TO  ${SCHEMA_OWNER}";
      );
    fi;

    declare COUNT_SCHEMA_TABLES="SELECT count(table_name) FROM information_schema.tables WHERE table_schema = '${SCHEMA_NAME}'";
    declare NUM_SCHEMA_TABLES=$(${CIRCLE_PG} -tc "${COUNT_SCHEMA_TABLES}" | xargs);
    if [[ 0 < ${NUM_SCHEMA_TABLES} ]]; then
      echo -e "${PRTY} Schema, '${SCHEMA_NAME}', has tables already. Skipping..."  | tee -a ${LOG};
    else
      echo -e "${PRTY} Restoring PostgreSQL from seed file, '${SEED_FILE}'."  | tee -a ${LOG};

        ${CIRCLE_PG} -qf ${SEED_FILE}
        #  &>/dev/null;

      echo -e "${PRTY} Database sown ..."  | tee -a ${LOG};
    fi;

    echo -e "${PRTY} Creating Meteor app user '${RDBMS_UID}' if not exists"  | tee -a ${LOG};
    SCHEMA_USER=$(${CIRCLE_PG} -tc "SELECT usename FROM pg_user WHERE usename = '${RDBMS_UID}'" | xargs);
    if [[ -z  ${SCHEMA_USER} ]]; then
      ${CIRCLE_PG} -tc "CREATE USER ${RDBMS_UID} WITH PASSWORD '${RDBMS_PWD}'";
    fi;

    ${CIRCLE_PG} -tc "GRANT ALL PRIVILEGES ON DATABASE ${RDBMS_DB} TO  ${RDBMS_UID}";
    ${CIRCLE_PG} -tc "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA ${SCHEMA_NAME} TO ${RDBMS_UID}";
    ${CIRCLE_PG} -tc "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA ${SCHEMA_NAME} TO ${RDBMS_UID}";

  fi;

  echo -e "\n${PRTY} Server initialized."  | tee -a ${LOG};

};

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then

  initialize_server;

fi;

