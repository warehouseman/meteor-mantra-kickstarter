#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function exportCorePackagesPaths() {
  local PKGS_DIR=$1;
  echo -e "### Identifying core npm packages for Meteor Mantra Kickstarter";
  pushd ${PKGS_DIR} >/dev/null;

    for MODULE_PATH in ./*/
    do
      if touch ${MODULE_PATH}package.json 2>/dev/null; then
        MODULE=$(cat ${MODULE_PATH}package.json  | jq -r .name);
        if [[ "X${MODULE}X" != "XX" ]]; then
          echo -e "~~~~~~~~~~  Link '${MODULE}' into project ~~~~~~~~~~~~~~~~~~~~";
          pushd ${MODULE_PATH} >/dev/null;
            echo "${MODULE}" >> ${LOCAL_NODEJS_PACKAGES_LIST};
            ${METEOR_CMD} npm link;
          popd >/dev/null;
        fi;
      fi;
    done
#    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  exportCorePackagesPaths ${SCRIPTPATH};
fi;
