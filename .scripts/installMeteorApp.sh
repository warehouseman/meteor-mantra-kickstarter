#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/android};
PROJECT_ROOT=${PROJECT_ROOT%/.scripts};

source ${PROJECT_ROOT}/.scripts/trap.sh;
source ${PROJECT_ROOT}/.pkgs/install_local_packages.sh;

declare METEOR_CMD=""; : ${METEOR_CMD:=meteor};

function installMeteorApp()
{

  pushd ${PROJECT_ROOT} > /dev/null;
    install_local_packages;
  popd > /dev/null;

  echo "### Installing 3rd party npm packages.";
  ${METEOR_CMD} npm -y install;
  # yarn install;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installMeteorApp;
  echo "### Installed Meteor App.";
fi;
