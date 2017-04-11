#!/usr/bin/env bash
#

export FREESPACE=0;
export FREESPACE_HUMAN=0;
export FREEMEM=0;

function storage() {
  FREESPACE=$(($(stat -f --format="%a*%S" ${HOME})/1000000));
  FREESPACE_HUMAN=$(bc <<< "scale = 3; (${FREESPACE} / 1024 )" );
}

function memory() {
  FREEMEM=$(awk '/MemFree/ { printf "%.3f\n", $2/1024/1024 }' /proc/meminfo);
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  storage;
  memory;
  echo "Current available space :  Storage -- ${FREESPACE_HUMAN}GB   Memory -- ${FREEMEM}GB";
fi;
