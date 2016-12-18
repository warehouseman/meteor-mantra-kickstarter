declare NOCOMMAND="command not found";
declare BUILD_DIR="./.habitat/results/";
declare APP_NAME="mmks";

function buildMeteor()
{
  echo -e "Install Meteor if not installed.";
  local INSTALL_METEOR="yes";
  if [[ -d "${HOME}/.meteor/packages/meteor-tool" ]]; then
    declare METEORVERSION=$(meteor --version  2>&1);
    if [[ "${METEORVERSION#*$NOCOMMAND}" == "$METEORVERSION" ]]; then
      INSTALL_METEOR="no";
    fi
  fi

  if [[ "${INSTALL_METEOR}" == "yes" ]]; then
    echo "### Building Meteor";
    curl https://install.meteor.com/ | sh;
  fi

  echo "### Meteor Built";
  meteor --version;

  if [[ $(find .pkgs/* -maxdepth 0 -type d | wc -l) -gt 0 ]]; then

    mkdir -p node_modules;
    pushd .pkgs >/dev/null;

      echo "~~~~~~~~~~  Copy external modules to node_modules directory ~~~~~~~~~~~~~~~~~~~~~~";
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
    echo "### Building 3rd party npm packages.";
    meteor npm -y install --production;
  fi;

  mkdir -p ${BUILD_DIR};
  meteor build ${BUILD_DIR} --directory --server-only --architecture os.linux.x86_64

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
