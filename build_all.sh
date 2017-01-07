#!/usr/bin/env bash
#
export APP_NAME="":

source .scripts/trap.sh;
source .scripts/utils.sh;
source .scripts/android/installAndroid.sh;

declare JSON_FILE="./package.json";
GetProjectName ${JSON_FILE};
echo -e "Extracted project name "${APP_NAME}" from : ${JSON_FILE}.";

source .scripts/refreshApt.sh;
# source .pkgs/install_local_packages.sh;
source .scripts/buildMeteor.sh;

export BUILD_DIR="./.habitat/results";

refreshApt;
# install_local_packages;
PrepareToBuildAndroidAPK;
BuildAndroidAPK;

buildMeteor;

echo -e "

  Next steps:

      Launch server for mobile
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        Terminal #1 : meteor run --mobile-server=\${HOST_SERVER_NAME}  --settings=settings.json;
        Terminal #2 : meteor npm run acceptance
     Android device : http://\${HOST_SERVER_NAME}:3000/
";

# echo -e "     FOR HABITAT VERSION

#   Next steps :
#      1) scp ${BUILD_DIR}/${APP_NAME}.tar.gz ${APP_NAME}.planet.sun:~
#      2) ssh ${APP_NAME}.planet.sun
#           tar zxf ${APP_NAME}.tar.gz;
#           cd ${APP_NAME};
#           ./deployMeteor;


#      ";
