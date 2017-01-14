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
  sudo apt -y update && \
  sudo apt -y upgrade && \
  sudo apt -y dist-upgrade && \
  sudo apt -y clean && \
  sudo apt -y autoremove;

  sudo apt -y install jq;
  sudo apt -y install curl git;
  sudo apt -y install build-essential g++;
  sudo apt -y install libpq-dev;

#  sudo apt -y install yarn;

  touch ${FLAG};
  echo "### APT Updated";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  refreshApt;
fi;
