#!/usr/bin/env bash
#

source .pkgs/install_local_packages.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteor.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .scripts/refreshApt.sh;

refreshApt;
installJava;
installNodeJs;
installChimp;
installMeteor;
install_local_packages;

echo -e "

  Next steps :
     1) cp settings.json.example settings.json
     2) # Correctly configure 'settings.json'
     3) meteor --settings=settings.json
     ";
