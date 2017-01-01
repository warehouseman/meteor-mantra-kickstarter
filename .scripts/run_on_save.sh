#!/bin/bash
#

function usage() {
	echo -e "USAGE :: ${0} <file_to_watch> <command_to_execute> <parm_1> <parm_2> <parm_n>";
}

if [[ "X$1X" = "XX" ]]; then
  usage;
  exit 1;
fi;

if [[ "X$2X" = "XX" ]]; then
  usage;
  exit 1;
fi;


WATCHED_FILE="$1" # Name of file
THE_COMMAND_TO_RUN="${*:2}" # Command to run on change (takes rest of line)
# PREVIOUS_SAVE_TIME="$(ls --full-time ${WATCHED_FILE} | awk '{ print $7 }')" # Get latest save time
PREVIOUS_MD5=$(md5sum ${WATCHED_FILE} | cut -d " " -f 1); # Get latest message digest
echo ">${PREVIOUS_MD5}<";
declare DEFDIR=$(pwd);
while true
do
  # LATEST_SAVE_TIME="$(ls --full-time ${WATCHED_FILE} | awk '{ print $7 }')" # Compare to new save time
  # if [ "$PREVIOUS_SAVE_TIME" != "${LATEST_SAVE_TIME}" ]; then
  LATEST_MD5=$(md5sum ${WATCHED_FILE} | cut -d " " -f 1); # Compare to new message digest
  if [ "$PREVIOUS_MD5" != "${LATEST_MD5}" ]; then
    # echo " Do ${DEFDIR}/${THE_COMMAND_TO_RUN}";
    PREVIOUS_MD5="${LATEST_MD5}";
    ${THE_COMMAND_TO_RUN};
  fi; # If different, run command

  sleep 1;
done;
