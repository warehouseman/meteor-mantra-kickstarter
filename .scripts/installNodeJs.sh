#!/usr/bin/env bash
#

declare NOCOMMAND="command not found";
# function installNodeJs()
# {

#   declare NODEVERSION=$(node --version 2>&1 >/dev/null) >/dev/null;
#   if [[ "${NODEVERSION#*$NOCOMMAND}" != "$NODEVERSION" ]]; then

#     echo "### Installing Npm and NodeJS";

#     curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
#     sudo apt-get install -y nodejs;

#   fi

#   mkdir -p ${HOME}/.npm-global;
#   if (( $(cat ~/.profile | grep -c '.npm-global') < 1 )); then
#     echo -e "
# if [ -d "\${HOME}/.npm-global/bin" ]; then
#   export PATH=\${HOME}/.npm-global/bin:\$PATH
# fi;
# " >> ${HOME}/.profile
#   fi;

#   # ADD2PROFILE=$(cat ~/.profile | grep -c ".npm-global");
#   # if [[ "${ADD2PROFILE}" -lt "1" ]]; then
#   #    echo -e "export PATH=~/.npm-global/bin:\$PATH\n" >> ~/.profile
#   # fi;

#   source ${HOME}/.profile;

#   npm config set prefix '${HOME}/.npm-global';

#   echo "### Npm and NodeJS installed ";

#   NCU_ID="npm-check-updates";
#   NCU_VER=$(npm view ${NCU_ID} version 2>/dev/null) || npm install -g npm-check-updates;
#   # echo -e "### '${NCU_ID}@$(npm view ${NCU_ID} version)' installed";

# }



function installNodeJs()
{

  sudo ls >/dev/null;

  echo -e "${PRETTY} prepare NodeJS versions ...";
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

  export INSTALL="jq";
  dpkg-query -s ${INSTALL} >/dev/null && echo " - ${INSTALL} is installed" || sudo apt-get install -y ${INSTALL};

  export PURGE="nodejs";
  dpkg-query -s ${PURGE} &>/dev/null && sudo apt-get purge -y ${PURGE} || echo " - ${PURGE} has been purged";

  export NVM_VERSION=$(curl -s https://api.github.com/repos/creationix/nvm/releases/latest | jq -r ".name");
  export NVM_INSTALLED=$(nvm --version);
  if [[  "${NVM_VERSION}" = "v${NVM_INSTALLED}"  ]]; then
    echo -e " - nvm '${NVM_VERSION}' is installed";
  else
    echo -e " - freshen nvm '${NVM_VERSION}'";
    wget -qO- https://raw.githubusercontent.com/creationix/nvm/${NVM_VERSION}/install.sh | bash;
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
    [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
  fi;

  # export NODE_VERSION=4;
  # nvm ls ${NODE_VERSION} >/dev/null \
  #   && echo " - node '$( nvm version ${NODE_VERSION})' is installed" \
  #   || nvm install ${NODE_VERSION};

  # export NODE_VERSION=6;
  # nvm ls ${NODE_VERSION} >/dev/null \
  #   && echo " - node '$( nvm version ${NODE_VERSION})' is installed" \
  #   || nvm install ${NODE_VERSION};

  export NODE_VERSION=8;
  nvm ls ${NODE_VERSION} >/dev/null \
    && echo " - node '$( nvm version ${NODE_VERSION})' is installed" \
    || nvm install ${NODE_VERSION};

  echo "### Npm and NodeJS installed ";
  nvm use stable;

  NCU_ID="npm-check-updates";
  NCU_VER=$(npm view ${NCU_ID} version 2>/dev/null) || npm install -g npm-check-updates;
  # echo -e "### '${NCU_ID}@$(npm view ${NCU_ID} version)' installed";

}

function aptNotYetInstalled() {

  set -e;
  return $(dpkg-query -W --showformat='${Status}\n' $1 2>/dev/null | grep -c "install ok installed");

}


if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installNodeJs;
fi;
