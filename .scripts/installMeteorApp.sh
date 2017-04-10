#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/android};
PROJECT_ROOT=${PROJECT_ROOT%/.scripts};

# source ${PROJECT_ROOT}/.scripts/trap.sh;
source ${PROJECT_ROOT}/.pkgs/install_local_packages.sh;

# export METEOR_CMD=${METEOR_CMD:=meteor};

function installMeteorApp()
{

  FREEMEM=$(awk '/MemFree/ { printf "%.3f \n", $2/1024/1024 }' /proc/meminfo);
  NEEDMEM=1.0;
  # echo "Fail if free:${FREEMEM} -lt  needed:${NEEDMEM}";
  if echo ${FREEMEM} ${NEEDMEM} | awk '{exit $1 < $2 ? 0 : 1}'; then
    echo -e "
      * * * WARNING * * *

      You have only ${FREEMEM} of available memory!
      Less then ${NEEDMEM}GB of memory may cause random
      misreported build or execution failures as well as
      longer build times.

    Press any key to continue or <ctrl-c> to quit.
    ";
    read -n 1 -s;
  fi;

  pushd ${PROJECT_ROOT} > /dev/null;
    install_local_packages;
  popd > /dev/null;

  echo "### Installing 3rd party npm packages. ###";
  ${METEOR_CMD} npm -y install;
  # yarn install;

  mkdir -p /tmp/db; touch /tmp/db/mmks.sqlite;
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installMeteorApp;
  echo "### Installed Meteor App.";
fi;
