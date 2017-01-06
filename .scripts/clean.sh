#!/usr/bin/env bash
#
function CleanAllInstalledPackages() {
  echo "Cleaning . . . ";
  rm -fr node_modules;
  rm -fr .meteor/local/;
  rm -fr .meteor/version;
  rm -fr .pkgs/mmks_widget/node_modules;

  echo "Cleaned.";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  CleanAllInstalledPackages;
fi;
