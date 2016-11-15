#!/usr/bin/env bash
#
declare NOCOMMAND="command not found";

declare FLAG="/tmp/updatedApt";
function refreshApt()
{
  if [[ -f ${FLAG} ]]; then
    declare -i LAPSE=$(expr $(date +%s) - $(date +%s -r /tmp/updatedApt ));
    if (( LAPSE < 90000 )); then
      echo "### APT is up to date.";
      return;
    fi;
  fi

  echo "### Update APT";
  sudo apt-get -y update && \
  sudo apt-get -y upgrade && \
  sudo apt-get -y dist-upgrade && \
  sudo apt-get -y clean && \
  sudo apt-get -y autoremove;

  sudo apt-get -y install curl git;
  sudo apt-get -y install build-essential g++;

  touch ${FLAG};
  echo "### APT Updated";
}
#
function installJava()
{
  declare JAVAVERSION=$(java -version 2>&1 >/dev/null) >/dev/null;
  if [[ "${JAVAVERSION#*$NOCOMMAND}" != "$JAVAVERSION" ]]; then

    echo "### Installing Java";
    sudo apt-get install -y default-jre

  fi
  echo "### Java Installed";
}

function installNodeJs()
{

  declare NODEVERSION=$(node -version 2>&1 >/dev/null) >/dev/null;
  if [[ "${NODEVERSION#*$NOCOMMAND}" != "$NODEVERSION" ]]; then

    echo "### Installing Npm and NodeJS";

    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs;


  fi

  mkdir -p ~/.npm-global;
  ADD2PROFILE=$(cat ~/.profile | grep -c ".npm-global");
  if [[ "${ADD2PROFILE}" -lt "1" ]]; then
     echo -e "export PATH=~/.npm-global/bin:\$PATH\n" >> ~/.profile
  fi;
  source ~/.profile;

  npm config set prefix '~/.npm-global';

  echo "### Npm and NodeJS installed ";

}

function installChimp()
{
  declare CHIMPVERSION=$(chimp --version 2>&1 >/dev/null) >/dev/null;
  if [[ "${CHIMPVERSION#*$NOCOMMAND}" != "$CHIMPVERSION" ]]; then

    echo "### Installing Chimp";
    npm install -g chimp;

  fi
  echo "### Chimp Installed";
}

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

  echo "### Installing npm packages for Meteor";
  meteor npm -y install;

}

refreshApt;
installJava;
installNodeJs;
installChimp;
installMeteor;

echo -e "

  Next steps :
     1) cp settings.json.example settings.json
     2) # Correctly configure 'settings.json'
     3) meteor --settings=settings.json
     ";

