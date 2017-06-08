#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/android};
PROJECT_ROOT=${PROJECT_ROOT%/.scripts};
PROJECT_PARENT=$(dirname ${PROJECT_ROOT});

echo ${PROJECT_PARENT};

source ${PROJECT_ROOT}/.scripts/free.sh;

# source ${PROJECT_ROOT}/.scripts/trap.sh;
# source ${PROJECT_ROOT}/.pkgs/install_local_packages.sh;   DEPRECATED ????
source ${PROJECT_ROOT}/.pkgs/exportCorePackagesPaths.sh;
source ${PROJECT_ROOT}/.pkgs/addToKnexMigrationsList.sh;
# source ${PROJECT_PARENT}/.pkgs/exportImplementationPackagesPaths.sh;  DEPRECATED ????

source ${PROJECT_ROOT}/.scripts/linkInLocalNodePackages.sh;

export LOCAL_NODEJS_PACKAGES_LIST=/dev/shm/localNodeJsPackagesList.txt;

function installMeteorApp()
{

  if [[ "${CI:-false}" == "false" ]]; then
    assess_memory 1.0;
  fi;

  echo "" > ${LOCAL_NODEJS_PACKAGES_LIST};

  echo -e "#####################################################";
  echo -e "Copy packages to submodule with 'gitignored' prefix";
  echo -e "#####################################################";

  if [[ -x "${PROJECT_PARENT}/.pkgs/copyPackagesToSubmodule.sh" ]]; then
    source ${PROJECT_PARENT}/.pkgs/copyPackagesToSubmodule.sh;
    copyPackagesToSubmodule ${PROJECT_PARENT}/.pkgs ${PROJECT_ROOT}/.pkgs;
  fi;

  echo -e "######################################################################";
  echo -e "'npm link' all eligible packages in '${PROJECT_ROOT}/.pkgs'.";
  echo -e "######################################################################";
  # read -n 1 -s -p "Press any key to continue";

  exportCorePackagesPaths ${PROJECT_ROOT}/.pkgs;

  echo -e "##################################";
  echo -e "Prepare knex migrations. Working dir '$(pwd)'";
  echo -e "##################################";
  # read -n 1 -s -p "Press any key to continue";

  addToKnexMigrationsList ${LOCAL_NODEJS_PACKAGES_LIST};

  echo -e "###################################";
  echo -e "'npm-link-save' all local packages.";
  echo -e "###################################";
  echo -e "Installing 'npm-link-save'.";
  # ${METEOR_CMD} npm -y -g install npm-link-save;
  npm -y -g install npm-link-save;

  # read -n 1 -s -p "Press any key to continue";

  linkInLocalNodePackages ${LOCAL_NODEJS_PACKAGES_LIST};

  pushd ${PROJECT_ROOT} > /dev/null;

#    install_local_packages;  DEPRECATED???

    echo "### Installing 3rd party npm packages. ###";
    # read -n 1 -s -p "Press any key to continue";
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
