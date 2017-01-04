#!/usr/bin/env bash
#

LCTN=$0; if [[ "${LCTN}" = "-bash" ]]; then LCTN="."; fi;
pushd `dirname ${LCTN}` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
PROJECT_ROOT=${SCRIPTPATH%/android};
PROJECT_ROOT=${PROJECT_ROOT%/.scripts};

set -e;
# source ${PROJECT_ROOT}/.scripts/trap.sh;
source ${PROJECT_ROOT}/.scripts/utils.sh;

GetProjectName ${PROJECT_ROOT}/package.json;

export ANDROID_PLACE="${HOME}/.android";
export ANDROID_SDK="android-sdk-linux";
export ANDROID_HOME="${ANDROID_PLACE}/${ANDROID_SDK}";
export ENV_FILE="${HOME}/.profile";

UpdateEnvVars ${ENV_FILE} ANDROID_HOME ${ANDROID_HOME};

export TMP_PLUGIN_LIST="/tmp/plugins.txt";
export PLUGIN_NAME="";
export PLUGIN_NUM="";

export SDK_TOOLS_ZIP="tools_r24.4.1-linux.zip";
export BUILD_TOOLS_VERSION=25.0.2;
export PLATFORM_TOOLS_VERSION=25.0.3;
export ZIPALIGN_PATH=${ANDROID_HOME}/build-tools/${BUILD_TOOLS_VERSION};

export ZIPALIGN_BOUNDARY=4;

declare BUILD_DIRECTORY=${BUILD_DIRECTORY:-${PROJECT_ROOT}};
declare KEYSTORE_PWD=${KEYSTORE_PWD:-null};
declare HOST_SERVER_NAME=${HOST_SERVER_NAME:-null};
declare YOUR_FULLNAME=${YOUR_FULLNAME:-null};
declare GITHUB_ORGANIZATION_NAME=${GITHUB_ORGANIZATION_NAME:-null};

export TMP_DIRECTORY=${TMP_DIRECTORY:-/dev/shm/android_build};

function getPluginNumber() {

  if [[ ! -f ${TMP_PLUGIN_LIST} ]]; then
    echo "Building '${TMP_PLUGIN_LIST}'.";
    ${ANDROID_HOME}/tools/android list sdk -u -a > ${TMP_PLUGIN_LIST};
  fi;

  PLUGIN_NAME=$1; # "Android SDK Platform-tools, revision 23.0.3";
  PLGN_REC=$(cat ${TMP_PLUGIN_LIST} | grep "${PLUGIN_NAME}");
  PLGN_REC_L=$(echo "${PLGN_REC%%- ${PLUGIN_NAME}}");
  PLUGIN_NUM=$(echo "${PLGN_REC_L}"  | tr -d '[[:space:]]');

}

function getPlugin() {

  getPluginNumber "$1";

  if [[ -f "$2" ]]; then
    echo -e "Seem to have Plugin '#${PLUGIN_NUM} - ${PLUGIN_NAME}' already.";
  else
    echo -e "Calling for Plugin '#${PLUGIN_NUM} - ${PLUGIN_NAME}'.";
    echo "Y" | ${ANDROID_HOME}/tools/android update sdk -u -a --filter ${PLUGIN_NUM};
    echo -e "Called for Plugin #${PLUGIN_NUM} - ${PLUGIN_NAME}.";
  fi;

}


