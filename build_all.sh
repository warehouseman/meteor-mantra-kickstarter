#!/usr/bin/env bash
#
export APP_NAME="":

set -e;
# source .scripts/trap.sh;
source .scripts/utils.sh;
source .scripts/android/installAndBuildTools.sh;

declare JSON_FILE="./package.json";
GetProjectName ${JSON_FILE};
echo -e "Extracted project name "${APP_NAME}" from : ${JSON_FILE}.";

source .scripts/refreshApt.sh;
# source .pkgs/install_local_packages.sh;
source .scripts/buildMeteor.sh;

export BUILD_DIR="./.habitat/results";

refreshApt;
echo -e "### Preparing To Build AndroidAPK";
PrepareToBuildAndroidAPK;
echo -e "### Building AndroidAPK";
BuildAndroidAPK;
echo -e "### Building Meteor App";
buildMeteor;

echo -e "

  Next steps:

      Launch server for mobile
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        Terminal #1 : One of ...
           - .scripts/startInDevMode.sh
           - .scripts/startInProdMode.sh # (requires PostgreSQL)
        Terminal #2 : meteor npm run acceptance
     Android device : ${HOST_SERVER_PROTOCOL}://${HOST_SERVER_NAME}:${HOST_SERVER_PORT}/
";

# echo -e "     FOR HABITAT VERSION

#   Next steps :
#      1) scp ${BUILD_DIR}/${APP_NAME}.tar.gz ${APP_NAME}.planet.sun:~
#      2) ssh ${APP_NAME}.planet.sun
#           tar zxf ${APP_NAME}.tar.gz;
#           cd ${APP_NAME};
#           ./deployMeteor;


#      ";
