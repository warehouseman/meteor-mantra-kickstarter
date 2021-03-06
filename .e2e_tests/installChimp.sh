#!/usr/bin/env bash
#

function aptNotYetInstalled() {

  set -e;
  return $(dpkg-query -W --showformat='${Status}\n' $1 2>/dev/null | grep -c "install ok installed");

}

SHL_CHROME="google-chrome";
APT_CHROME="${SHL_CHROME}-stable";
function installLatestChrome()
{

  X="libxss1"; if aptNotYetInstalled "${X}"; then
    sudo apt-get -y install "${X}";
  fi;

  X="fonts-liberation"; if aptNotYetInstalled "${X}"; then
    sudo apt-get -y install "${X}";
  fi;

  CPU_WIDTH=$(lshw -class cpu 2>/dev/null | grep -m 1 width | sed 's/^[ \t]*//' | cut -d' ' -f2);
  CPU_MSG="CPU bit width : |${CPU_WIDTH}|.";
  echo -e ${CPU_WIDTH};

  ARCH_NAME="amd64";
  if [[ ${CPU_WIDTH} -ne 64  ]]; then ARCH_NAME="i386"; fi;
  DEB_FILE="google-chrome-stable_current_${ARCH_NAME}.deb";

  # Install 'chrome'
  wget -O ${DEB_FILE} https://dl.google.com/linux/direct/${DEB_FILE};
  sudo dpkg -i ${DEB_FILE};

}


function installChrome()
{
  if aptNotYetInstalled "${APT_CHROME}"; then installLatestChrome; fi;

  if [[  "$(${SHL_CHROME} --version | cut -d " " -f 3)" < "55.0.2883.0" ]]; then
    echo "Need to upgrade Chrome to 54.0.2840.0 or later";
    installLatestChrome;
  fi;
  echo "### Chrome version is $(${SHL_CHROME} --version | cut -d " " -f 3)";
}



function installPhantomJS()
{

  if ! npm list -g phantomjs-prebuilt &>/dev/null; then

    echo -e "### Installing PhantomJS";
    npm install -gy phantomjs-prebuilt@2.1.12;

  fi
  echo -e "### PhantomJS Installed";
}

function installChimp()
{
  # export VER=$(cat package.json | grep '"chimp"' | cut -d ':' -f 2 | tr -d [\",] | tr -d [:space:])
  export VER=$(curl -s https://api.github.com/repos/xolvio/chimp/tags  | jq -r .[2].name);
  installChrome;
#  installPhantomJS;

  echo -e "### Is Chimp installed?";
  if ! npm list -g chimp &>/dev/null; then

    # echo -e "### Switching to Node 6 for Chimp";
    # rm -fr ${HOME}/.npmrc
    # export NVM_DIR="$HOME/.nvm"
    # [ -s "$NVM_DIR/nvm.sh" ] && source "$NVM_DIR/nvm.sh";
    # nvm use stable;

    echo -e "### Installing Chimp bug workaround...";
    npm install -gy json-stable-stringify;

    echo -e "### Installing Chimp version : '${VER}'";
    npm install -gy chimp;
    # npm install -gy chimp@${VER};

  fi
  echo -e "### Chimp Installed";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installChimp;
fi;