function installAndroid() {

  echo "     ~     ~     ~     ~     ~     ~     ~     ~     ~  ";

  mkdir -p ${ANDROID_HOME};
  pushd ${ANDROID_PLACE} >/dev/null;

    mkdir -p ~/Downloads;
    pushd ~/Downloads >/dev/null;
      echo -e "Download Android SDK Tools to $(pwd).";
      wget -nc http://dl-ssl.google.com/android/repository/${SDK_TOOLS_ZIP}  --progress=bar:force 2>&1 | tail -f -n +6;
    popd >/dev/null;

    mkdir -p ${ANDROID_SDK};
    pushd ${ANDROID_SDK} >/dev/null;
      if [[ -x ./tools/android ]]; then
        echo -e "Android SDK Tools have already been extracted to '$(pwd)'. ";
      else
        echo -e "Extract Android SDK Tools to $(pwd).";
        unzip ~/Downloads/${SDK_TOOLS_ZIP};
      fi;

      # echo -e "Cleaning all development toolkit plugins from '$(pwd)'.";
      # rm -fr ./platforms/
      # rm -fr ./platform-tools/
      # rm -fr ./extras/
      # rm -fr ./build-tools/
      # rm -fr ./temp/
      # rm -fr ./system-images/

      chmod ug+rw -R .;

    popd >/dev/null;

  popd >/dev/null;

  echo -e "Correcting ANDROID_HOME in '${ENV_FILE}' variables.";
  if [[ $(grep -c "export ANDROID_HOME=${ANDROID_HOME}"  ${ENV_FILE}) -lt 1 ]];
  then
    while [[ $(grep -c ANDROID_HOME ${ENV_FILE}) -gt 0 ]]; do
      sed -i "/ANDROID_HOME/d" ${ENV_FILE};
    done;
    echo -e "\nexport ANDROID_HOME=${ANDROID_HOME};\n" | tee -a ${ENV_FILE};
  fi;

  while [[ $(grep -c "platform-tools" ${ENV_FILE}) -gt 0 ]]; do
  sed -i "/platform-tools/d" ${ENV_FILE};
  done;
  echo -e "\nexport PATH=\$PATH:\$ANDROID_HOME/platform-tools:\$ANDROID_HOME/tools;" \
              | tee -a ${ENV_FILE};


  echo -e "Loading new variable with the command :
              source ${ENV_FILE};
  ";
  source ${ENV_FILE};

  echo -e "Obtaining SDK plugins.";

  # 3
  # echo -e "getPlugin \"Android SDK Platform-tools, revision ${PLATFORM_TOOLS_VERSION}\" ${ANDROID_HOME}/platform-tools/adb;";
  getPlugin "Android SDK Platform-tools, revision ${PLATFORM_TOOLS_VERSION}" ${ANDROID_HOME}/platform-tools/adb;

  # 4
  # echo -e "getPlugin \"Android SDK Build-tools, revision ${BUILD_TOOLS_VERSION}\" ${ZIPALIGN_PATH}/zipalign;";
  getPlugin "Android SDK Build-tools, revision ${BUILD_TOOLS_VERSION}" ${ZIPALIGN_PATH}/zipalign;

  # 25
  getPlugin "SDK Platform Android 6.0, API 23, revision 3" ${ANDROID_HOME}/platforms/android-23/android.jar;

  # 26
  getPlugin "SDK Platform Android 5.1.1, API 22, revision 2" ${ANDROID_HOME}/platforms/android-22/android.jar;

  # 76
#  getPlugin "Intel x86 Atom_64 System Image, Android API 22, revision 2" ${ANDROID_HOME}/system-images/android-22/default/x86_64/system.img;

  [ -z $(grep "android" .meteor/platforms) ] && meteor add-platform android;

  echo "### Android SDK installed ";

  return 0;

}


