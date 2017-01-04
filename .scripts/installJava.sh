#!/usr/bin/env bash
#
declare NOCOMMAND="command not found";
function installJava()
{
  declare JAVAVERSION=$(javac -version 2>&1 >/dev/null) >/dev/null;
  if [[ "${JAVAVERSION#*$NOCOMMAND}" != "$JAVAVERSION" ]]; then

    echo "### Installing Java";
    sudo apt-get install -y default-jdk

  fi
  echo "### Java Installed";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installJava;
fi;
