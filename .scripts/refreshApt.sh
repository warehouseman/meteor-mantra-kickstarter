#!/usr/bin/env bash
#
declare FLAG="/tmp/updatedApt";
set -e;
function refreshApt()
{
  if [[ -f ${FLAG} ]]; then
    declare -i LAPSE=$(expr $(date +%s) - $(date +%s -r /tmp/updatedApt ));
    if (( LAPSE < 90000 )); then
      echo "### APT is up to date.";
      return;
    fi;
  fi

  echo "### Update APT";
  sudo apt-get -y update && \
  sudo apt-get -y upgrade && \
  sudo apt-get -y dist-upgrade && \
  sudo apt-get -y clean && \
  sudo apt-get -y autoremove;

  sudo apt-get -y install curl git;
  sudo apt-get -y install build-essential g++;

#  sudo apt-get -y install yarn;

  touch ${FLAG};
  echo "### APT Updated";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  refreshApt;
fi;
