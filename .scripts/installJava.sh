#!/usr/bin/env bash
#
declare NOCOMMAND="command not found";
declare MINIMUM_JAVA_VERSION=8;
function installJava()
{
  declare JAVAVERSION=$(javac -version 2>&1 >/dev/null) >/dev/null;
  if [[ "${JAVAVERSION#*$NOCOMMAND}" = "$JAVAVERSION" ]]; then
    declare VER=${JAVAVERSION#javac 1.}; VER=${VER:0:1};
    if [[  ${VER} -ge  ${MINIMUM_JAVA_VERSION}  ]]; then
      echo "### Jave version ${VER} is installed already.";
      return 0;
    else
        echo -e "Installed Jave version ${VER} is too old; Java ${MINIMUM_JAVA_VERSION} required. Giving up." >&2;
        exit 1;
    fi;
  fi;

  echo "### Installing Java";
  sudo apt-get install -y default-jdk

  echo "### Java Installed";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installJava;
fi;
