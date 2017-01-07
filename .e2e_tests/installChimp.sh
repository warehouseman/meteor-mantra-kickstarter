#!/usr/bin/env bash
#
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
  installPhantomJS;

  if ! npm list -g chimp &>/dev/null; then

    echo -e "### Installing Chimp";
    npm install -gy chimp@0.45.1;

  fi
  echo -e "### Chimp Installed";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installChimp;
fi;
