#!/usr/bin/env bash
#
declare METEOR_CMD="${METEOR_CMD:=${HOME}/.meteor/meteor}";

function lint_each_package() {
  echo -e "### Linting included npm packages";

  pushd .pkgs >/dev/null;

    for mdl in ./*/
    do
      echo -e "~~~~~~~~~~  Lint '${mdl}' source files  ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      pushd ${mdl} >/dev/null;
        ${METEOR_CMD} npm run lint
      popd >/dev/null;
    done
    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  lint_each_package;
fi;
