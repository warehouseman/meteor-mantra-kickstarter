#!/usr/bin/env bash
#

source .scripts/refreshApt.sh;
# source .pkgs/install_local_packages.sh;
source .scripts/buildMeteor.sh;

export BUILD_DIR="./.habitat/results";

refreshApt;
# install_local_packages;
buildMeteor;

echo -e "

  Next steps :
     1) scp ${BUILD_DIR}/mmks.tar.gz mmks.planet.sun:~
     2) ssh mmks.planet.sun
          tar zxf mmks.tar.gz;
          cd mmks;
          ./deployMeteor;


     ";
