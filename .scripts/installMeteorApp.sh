#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/android};
PROJECT_ROOT=${PROJECT_ROOT%/.scripts};
PROJECT_PARENT=$(dirname ${PROJECT_ROOT});

echo ${PROJECT_PARENT};

source ${PROJECT_ROOT}/.scripts/free.sh;

# source ${PROJECT_ROOT}/.scripts/trap.sh;
# source ${PROJECT_ROOT}/.pkgs/install_local_packages.sh;
source ${PROJECT_ROOT}/.pkgs/exportCorePackagesPaths.sh;
# source ${PROJECT_PARENT}/.pkgs/exportImplementationPackagesPaths.sh;
source ${PROJECT_PARENT}/.pkgs/copyPackagesToSubmodule.sh;

source ${PROJECT_ROOT}/.scripts/linkInLocalNodePackages.sh;

export LOCAL_NODEJS_PACKAGES_LIST=/dev/shm/localNodeJsPackagesList.txt;

function installMeteorApp()
{

  assess_memory 1.0;

  echo "" > ${LOCAL_NODEJS_PACKAGES_LIST};
#  exportImplementationPackagesPaths ${PROJECT_PARENT}/.pkgs;
  copyPackagesToSubmodule ${PROJECT_PARENT}/.pkgs ${PROJECT_ROOT}/.pkgs;
  exportCorePackagesPaths ${PROJECT_ROOT}/.pkgs;

  linkInLocalNodePackages ${LOCAL_NODEJS_PACKAGES_LIST};

  pushd ${PROJECT_ROOT} > /dev/null;

#    install_local_packages;

    echo "### Installing 3rd party npm packages. ###";
    ${METEOR_CMD} npm -y install;
    # yarn install;

  popd > /dev/null;

  mkdir -p /tmp/db; touch /tmp/db/mmks.sqlite;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo "### Installing Meteor App.";
  installMeteorApp;
  echo "### Installed Meteor App.";
fi;
