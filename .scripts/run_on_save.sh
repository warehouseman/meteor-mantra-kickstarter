#!/usr/bin/env bash
#
WATCH_DIRECTORY=$1;
shift;

EVENT_TASK=$1;
shift;

IGNORE_PATHS="$@";

PKG="inotify-tools" apt show ${PKG} &>/dev/null || sudo apt -y install ${PKG};

echo "Will execute : '${EVENT_TASK}'";

function doIt() {
  sleep 1;
  ${EVENT_TASK};
};

while true #run indefinitely
do
inotifywait -qqr -e close_write,move,create,delete ${IGNORE_PATHS} ${WATCH_DIRECTORY} && doIt;
done
