#!/usr/bin/env bash
#

export FREESPACE=0;
export FREESPACE_HUMAN=0;
export FREEMEM=0;

function storage() {
  FREESPACE=$(($(stat -f --format="%a*%S" ${HOME})/1000000));
  FREESPACE_HUMAN=$(bc <<< "scale = 3; (${FREESPACE} / 1024 )" );
}

function assess_storage() {
  local MINFREE=$1;
  storage;
  if [ ${FREESPACE} -lt ${MINFREE} ]; then
    echo -e "
               * * *   WARNING * * *
      Your free disk space is: '${FREESPACE}MB'.
       You must have at least: '${MINFREE}MB' free!

  ------------------------------------------------
    ";
  else
    echo "Found '${FREESPACE}MB' of free disk space.";
  fi;
}

function memory() {
  FREEMEM=$(awk '/MemFree/ { printf "%.3f\n", $2/1024/1024 }' /proc/meminfo);
}

function assess_memory() {
  local NEEDMEM=$1;
  memory;

  if echo ${FREEMEM} ${NEEDMEM} | awk '{exit $1 < $2 ? 0 : 1}'; then
    echo -e "
      * * * WARNING * * *

      You have only ${FREEMEM} of available memory!
      Less then ${NEEDMEM}GB of memory may cause random
      misreported build or execution failures as well as
      longer build times.

    Press any key to continue or <ctrl-c> to quit.
    ";
    read -n 1 -s;
  fi;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  storage;
  memory;
  echo "Current available space :  Storage -- ${FREESPACE_HUMAN}GB   Memory -- ${FREEMEM}GB";
fi;
