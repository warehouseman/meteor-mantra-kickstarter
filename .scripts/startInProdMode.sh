#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/.scripts};

if [[ ! ${CI} ]]; then
  if [[ ! -f ${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh ]]; then
    echo -e "Unable to find the file \"${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh\".
            Did you run \".scripts/preFlightCheck.sh\"
    ";
    exit;
  fi;
  source ${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh;
fi;


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
echo -e "  * * * CONFIGURATION FOR APP SERVER ; ${HOST_SERVER_NAME} * * *
   dialect: ${RDBMS_DIALECT},
connection: {
        port : ${RDBMS_PORT},
        host : ${RDBMS_HST},
    database : ${RDBMS_DB},
        user : ${RDBMS_UID},
    password : $(head -c $(( ${#RDBMS_PWD} - 4 )) /dev/zero | tr '\0' '*')${RDBMS_PWD:$(( ${#RDBMS_PWD} - 4 ))}
}
";

meteor npm run knex_prod;
#
export X=${HOST_SERVER_PROTOCOL:="http"};
export X=${HOST_SERVER_NAME:="localhost"};
export X=${HOST_SERVER_PORT:="3000"};
export ROOT_URL=${HOST_SERVER_PROTOCOL}://${HOST_SERVER_NAME}:${HOST_SERVER_PORT};
echo -e "${METEOR} run \
    --release ${RELEASE} \
    --production \
    --settings=settings.json \
   2>&1 | tee -a ${LOGS_DIR}/${APP_NAME}.log;"

if [[ "$1" = "reset" ]]; then
  echo -e "Resetting the database.";
  ${METEOR} reset;
else
  echo -e "
  If you find you get stuck at
       'Starting your app...'
  then append 'reset' to the command to clear the problem: Eg.,
       .scripts/startInProdMode.sh reset
  ";
fi;

${METEOR} run \
    --release ${RELEASE} \
    --production \
    --settings=settings.json \
   2>&1 | tee -a ${LOGS_DIR}/${APP_NAME}.log;

