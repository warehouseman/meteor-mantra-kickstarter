#!/usr/bin/env bash
#

declare PKGS_DIR=".pkgs";
function CleanLocalNodePackages() {
  local PKGS_DIR=${1};
  local SHALLOW=${2};
  echo "Cleaning local node packages . . . ";
  pushd ${PKGS_DIR} >/dev/null;
    echo -e "In dir $(pwd)";

    for item in *
    do
      if [[ -d ${item} ]]; then
        rm -fr ${item}/node_modules 2>/dev/null;
        rm -fr ${item}/dist 2>/dev/null;
      fi;
    done;
    [ -z ${SHALLOW} ] && rm -fr gitignored_*;
  popd >/dev/null;

  [ -f ~/.userVars.sh ] && sed -i '/NON_STOP/s/.*/export NON_STOP=no;/' ~/.userVars.sh;
  echo "Cleaned local node packages .";
}

function CleanAllInstalledPackages() {
  local SHALLOW=${1};
  echo "Cleaning build artifacts. SHALLOW = ${SHALLOW}";
  rm -fr node_modules;
  rm -fr .meteor/local/;
  rm -fr .habitat/results;
  rm -fr public/mobile/android/*.apk*;
  rm -fr npm-debug.log;
  rm -fr ${HOME}/.npm-global/lib/node_modules
  rm -fr .e2e_tests/features/5*;

  .scripts/dropLocalPackages.sh;

  CleanLocalNodePackages ${PKGS_DIR} ${1};
  if [[ -d ../${PKGS_DIR} ]]; then
    CleanLocalNodePackages ../${PKGS_DIR} ${1};
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
  declare SHALLOW=${1};
  CleanAllInstalledPackages ${SHALLOW};
fi;
