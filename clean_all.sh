#!/usr/bin/env bash
#

declare PKGS_DIR=".pkgs";
function CleanLocalNodePackages() {
  local PKGS_DIR=$1;
  echo "Cleaning local node packages . . . ";
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

  [ -f ~/.userVars.sh ] && sed -i '/NON_STOP/s/.*/export NON_STOP=no;/' ~/.userVars.sh;
  echo "Cleaned local node packages .";
}

function CleanAllInstalledPackages() {
  echo "Cleaning build artifacts . . . ";
  rm -fr node_modules;
  rm -fr .meteor/local/;
  rm -fr .habitat/results;
  rm -fr public/mobile/android/*.apk*;
  rm -fr npm-debug.log;
  rm -fr ${HOME}/.npm-global/lib/node_modules

  CleanLocalNodePackages ${PKGS_DIR};
  if [[ -d ../${PKGS_DIR} ]]; then
    CleanLocalNodePackages ../${PKGS_DIR};
  fi;

  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~??????~~~>>   rm -fr ~/.meteor;
  # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  echo "... cleaned build artifacts.";
}

function RemoveImportedPackages() {
  echo "Removing Imported Packages . . . ";
  rm -fr .e2e_tests/features/5*;
  rm -fr .pkgs/gitignored*;
  echo "... Imported Packages Removed.";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  CleanAllInstalledPackages;
fi;
