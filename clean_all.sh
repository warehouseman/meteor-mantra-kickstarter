#!/usr/bin/env bash
#
function CleanAllInstalledPackages() {
  echo "Cleaning . . . ";
  rm -fr node_modules;
  rm -fr .meteor/local/;
  rm -fr .meteor/version;
  rm -fr .habitat/results;
  rm -fr public/mobile/android/*.apk*;
  rm -fr .pkgs/mmks_widget/node_modules;
  rm -fr .pkgs/mmks_widget/dist;
  rm -fr .pkgs/mmks_book/node_modules;
  rm -fr .pkgs/mmks_book/dist;
  rm -fr npm-debug.log;

  sed -i '/NON_STOP/s/.*/export NON_STOP=no;/' ~/.userVars.sh;
  echo "Cleaned.";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  CleanAllInstalledPackages;
fi;
