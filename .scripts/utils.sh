#!/usr/bin/env bash
#


function UpdateEnvVars() {

  local ENV_FILE=$1;
  local ENV_NAME=$2;
  local ENV_VAL=$3;
  local ENV_FILE_NAME=$(basename ${ENV_FILE});

  [ -f "${ENV_FILE}" ] || touch ${ENV_FILE};
  echo -e "Correcting ${ENV_NAME} in '${ENV_FILE}' variables.";

  if [[ $(grep -c "export ${ENV_NAME}=${ANDROID_HOME}"  ${ENV_FILE}) -lt 1 ]]; then
    while [[ $(grep -c ${ENV_NAME} ${ENV_FILE}) -gt 0 ]]; do
      sed -i "/${ENV_NAME}/d" ${ENV_FILE};
    done;
    echo -e "\nexport ${ENV_NAME}=${ENV_VAL};\n" | tee -a ${ENV_FILE};
  fi;

  cat ${ENV_FILE} | uniq > /dev/shm/${ENV_FILE_NAME};
  mv /dev/shm/${ENV_FILE_NAME} ${ENV_FILE};

}

[ -z $(jq --version &>/dev/null ) ] && sudo apt -y install jq # || echo "found jq version «$(jq --version)»";
function GetProjectName() {

  local JSON_FILE=$1;
  echo -e "Extracting project name from : ${JSON_FILE}.";
  APP_NAME=$( jq '.name' ${JSON_FILE} | sed 's/"//g' );

}

function validateMeteorSettings() {

  if [[ "null" = "${HOST_SERVER_NAME}" || -z "${HOST_SERVER_NAME}" ]]; then
    echo -e "
     The environment variable 'HOST_SERVER_NAME' is undefined!
         Secret settings under ...
            '/home/$(whoami)/.ssh/hab_vault/\${HOST_SERVER_NAME}/secrets.sh;'
                ... could not be read.
    ";
    exit 1;
  fi;

  declare SECRETS_FILE="${HOME}/.ssh/hab_vault/${HOST_SERVER_NAME}/secrets.sh";
  echo -e "${PRTY} Verify 'settings.json' or generate from ${SECRETS_FILE}";
  if [[ "${CI}" = "true" ]]; then
    # echo "A";
    ./template.settings.json.sh > settings.json;
  else
    # echo "B";
    if [ ! -f settings.json ]; then
    # echo "C";
      if [ -f ${SECRETS_FILE} ]; then
    # echo "D";
        source ${SECRETS_FILE};
        ./template.settings.json.sh > settings.json;
      else
        echo -e "
        Your secret settings were not found at :

             ${SECRETS_FILE};\n";
        exit 1;
      fi;
    # echo "E";
    fi;
    # cat settings.json;
    # echo "F";
  fi;

  if [ -f settings.json ]; then
    LG_DOM=$(jq -r .LOGGLY_SUBDOMAIN settings.json);
    # echo ${LG_DOM};
    if [[ -z ${LG_DOM} || "${LG_DOM}" = "null" ]]; then
      echo -e "
      Your secret settings file, '${SECRETS_FILE}', is incomplete.
      'LOGGLY_SUBDOMAIN' is required\n";
      # cat ${SECRETS_FILE};
      exit 1;
    fi;
    echo -e "Result : ";
    grep "LOGGLY_SUBDOMAIN" settings.json;
  fi;



}

function haveUtils() {
  echo -e "Yes.  We sourced 'utils.js'";
}