function install_local_packages() {
  echo -e "### Installing included npm packages for Meteor";

  if [[ "X${METEOR_CMD}X" == "XX" ]]; then declare METEOR_CMD="meteor"; fi;
  mkdir -p node_modules;
  pushd node_modules >/dev/null;

    for dir in ../.pkgs/*/
    do
      echo -e "~~~~~~~~~~  Installing and Linking '${dir}'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      ${METEOR_CMD} npm link ${dir};
    done

    echo -e "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;
}