function checkKeyToolPassword() {

  while [ ${#KEYSTORE_PWD} -lt 6 ]; do

    echo -e "
     * * * Your Key Tool password is too short! * * *
     Set the KEYSTORE_PWD environment variable correctly.
        eg; export KEYSTORE_PWD=\"obscuregobbledygook\";
     ";
    return 1;

  done;

}


function checkHostName() {

  [ "${HOST_SERVER_NAME}" = "null" ] || return 0 &&  echo -e "
     * * * You have not defined a target server domain name * * *
     Set the HOST_SERVER_NAME environment variable correctly.
        eg; export HOST_SERVER_NAME=\"moon.planet.sun\";
     ";
    return 1;
}

function checkAuthorName() {

  [ "${YOUR_FULLNAME}" = "null" ] || return 0 &&  echo -e "
     * * * You have not defined a valid author name * * *
     Set the YOUR_FULLNAME environment variable correctly.
        eg; export YOUR_FULLNAME=\"You Yourself\";
     ";
    return 1;
}

function checkOrgName() {

  [ "${GITHUB_ORGANIZATION_NAME}" = "null"  ] || return 0 &&  echo -e "
     * * * You have not defined a valid organization name * * *
     Set the GITHUB_ORGANIZATION_NAME environment variable correctly.
        eg; export GITHUB_ORGANIZATION_NAME=\"YourOrg\";
     ";
    return 1;
}


function PrepareToBuildAndroidAPK() {

  local GOOD=0;

  checkKeyToolPassword || GOOD=1;
  checkHostName || GOOD=1;
  checkAuthorName || GOOD=1;
  checkOrgName || GOOD=1;
  [ ${GOOD} = 1 ] && { echo "Undefined parameter(s)" >&2; return 1; }

  echo "### Configuration for your '"${APP_NAME}"' project is :"
  echo "   ~                                      Target Server is  : " ${HOST_SERVER_NAME}
  echo "   ~                                               You are  : " ${YOUR_FULLNAME}
  echo "   ~                                  Your organization is  : " ${GITHUB_ORGANIZATION_NAME}
  echo "   ~ Align android-sdk bundle on "${ZIPALIGN_BOUNDARY}"-byte boundary when using : " ${ZIPALIGN_PATH}/zipalign
  echo "   ~                              Temporary build directory : " ${TMP_DIRECTORY}
  echo "### ~   ~   ~    "

  set +e;
  set -e;
  local KTEXISTS=0;
  [ -f ${HOME}/.keystore ] && KTEXISTS=$(keytool -list -v  -storepass ${KEYSTORE_PWD} | grep "Alias name" | grep -c "${APP_NAME}");
  CCODE=$(curl -s ipinfo.io | jq '.country');
  if [[ ${KTEXISTS} -lt 1 ]]; then
    echo "Creating key pair for '${APP_NAME}'.";
    until keytool -genkeypair -dname "cn=${YOUR_FULLNAME}, ou=IT, o=${GITHUB_ORGANIZATION_NAME}, c=${CCODE}" \
               -alias ${APP_NAME} -keypass ${KEYSTORE_PWD} -storepass ${KEYSTORE_PWD} -validity 3650;
    do
      echo -e "

        Looks like you entered the wrong key store password.
      ";
      KEYSTORE_PWD="none";
      return 1;

    done;
  else
    echo "Have a key pair for '${APP_NAME}'.";
  fi;

}

function BuildAndroidAPK() {

  export TARGET_DIRECTORY=${TMP_DIRECTORY}/${APP_NAME};
  rm -fr ${TARGET_DIRECTORY};
  mkdir -p ${TARGET_DIRECTORY};

  pushd ${BUILD_DIRECTORY} >/dev/null;

    echo -e "\nBuilding project : meteor build ${TARGET_DIRECTORY}         --server=${HOST_SERVER_NAME};\n\n";
    meteor build ${TARGET_DIRECTORY}         --server=${HOST_SERVER_NAME};
    echo "Built project : ${BUILD_DIRECTORY} in ${TARGET_DIRECTORY} for server ${HOST_SERVER_NAME}";
    mv ${TARGET_DIRECTORY}/android/release-unsigned.apk ${TARGET_DIRECTORY}/android/${APP_NAME}_unaligned.apk
    echo "Stashed plain version.  Building debug version ...";
    meteor build ${TARGET_DIRECTORY} --debug --server=${HOST_SERVER_NAME}
    echo "Built debug version.";

  popd >/dev/null;

  pushd ${TARGET_DIRECTORY}/android >/dev/null;
    jarsigner -storepass ${KEYSTORE_PWD} -tsa http://timestamp.digicert.com -digestalg SHA1 ${APP_NAME}_unaligned.apk ${APP_NAME};
    echo -e "Signed the APK file.";

    ${ZIPALIGN_PATH}/zipalign -f ${ZIPALIGN_BOUNDARY} ${APP_NAME}_unaligned.apk ${APP_NAME}.apk;
    echo -e "Aligned the APK file.";

    declare APK_PUBLISH_DIR="public/mobile/android";
    mkdir -p ${BUILD_DIRECTORY}/${APK_PUBLISH_DIR};
    mv ${APP_NAME}.apk ${BUILD_DIRECTORY}/${APK_PUBLISH_DIR};
    echo -e "SDK Platform Android 6.0, API 23, revision 3 : " > ${BUILD_DIRECTORY}/${APK_PUBLISH_DIR}/${APP_NAME}.apk.txt
    echo -e "Placed signed and aligned APK file into project's public directory, '${BUILD_DIRECTORY}/${APK_PUBLISH_DIR}'.";

  popd  >/dev/null;
  #

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  echo -e "============>";
  installAndroid;
  PrepareToBuildAndroidAPK;
  BuildAndroidAPK;
  echo -e "<============";
fi;
