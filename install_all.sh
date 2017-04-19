#!/usr/bin/env bash
#
RUN_IT=${1:-null};

# source .scripts/trap.sh;
source .scripts/free.sh;

source .scripts/refreshApt.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteorFramework.sh;
source .scripts/android/installAndBuildTools.sh;
source .scripts/installMeteorApp.sh;

assess_storage 7000;

assess_memory 0.4;

validateMeteorSettings;

if [[ "${CI:-false}" == "false" ]]; then
  refreshApt;
  installJava;
  installNodeJs;
  installAndroid;
fi;
installChimp;
installMeteorFramework;
installMeteorApp;

sudo apt -y install httping;

declare MSG="";
if [ -f ./settings.json ]; then
  if [ "${RUN_IT}" = "run" ]; then
    meteor --settings=settings.json;
    MSG="
    Done!
    ";
  else
    MSG="

  Next steps:

      Sanity check
      ~~~~~~~~~~~~

        Terminal #1 : One of ...
           - .scripts/startInDevMode.sh
           - .scripts/startInProdMode.sh # (requires PostgreSQL)
        Terminal #2 : meteor npm run acceptance

*OR*

      Build and launch server for mobile
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        export KEYSTORE_PWD=\"obscuregobbledygook\";
        export HOST_SERVER_NAME=\"moon.planet.sun/\";
        export ROOT_URL==\"http://\${HOST_SERVER_NAME}:3000/\";
        export YOUR_FULLNAME=\"You Yourself\";
        export YOUR_ORGANIZATION_NAME=\"YourOrg\";
        ./build_all.sh;
        #
        #  Then run one of these ....
        .scripts/startInDevMode.sh
        # .scripts/startInProdMode.sh # (requires PostgreSQL)   ";

  fi;
else
  MSG="

  Next steps :
     1) # Correctly configure '${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh;'
     2) source ${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh;
     3) ./template.settings.json.sh > settings.json;
     4) meteor --settings=settings.json
     ";
fi;

echo -e "${MSG}";

exit 0;

export KEYSTORE_PWD="obscuregobbledygook";
export HOST_SERVER_NAME="moon.planet.sun";
export ROOT_URL="http://${ROOT_URL}:3000/";
export YOUR_FULLNAME="You Yourself";
export YOUR_ORGANIZATION_NAME="YourOrg";
meteor run --mobile-server=${ROOT_URL}  --settings=settings.json;
#

