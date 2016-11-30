declare NOCOMMAND="command not found";
function installMeteor()
{
  local INSTALL_METEOR="yes";
  if [[ -d "${HOME}/.meteor/packages/meteor-tool" ]]; then
    declare METEORVERSION=$(meteor --version  2>&1);
    if [[ "${METEORVERSION#*$NOCOMMAND}" == "$METEORVERSION" ]]; then
      INSTALL_METEOR="no";
    fi
  fi

  if [[ "${INSTALL_METEOR}" == "yes" ]]; then
    echo "### Installing Meteor";
    curl https://install.meteor.com/ | sh;
  fi

  echo "### Meteor Installed";
  meteor --version;

  echo "### Installing included npm packages for Meteor";
  mkdir -p node_modules;
  pushd node_modules >/dev/null;

    for dir in ../.pkgs/*/
    do
      echo "~~~~~~~~~~  Installing and Linking '${dir}'   ~~~~~~~~~~~~~~~~~~~~~~~~~~~";
      meteor npm link ${dir};
    done

    echo "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

  popd >/dev/null;

  echo "### Installing 3rd party npm packages.";
  meteor npm -y install;

}

