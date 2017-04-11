#!/usr/bin/env bash
#
declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function install_local_packages() {
  echo -e "### Installing included npm packages for Meteor";
  pushd .pkgs >/dev/null;

    for mdl in ./*/
    do
      echo -e "~~~~~~~~~~  Link '${mdl}' into project  ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      pushd ${mdl} >/dev/null;
        ${METEOR_CMD} npm link;
      popd >/dev/null;
    done
    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

  mkdir -p node_modules;
  declare mdl="";
  pushd node_modules >/dev/null;

    for dir in ../.pkgs/*/
    do
      mdl=$(basename ${dir});
      echo -e "~~~~~~~~~~  Installing '${mdl}'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      ${METEOR_CMD} npm link ${mdl};
      # yarn link ${mdl};
    done

    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

  declare PKGS_DIR=".pkgs";
  declare E2E_FEATURES_DIR=".e2e_tests/features";
  declare BASE_DIR="../..";
  declare FEATURE_COUNT=500;

  echo "###   Refreshing symlinks to modules' .e2e_tests directories";
  pushd ${E2E_FEATURES_DIR} >/dev/null;

    find . -maxdepth 1 -lname '*' -exec rm {} \;

    for MODULE in $(find ${BASE_DIR}/${PKGS_DIR} -maxdepth 2 -type d -name ".e2e_tests")
    do
      echo "Found module :: '${MODULE}'.";
      declare FEATURE_PATH="${MODULE}/features/";
      for FEATURE in $(find ${FEATURE_PATH} -mindepth 1 -maxdepth 2 -type d)
      do

        declare FEATURE_NAME="${FEATURE#$FEATURE_PATH}";
        if [ ! -z ${FEATURE_NAME} ]; then
          FEATURE_COUNT=$(expr ${FEATURE_COUNT} + 1);
          echo "Linking '${FEATURE_NAME}' from '${FEATURE_PATH}${FEATURE_NAME}' to ' ${FEATURE_COUNT}_${FEATURE_NAME}'.";
          ln -s ${FEATURE_PATH}${FEATURE_NAME} ${FEATURE_COUNT}_${FEATURE_NAME};
        fi;

      done
    done

  popd >/dev/null;


}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  install_local_packages;
fi;
