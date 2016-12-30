#!/usr/bin/env bash
#
if [[ "$1" == "clean" ]]; then
  echo "Cleaning . . . ";
  rm -fr node_modules; 
#  rm -fr yarn*;
  rm -fr .meteor/local/; 
  rm -fr .meteor/version; 
  rm -fr .pkgs/mmks_widget/node_modules;
#  rm -fr .pkgs/mmks_widget/yarn*;
  echo "Cleaned.";
fi;

