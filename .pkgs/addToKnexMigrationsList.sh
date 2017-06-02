#!/usr/bin/env bash
#

pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};
echo "SCRIPTPATH - ${SCRIPTPATH}";

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";
declare KNEX_MIGRATIONS_DIRECTORY="${SCRIPTPATH}/../server/api/.knex/migrations";
# declare KNEX_MIGRATIONS_DIRECTORY="${PROJECT_ROOT}/server/api/.knex/migrations";

timestamp() {
  date +"%Y%m%d%H%M%S";
}

function addToKnexMigrationsList() {

 echo -e "~~~~~~~ '.scripts/addToKnexMigrationsList'  ~~~~~~~~~";

  local LIST=${1};
  echo ${LIST};
  mkdir -p ${KNEX_MIGRATIONS_DIRECTORY};
  pushd ${KNEX_MIGRATIONS_DIRECTORY} >/dev/null;
    echo -e " Now in directory : \n$(pwd) "
    ls -l;

    local MODULES=( $(cat "${LIST}") );
    for MODULE in "${MODULES[@]}"
    do
      local TS=$(timestamp);
      local MIGRATION_FILE="${PROJECT_ROOT}/.pkgs/${MODULE}/src/server/api/migrations.js";
      if [[ -f ${MIGRATION_FILE} ]]; then
        export DESTINATION_FILE=$(ls -1 *${MODULE}.js 2>/dev/null | tail -n 1);
        if [[ -f ${DESTINATION_FILE} ]]; then
          echo -e "~~~~~~~~ Copying migrations of '${MODULE}' to ${DESTINATION_FILE} ~~~~~~~~~";
          cp ${MIGRATION_FILE} ${DESTINATION_FILE};
        else
          echo -e "~~~~~~~~ Copying migrations of '${MODULE}' to ${TS}_${MODULE}.js ~~~~~~~~~";
          cp ${MIGRATION_FILE} ${TS}_${MODULE}.js;
        fi;
      else
        echo -e "~~~~~~~~  The module '${MODULE}' has no migrations ~~~~~~~~~~~";
      fi;
    done

  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  addToKnexMigrationsList ${LOCAL_NODEJS_PACKAGES_LIST};
fi;
