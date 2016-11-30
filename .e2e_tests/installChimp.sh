function installChimp()
{
  declare CHIMPVERSION=$(chimp --version 2>&1 >/dev/null) >/dev/null;
  if [[ "${CHIMPVERSION#*$NOCOMMAND}" != "$CHIMPVERSION" ]]; then

    echo -e "### Installing Chimp";
    npm install -g chimp;

  fi
  echo -e "### Chimp Installed";
}

