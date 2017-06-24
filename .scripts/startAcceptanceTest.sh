#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
declare PROJECT_ROOT=${SCRIPTPATH%/.scripts};

declare E2E=${PROJECT_ROOT}/.e2e_tests;
declare E2E_FEATURES=".e2e_tests/features";
declare E2E_FEATURES_PATH="/dev/null";

declare GITIG_PREFIX="gitignored_";

declare TRANSIENT_FEATURES_PREFIX=5;
declare WILDCARD="${TRANSIENT_FEATURES_PREFIX}*";

echo -e "PROJECT_ROOT=${PROJECT_ROOT}";
echo -e "Acceptance test dir : ${E2E}";
${PROJECT_ROOT}/.scripts/free.sh;

declare PKG_EXCL_PATH="${PACKAGE_EXCLUSIONS:-../.pkgs/package_exclusions.json}";

declare CORE_EXCLUSIONS="[]";
declare CONTAINER_EXCLUSIONS="[]";

if [[ -f ${PKG_EXCL_PATH} ]]; then
  CORE_EXCLUSIONS=$(jq -r .packages_excluded_from_core ${PKG_EXCL_PATH});
  CONTAINER_EXCLUSIONS=$(jq -r .packages_excluded_from_wrapper ${PKG_EXCL_PATH});
fi;

# echo -e "Packages excluded from Core    : ${CORE_EXCLUSIONS}";
# echo -e "Packages excluded from Wrapper : ${CONTAINER_EXCLUSIONS}";

declare CHIMP="${CHIMP_CMD:-${PROJECT_ROOT}/node_modules/.bin/chimp}";
declare LOGS_DIR="${CIRCLE_ARTIFACTS:-/var/log/meteor}";

if pushd ${E2E_FEATURES} &>/dev/null; then
    E2E_FEATURES_PATH=$(pwd);
    echo -e "Purge transient tests (external packages prefixed with '5xx_'), if any.";
    find . -type l -iname "${WILDCARD}" | xargs rm -f  2>/dev/null;  # purge symkinks
    find . -type d -iname "${WILDCARD}" | xargs rm -fr 2>/dev/null;  # purge directories
  popd &>/dev/null;
fi;

pushd .pkgs >/dev/null;
  let COUNTER=$(( 100 * TRANSIENT_FEATURES_PREFIX ));
  # echo -e "Prefix is ${COUNTER}";
  for MODULE_PATH in ./*/
  do
    if touch ${MODULE_PATH}package.json 2>/dev/null; then
      # echo -e "MODULE_PATH : ${MODULE_PATH}";

      MODULE_FILENAME=$(basename ${MODULE_PATH})
      MODULE_CODENAME=${MODULE_FILENAME#${GITIG_PREFIX}};
      # echo -e "MODULE_FILENAME : ${MODULE_FILENAME} ";
      # echo -e "MODULE_CODENAME : ${MODULE_CODENAME} ";
      EXCLUDE=true;
      if [[  ${MODULE_FILENAME} = ${MODULE_CODENAME} ]]; then
        # echo -e "Core : ${MODULE_CODENAME}";
        EXCLUDE=$(echo ${CORE_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
      else
        # echo -e "Container : ${MODULE_CODENAME}";
        EXCLUDE=$(echo ${CONTAINER_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
      fi;

      # echo -e "   * * *  EXCLUDE * * *  : ${EXCLUDE}";

      if [[  ${EXCLUDE} != "true"  ]]; then
        # echo -e "\n * * Collecting e2e tests for '${MODULE_FILENAME}'";
        MODULE=$(cat ${MODULE_PATH}package.json | jq -r .name);
        if [[ "X${MODULE}X" != "XX" ]]; then
          pushd ${MODULE_PATH} >/dev/null;
            if [[ -d ${E2E_FEATURES} ]]; then
              ((COUNTER++));
              # ls ${E2E_FEATURES};
              MODULE_NAME=$(ls ${E2E_FEATURES});
              echo -e "\n~~~~~~~~~~  Link '${MODULE}' e2e tests into submodule as '${COUNTER}_${MODULE_NAME}'";
              pushd ${E2E_FEATURES_PATH} >/dev/null;
                echo -e "ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME}\n";
                ln -s ../../.pkgs/$(basename ${MODULE_PATH})/.e2e_tests/features/${MODULE_NAME} ${COUNTER}_${MODULE_NAME};
              popd >/dev/null;
            else
              echo -e "\n~~~~~~~~~~  Found '${MODULE}' but no e2e tests for it\n{not linked}\n";
            fi;
          popd >/dev/null;
        fi;
      else
        echo -e "\n~~~~~~~~~~  Found '${MODULE_FILENAME}' on exclusion list\n(not linked)\n"
      fi;

    fi;
  done;

popd >/dev/null;

export IDX=150;  # 15 minutes
while printf "."; ! httping -qc1 http://localhost:3000 && ((IDX-- > 0));
do
  sleep 6;
done;

${CHIMP} ${E2E}/chimp-config.js --ddp=http://localhost:3000 --path=${E2E};
echo -e "

................................................................";
