#!/usr/bin/env bash
#
function installMeteorFramework()
{
  local CI=${CI:-false};
  local INSTALL_METEOR="yes";
  if [[ -d "${HOME}/.meteor/packages/meteor-tool" ]]; then
    declare METEORVERSION=$(meteor --version  2>&1);
    if [[ "${METEORVERSION#*$NOCOMMAND}" == "$METEORVERSION" ]]; then
      INSTALL_METEOR="no";
    fi
  fi

  if [[ "${INSTALL_METEOR}" == "yes" ]]; then
    echo "### Installing Meteor";
    local release_num=$(cat .meteor/release | cut -d "@" -f 2);
    echo "Obtaining release number : ${release_num}";
    curl https://install.meteor.com/?release=${release_num} | sh;
  fi

  echo "### Meteor Installed";
  export METEOR_CMD="meteor";
  ${METEOR_CMD} --version;

  if [ "${CI}" = "false" ]; then
    if ! $(cat /etc/sysctl.conf | grep "fs.inotify.max_user_watches" >/dev/null); then
      echo " boost watch capacity ...";
      echo "fs.inotify.max_user_watches = 524288" | \
      sudo tee -a /etc/sysctl.conf && sudo sysctl -p >/dev/null;
    fi;
  fi;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installMeteorFramework;
fi;
