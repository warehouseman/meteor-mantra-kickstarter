#!/usr/bin/env bash
#
timestamp() {
  date +"%Y%m%d%H%M%S";
}

function addToKnexMigrationsList() {

  pushd `dirname $0`/.. > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
  echo "PROJECT_ROOT before - ${PROJECT_ROOT}";
  local PROJECT_ROOT="${PROJECT_ROOT:-${SCRIPTPATH}}";
# PROJECT_ROOT=${SCRIPTPATH%/.pkgs};
# echo "SCRIPTPATH - ${SCRIPTPATH}";
  echo "PROJECT_ROOT after - ${PROJECT_ROOT}";

  declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";
  declare KNEX_MIGRATIONS_DIRECTORY="${PROJECT_ROOT}/server/api/.knex/migrations";

#  echo "SCRIPTPATH - ${SCRIPTPATH}";
  echo "PROJECT_ROOT - ${PROJECT_ROOT}";
  echo -e "|~~~~~~~~~ '.pkgs/addToKnexMigrationsList'  ~~~~~~~~~|";

  local LIST=${1};
  echo "File of names of active modules : '${LIST}'\ncontains : \n$(cat ${LIST})";
  mkdir -p ${KNEX_MIGRATIONS_DIRECTORY};
  pushd ${KNEX_MIGRATIONS_DIRECTORY} >/dev/null;
    echo -e "Working directory : $(pwd) \ncontains existing migrations : \n$(ls)\n";

    local MODULES=( $(cat "${LIST}") );
    for MODULE in "${MODULES[@]}"
    do
      local TS=$(timestamp);
      local MIGRATION_FILE="${PROJECT_ROOT}/.pkgs/${MODULE}/src/server/api/migrations.js";
      echo -e "~~ Module migrations for '${MODULE}' in '${MIGRATION_FILE}'?";
      if [[ -f ${MIGRATION_FILE} ]]; then
        export DESTINATION_FILE=$(ls -1 *${MODULE}.js 2>/dev/null | tail -n 1);
        if [[ -f ${DESTINATION_FILE} ]]; then
          echo -e "~~ Copying migrations of '${MODULE}' to ${DESTINATION_FILE}";
          cp ${MIGRATION_FILE} ${DESTINATION_FILE};
        else
          echo -e "~~ Copying migrations of '${MODULE}' to ${TS}_${MODULE}.js";
          cp ${MIGRATION_FILE} ${TS}_${MODULE}.js;
        fi;
      else
        echo -e "~~  The module '${MODULE}' has no migrations.";
      fi;
    done

  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  declare LOCAL_NODEJS_PACKAGES_LIST="/dev/shm/localNodeJsPackagesList.txt";
  addToKnexMigrationsList ${LOCAL_NODEJS_PACKAGES_LIST};
fi;
