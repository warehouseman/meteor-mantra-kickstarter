#!/usr/bin/env bash
#
export APP_NAME="";
export BUILD_DIR="./.habitat/results";

set -e;
# source .scripts/trap.sh;

source .scripts/utils.sh;
source .scripts/android/installAndBuildTools.sh;
source .scripts/refreshApt.sh;
source .scripts/buildMeteor.sh;
source .scripts/installMeteorApp.sh;


declare JSON_FILE="./package.json";
GetProjectName ${JSON_FILE};
echo -e "Extracted project name '${APP_NAME}' from '${JSON_FILE}'.";
echo -e "Ignoring project name '${APP_NAME}' setting 'mmks' instead.";
APP_NAME="mmks";

echo -e "### Refreshing APT";
refreshApt;

echo -e "### Preparing To Build AndroidAPK";
PrepareToBuildAndroidAPK;

echo -e "### Prebuild Meteor App";
installMeteorApp;

echo -e "### Building AndroidAPK as ${APP_NAME}";
BuildAndroidAPK;

echo -e "### Re-building Meteor App; bundling APK ";
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
