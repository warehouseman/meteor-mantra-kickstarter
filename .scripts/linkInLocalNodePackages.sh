#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function linkInLocalNodePackages() {

 echo -e "~~~~~~~~~~ '.scripts/linkInLocalNodePackages'  ~~~~~~~~~~~~~~~~~~";

  local LIST=${1};
  # mkdir -p ${PROJECT_ROOT}/node_modules;
  # pushd ${PROJECT_ROOT}/node_modules >/dev/null;
  mkdir -p ${PROJECT_ROOT};
  pushd ${PROJECT_ROOT} >/dev/null;
    echo -e " Now in directory : \n$(pwd) "
    local MODULES=( $(cat "${LIST}") )
    for MODULE in "${MODULES[@]}"
    do
      echo -e "~~~~~~~~~~  Linking and saving '${MODULE}'  ~~~~~~~~~~~~~~~~~~";
      # ${METEOR_CMD} npm link ${MODULE};
      npm-link-save ${MODULE};
    done
  #   rm -f "${LIST}";
  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  linkInLocalNodePackages ${LOCAL_NODEJS_PACKAGES_LIST};
fi;
