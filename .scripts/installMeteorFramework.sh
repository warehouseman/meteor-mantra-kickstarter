#!/usr/bin/env bash
#
function installMeteorFramework()
{
  local INSTALL_METEOR="yes";
  if [[ -d "${HOME}/.meteor/packages/meteor-tool" ]]; then
    declare METEORVERSION=$(meteor --version  2>&1);
    if [[ "${METEORVERSION#*$NOCOMMAND}" == "$METEORVERSION" ]]; then
      INSTALL_METEOR="no";
    fi
  fi

  if [[ "${INSTALL_METEOR}" == "yes" ]]; then
    echo "### Installing Meteor";
    curl https://install.meteor.com/ | sh;
  fi

  echo "### Meteor Installed";
  export METEOR_CMD="meteor";
  ${METEOR_CMD} --version;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installMeteorFramework;
fi;
