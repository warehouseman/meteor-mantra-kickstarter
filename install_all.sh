#!/usr/bin/env bash
#

source .scripts/refreshApt.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteor.sh;
# source .pkgs/install_local_packages.sh;

refreshApt;
installJava;
installNodeJs;
installChimp;
installMeteor;

if [ -f ./settings.json ]; then
  if [ "${1}" = "run" ]; then
    meteor --settings=settings.json;
    exit 0;
  fi;
fi;

echo -e "

  Next steps :
     1) cp settings.json.example settings.json
     2) # Correctly configure 'settings.json'
     3) meteor --settings=settings.json
     ";
