#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function exportCorePackagesPaths() {
  local PKGS_DIR=$1;
  echo -e "### Identifying core npm packages for Meteor Mantra Kickstarter";
  pushd ${PKGS_DIR} >/dev/null;

    for mdl in ./*/
    do
      if touch ${mdl}package.json 2>/dev/null; then
        if [[ "X$(cat ${mdl}package.json  | jq -r .name)X" != "XX" ]]; then
          echo -e "~~~~~~~~~~  Link '${mdl}' into project ~~~~~~~~~~~~~~~~~~~~";
          pushd ${mdl} >/dev/null;
            echo "$(basename ${mdl})" >> ${LOCAL_NODEJS_PACKAGES_LIST};
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
