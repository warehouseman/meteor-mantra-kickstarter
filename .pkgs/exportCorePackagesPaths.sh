#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function exportCorePackagesPaths() {
  local PKGS_DIR=$1;

  local PARENT_PKGS_PATH="../../.pkgs";
  local PKG_EXCLUSIONS="package_exclusions.json";
  local PKG_EXCL_PATH="${PARENT_PKGS_PATH}/${PKG_EXCLUSIONS}";
  local EXCLUSIONS='[""]';

  echo -e "### Identifying core npm packages for Meteor Mantra Kickstarter";

  pushd ${PKGS_DIR} >/dev/null;

    if [[ -f ${PKG_EXCL_PATH} ]]; then
      EXCLUSIONS=$(jq -r .packages_excluded_from_core ${PKG_EXCL_PATH});
    fi;
    echo ${EXCLUSIONS};

    for MODULE_PATH in ./*/
    do
      NODE_META=${MODULE_PATH}package.json;
      # echo ${NODE_META};

      if [[ -r ${NODE_META} && -f ${NODE_META} ]]; then
        MDL=$(cat ${NODE_META}  | jq -r .name);
        if [[ "X${MDL}X" != "XX" ]]; then
          EXCLUDE=$(echo ${EXCLUSIONS} | jq ". | contains([\"${MDL}\"])");
          echo -e "~~~~~~~~~~  Link '${MODULE_PATH}' (${MDL}) into project? Excluded : ${EXCLUDE} ~~~~~~~~~~~";
          if [[ "true" != "${EXCLUDE}" ]]; then
            pushd ${MODULE_PATH} >/dev/null;
              # echo "${MDL} to list ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>";
              echo "${MDL}" >> ${LOCAL_NODEJS_PACKAGES_LIST};
              ${METEOR_CMD} npm link;
            popd >/dev/null;
          fi;
        fi;
      fi;

    done

  popd >/dev/null;

 echo -e "~~~~~~~~~~~~~  ${LOCAL_NODEJS_PACKAGES_LIST}  ~~~~~~~~~~~~~~~~";
 cat ${LOCAL_NODEJS_PACKAGES_LIST};
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  exportCorePackagesPaths ${SCRIPTPATH};
fi;
