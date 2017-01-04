#!/usr/bin/env bash
#
RUN_IT=${1:-null};

source .scripts/refreshApt.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteorFramework.sh;
source .scripts/android/installAndroid.sh;
source .scripts/installMeteorApp.sh;
# source .pkgs/install_local_packages.sh;

refreshApt;
installJava;
installNodeJs;
installChimp;
installMeteorFramework;
installAndroid;
installMeteorApp;

declare MSG="";
if [ -f ./settings.json ]; then
  if [ "${RUN_IT}" = "run" ]; then
    meteor --settings=settings.json;
    MSG="
    Done!
    ";
  else
    MSG="

  Next step :
     1) meteor --settings=settings.json
     ";

  fi;
else
  MSG="

  Next steps :
     1) cp settings.json.example settings.json
     2) # Correctly configure 'settings.json'
     3) meteor --settings=settings.json
     ";
fi;

echo -e "${MSG}";
