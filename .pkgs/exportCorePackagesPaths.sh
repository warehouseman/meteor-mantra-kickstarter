#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;

declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function exportCorePackagesPaths() {
  local PKGS_DIR=$1;

  local PARENT_PKGS_PATH="../../.pkgs";
  local PKG_EXCLUSIONS="package_exclusions.json";
  local PKG_EXCL_PATH="${PARENT_PKGS_PATH}/${PKG_EXCLUSIONS}";

  pushd ${PKGS_DIR} >/dev/null;

    echo -e "### Identifying core npm packages for Meteor Mantra Kickstarter.";

    local CORE_EXCLUSIONS='[""]';
    local CONTAINER_EXCLUSIONS='[""]';
    if [ -f ${PKG_EXCL_PATH} ]; then

      CORE_EXCLUSIONS=$(jq -r .packages_excluded_from_core ${PKG_EXCL_PATH});
      echo -e "Core Excl : ${CORE_EXCLUSIONS}";

      CONTAINER_EXCLUSIONS=$(jq -r .packages_excluded_from_wrapper ${PKG_EXCL_PATH});
      echo -e "Wrapper Excl : ${CONTAINER_EXCLUSIONS}";

    fi;

    # local EXCLUSIONS='[""]';

    # if [[ -f ${PKG_EXCL_PATH} ]]; then
    #   EXCLUSIONS=$(jq -r .packages_excluded_from_core ${PKG_EXCL_PATH});
    # fi;
    # echo ${EXCLUSIONS};

    for MODULE_PATH in ./*/
    do
      NODE_META=${MODULE_PATH}package.json;
      # echo ${NODE_META};

      if [[ -r ${NODE_META} && -f ${NODE_META} ]]; then
        MDL=$(cat ${NODE_META}  | jq -r .name);
        if [[ "X${MDL}X" != "XX" ]]; then
          # echo -e "${MDL} . . .  $(basename ${MODULE_PATH})";
          MODULE_FILENAME=$(basename ${MODULE_PATH})
          MODULE_CODENAME=${MODULE_FILENAME#${GITIG_PREFIX}};

          EXCLUDE=true;
          if [[  ${MODULE_FILENAME} = ${MODULE_CODENAME} ]]; then
            # echo -e "Core : ${MODULE_CODENAME}";
            EXCLUDE=$(echo ${CORE_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
          else
            # echo -e "Container : ${MODULE_CODENAME}";
            EXCLUDE=$(echo ${CONTAINER_EXCLUSIONS} | jq ". | contains([\"${MODULE_CODENAME}\"])");
          fi;

          if [[  ${EXCLUDE} != "true"  ]]; then
            pushd ${MODULE_PATH} >/dev/null;
              echo "${MDL} to list ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>";
              echo "${MDL}" >> ${LOCAL_NODEJS_PACKAGES_LIST};
              # ${METEOR_CMD} npm link;
              # npm install;
              npm link;
            popd >/dev/null;
          fi;

        #   EXCLUDE=$(echo ${EXCLUSIONS} | jq ". | contains([\"${MDL}\"])");
        #   echo -e "~~~~~~~~~~  Link '${MODULE_PATH}' (${MDL}) into project? Excluded : ${EXCLUDE} ~~~~~~~~~~~";
        #   if [[ "true" != "${EXCLUDE}" ]]; then
        #     pushd ${MODULE_PATH} >/dev/null;
        #       # echo "${MDL} to list ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~>>";
        #       echo "${MDL}" >> ${LOCAL_NODEJS_PACKAGES_LIST};
        #       # ${METEOR_CMD} npm link;
        #       npm link;
        #     popd >/dev/null;
        #   fi;
        fi;
      fi;

    done

  popd >/dev/null;

 echo -e "~~~~~~~~~~~~~  ${LOCAL_NODEJS_PACKAGES_LIST}  ~~~~~~~~~~~~~~~~";
 cat ${LOCAL_NODEJS_PACKAGES_LIST};
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  export LOCAL_NODEJS_PACKAGES_LIST=/dev/shm/localNodeJsPackagesList.txt;
  echo "" > ${LOCAL_NODEJS_PACKAGES_LIST};
  pushd meteor-mantra-kickstarter >/dev/null;
    exportCorePackagesPaths ${SCRIPTPATH};
  popd >/dev/null;
fi;
