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

[ -z $(jq --version) ] && sudo apt -y install jq # || echo "found jq version «$(jq --version)»";
function GetProjectName() {

  local JSON_FILE=$1;
  echo -e "Extracting project name from : ${JSON_FILE}.";
  APP_NAME=$( jq '.name' ${JSON_FILE} | sed 's/"//g' );

}
