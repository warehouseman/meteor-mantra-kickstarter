#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

echo PROJECT_ROOT=${PROJECT_ROOT};
${PROJECT_ROOT}/.scripts/free.sh;
#
declare METEOR="${METEOR_CMD:-meteor}";
declare LOGS_DIR="${CIRCLE_ARTIFACTS:-/var/log/meteor}";

echo -e "Will write logs to : ${LOGS_DIR}";
sudo mkdir -p ${LOGS_DIR};
sudo chown $(whoami):$(whoami) ${LOGS_DIR};
sudo chmod +rwx ${LOGS_DIR};
#
export RELEASE=$(cat ${PROJECT_ROOT}/.meteor/release | cut -d "@" -f 2);
export ANAME=$(cat package.json | jq -r .name);
export APP_NAME="${ANAME:-app}";
date > ${LOGS_DIR}/${APP_NAME}.log;
#
echo -e "Using meteor version : ${RELEASE}" | tee -a ${LOGS_DIR}/${APP_NAME}.log;
#
cd ${PROJECT_ROOT};
declare SQLITE_DIR="/tmp/db";
[ ! -d ${SQLITE_DIR} ] && mkdir -p ${SQLITE_DIR};

meteor npm run knex_cont;
#
export X=${HOST_SERVER_PROTOCOL:="http"};
export X=${HOST_SERVER_NAME:="localhost"};
export X=${HOST_SERVER_PORT:="3000"};
export ROOT_URL=${HOST_SERVER_PROTOCOL}://${HOST_SERVER_NAME}:${HOST_SERVER_PORT};

if [[ "$1" = "reset" ]]; then
  echo -e "Resetting the database.";
  ${METEOR} reset;
else
  echo -e "Append 'reset' to the command to solve stuck 'Starting your app...' problems.";
fi;

declare START="${METEOR} run \
    --release ${RELEASE} \
    --settings=settings.json"
echo -e ${START};
${START};

# ${METEOR} run \
#     --release ${RELEASE} \
#     --settings=settings.json \
#    2>&1 | tee -a ${LOGS_DIR}/${APP_NAME}.log;
