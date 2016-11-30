declare NOCOMMAND="command not found";
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
