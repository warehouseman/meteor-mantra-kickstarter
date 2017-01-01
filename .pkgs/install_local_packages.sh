#!/usr/bin/env bash
#
function install_local_packages() {
  echo -e "### Installing included npm packages for Meteor";

  if [[ "X${METEOR_CMD}X" == "XX" ]]; then declare METEOR_CMD="meteor"; fi;
  pushd .pkgs >/dev/null;

    for mdl in ./*/
    do
      echo -e "~~~~~~~~~~  Placing NPM Link in '${mdl}'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      pushd ${mdl} >/dev/null;
        pwd;
        ${METEOR_CMD} npm link
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
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  install_local_packages;
fi;
