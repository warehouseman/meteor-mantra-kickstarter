#!/usr/bin/env bash
#
declare NOCOMMAND="command not found";
function installJava()
{
  declare JAVAVERSION=$(java -version 2>&1 >/dev/null) >/dev/null;
  if [[ "${JAVAVERSION#*$NOCOMMAND}" != "$JAVAVERSION" ]]; then

    echo "### Installing Java";
    sudo apt-get install -y default-jre

  fi
  echo "### Java Installed";
}

if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
  installJava;
fi;
