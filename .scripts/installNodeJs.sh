#!/usr/bin/env bash
#

declare NOCOMMAND="command not found";
function installNodeJs()
{

  declare NODEVERSION=$(node --version 2>&1 >/dev/null) >/dev/null;
  if [[ "${NODEVERSION#*$NOCOMMAND}" != "$NODEVERSION" ]]; then

    echo "### Installing Npm and NodeJS";

    curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
    sudo apt-get install -y nodejs;

  fi

  mkdir -p ${HOME}/.npm-global;
  if [ -z $(cat ~/.profile | grep ".npm-global") ]; then
    echo -e "
if [ -d "\${HOME}/.npm-global/bin" ]; then
  export PATH=\${HOME}/.npm-global/bin:\$PATH
fi;
" >> ${HOME}/.profile
  fi;

  # ADD2PROFILE=$(cat ~/.profile | grep -c ".npm-global");
  # if [[ "${ADD2PROFILE}" -lt "1" ]]; then
  #    echo -e "export PATH=~/.npm-global/bin:\$PATH\n" >> ~/.profile
  # fi;

  source ${HOME}/.profile;

  npm config set prefix '${HOME}/.npm-global';

  echo "### Npm and NodeJS installed ";

  NCU_ID="npm-check-updates";
  NCU_VER=$(npm view ${NCU_ID} version 2>/dev/null) || npm install -g npm-check-updates;
  echo -e "### '${NCU_ID}@$(npm view ${NCU_ID} version)' installed";

}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installNodeJs;
fi;
