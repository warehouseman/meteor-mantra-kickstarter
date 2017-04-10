#!/bin/bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

PRTY=" Env Vars ::";

function preFlightCheck()
{


  echo -e "${PRTY} Configure environment variables?";
  declare USER_VARS="${HOME}/.userVars.sh";
  declare SVs="false";
  [ -f ${USER_VARS} ] && source ${USER_VARS} || SVs="true";

  [ "$(echo ${NON_STOP} | tr '[a-z]' '[A-Z]')" = "YES" ] || SVs="true";

  [ -z ${1} ] || SVs="true";

  if [[ "${SVs}" = "true" ]]; then
    pushd ${PROJECT_ROOT}/.scripts >/dev/null;
      echo -e "${PRTY} Environment variables need to be set...";
      source ./ManageShellVars.sh "";
      loadShellVars;
      PARM_NAMES=( "YOUR_FULLNAME" "YOUR_ORGANIZATION_NAME" "HOST_SERVER_PROTOCOL" "HOST_SERVER_NAME" "HOST_SERVER_PORT" "KEYSTORE_PWD" "NON_STOP" );
      askUserForParameters PARM_NAMES[@];
    popd >/dev/null;

  else
    echo -e "${PRTY} Environment variables seem ready.";
  fi;

  source ./.scripts/utils.sh;
  validateMeteorSettings;

  # declare SECRETS_FILE="${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh";
  # echo -e "${PRTY} Verify 'settings.json' or generate from ${SECRETS_FILE}";
  # if [[ "${CI}" = "true" ]]; then
  #   ./template.settings.json.sh > settings.json;
  # else
  #   if [ ! -f settings.json ]; then
  #     if [ -f ${SECRETS_FILE} ]; then
  #       source ${SECRETS_FILE};
  #       ./template.settings.json.sh > settings.json;
  #     else
  #       echo -e "
  #       Your secret settings were not found at :

  #            ${SECRETS_FILE};\n";
  #       exit 1;
  #     fi;
  #   fi;
  # fi;

  # if [ -f settings.json ]; then
  #   if [[ -z $(jq -r .LOGGLY_SUBDOMAIN settings.json) ]]; then
  #     echo -e "
  #     Your secret settings file, '${SECRETS_FILE}', is incomplete.
  #     'LOGGLY_SUBDOMAIN' is required\n";
  #     exit 1;
  #   fi;
  #   echo -e "Result : ";
  #   grep "LOGGLY_SUBDOMAIN" settings.json;
  # fi;

  declare SQLITE_DB_DIR='/tmp/db';
  [ ! -d ${SQLITE_DB_DIR} ] \
      && echo -e "${PRTY} Creating SQLite database directory." \
      && mkdir ${SQLITE_DB_DIR};

  echo -e "${PRTY} Done preflight.\n\n";

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  preFlightCheck ${1};
fi;

