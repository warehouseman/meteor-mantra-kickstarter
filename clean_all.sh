#!/usr/bin/env bash
#

declare PKGS_DIR=".pkgs";
function CleanLocalNodePackages() {
  local PKGS_DIR=$1;
  # echo "Cleaning local node packages . . . ";
  pushd ${PKGS_DIR} >/dev/null;
    echo -e "In dir $(pwd)";

    for item in *
    do
      if [[ -d ${item} ]]; then
        rm -fr ${item}/node_modules 2>/dev/null;
        rm -fr ${item}/dist 2>/dev/null;
      fi;
    done
  popd >/dev/null;

  sed -i '/NON_STOP/s/.*/export NON_STOP=no;/' ~/.userVars.sh;
  # echo "Cleaned local node packages .";
}

function CleanAllInstalledPackages() {
  echo "Cleaning . . . ";
  rm -fr node_modules;
  rm -fr .meteor/local/;
  rm -fr .meteor/version;
  rm -fr .habitat/results;
  rm -fr public/mobile/android/*.apk*;
  rm -fr npm-debug.log;

  CleanLocalNodePackages ${PKGS_DIR};
  if [[ -d ../${PKGS_DIR} ]]; then
    CleanLocalNodePackages ../${PKGS_DIR};
  fi;


  sed -i '/NON_STOP/s/.*/export NON_STOP=no;/' ~/.userVars.sh;
  echo "Cleaned.";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  CleanAllInstalledPackages;
fi;
