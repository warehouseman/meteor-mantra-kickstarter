#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};


source ${PROJECT_ROOT}/.scripts/trap.sh;
source ${PROJECT_ROOT}/.scripts/installMeteorFramework.sh;
# source ${PROJECT_ROOT}/.scripts/android/buildAndroid.sh;

declare NOCOMMAND="command not found";
declare BUILD_DIR="./.habitat/results/";
declare APP_NAME="${APP_NAME:-meteor-mantra-kickstarter}";

function buildMeteor()
{
  installMeteorFramework;

  if [[ $(find .pkgs/* -maxdepth 0 -type d | wc -l) -gt 0 ]]; then

    mkdir -p node_modules;
    pushd .pkgs >/dev/null;

      echo -e "
      ~~~~~~~~~~  Copy external modules to node_modules directory ~~~~~~~~~~~~~~~~~~~~~~";
      for dir in ./*/
      do
        DNAME=${dir/#.\/};
        DNAME=${DNAME/%\//};
        echo "~~~~~~~~~~  Copying module '${DNAME}' ~~~~~~~~~~~~~~~~~~~~~~";
        rm -fr ../node_modules/${DNAME};
        cp -r ${DNAME} ../node_modules;
      done

      echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

    popd >/dev/null;

  fi;

  if [[ ! -d ./node_modules/react ]]; then
    echo -e "
    ### Building 3rd party npm packages.";
    meteor npm -y install --production;
  fi;

  mkdir -p ${BUILD_DIR};
  echo -e "
  ### Building app, '${APP_NAME}', to ${BUILD_DIR}.";
  meteor build ${BUILD_DIR} --directory --server-only --architecture os.linux.x86_64;

  echo -e "
  ### Preparing app bundle as ${APP_NAME}.tar.gz.";
  cp ./settings.json ${BUILD_DIR}/bundle;
  chmod ug+rw,o-rwx ${BUILD_DIR}/bundle/settings.json;
  cp ./.scripts/deployMeteor.sh ${BUILD_DIR}/bundle;
  chmod ug+rwx,o-rwx ${BUILD_DIR}/bundle/deployMeteor.sh;

  pushd ${BUILD_DIR} >/dev/null;
    rm -fr ${APP_NAME};
    mv bundle ${APP_NAME};
    pushd ${APP_NAME}/programs/server >/dev/null;
      meteor npm install;
    popd >/dev/null;
    tar zcf ${APP_NAME}.tar.gz ${APP_NAME};
  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  buildMeteor;
fi;
