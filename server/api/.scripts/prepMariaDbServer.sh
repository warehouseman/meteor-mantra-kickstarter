#!/usr/bin/env bash
#

export APP_HOST_DOMAIN_NAME=${1};

echo -e "Verifying secrets file presence ( '${HOME}/.ssh/deploy_vault/${APP_HOST_DOMAIN_NAME}/secrets.sh;' )";
if [[ ! -f "${HOME}/.ssh/deploy_vault/${APP_HOST_DOMAIN_NAME}/secrets.sh" ]]; then
  echo -e "* * No such file. * * ";
  exit;
fi;

echo -e "Found.";
source ${HOME}/.ssh/deploy_vault/${APP_HOST_DOMAIN_NAME}/secrets.sh;

echo -e "Trial SSH login to target host finds user : $(ssh ${SETUP_USER_UID}@${RDBMS_HST} 'whoami;')";

echo -e "~~~ Installing MariaDB client...";
sudo apt-get install mariadb-client;

echo -e "~~~~ Create ASKPASS file";

declare INSTALLER_BUNDLE="installMariaDB";
declare INSTALLER_BUNDLE_DIR="/dev/shm/${INSTALLER_BUNDLE}";
mkdir -p ${INSTALLER_BUNDLE_DIR};
rm -fr ${INSTALLER_BUNDLE_DIR}/*;
pushd ${INSTALLER_BUNDLE_DIR} >/dev/null;

  cat << EOAPF > .askPass.sh
#!/usr/bin/env bash
#
echo -e "${SETUP_USER_PWD}";

EOAPF

  chmod 700 .askPass.sh;

  cat << EOIAP > askPassInstallScript.sh
#!/usr/bin/env bash
#
SCRIPT=\$(realpath \$0);
SCRIPTPATH=\$(dirname \$SCRIPT);

echo -e "     >> mv \\\${SCRIPTPATH}/.askPass.sh to \\\${HOME}";
mv \${SCRIPTPATH}/.askPass.sh .;

touch .bash_login;
grep -q 'SUDO_ASKPASS' .bash_login \
 && sed -i 's/.*SUDO_ASKPASS.*/export SUDO_ASKPASS="\${HOME}\/.askPass.sh";/' .bash_login \
 || echo -e '\nexport SUDO_ASKPASS="\${HOME}/.askPass.sh";' >> .bash_login;

echo -e "       >> Checking it...";
grep 'SUDO_ASKPASS' .bash_login;

EOIAP

  chmod 700 askPassInstallScript.sh;

  cat << EOIS > mariadbInstallScript.sh
#!/usr/bin/env bash
#
source \${HOME}/.bash_login;
sudo -A apt-get update;
sudo -A apt-get -y install mariadb-server;

echo -e "         >> Secure MariaDB installation";
echo -e "\ny\n${RDBMS_ADMIN_PWD}\n${RDBMS_ADMIN_PWD}\nn\nn\nn\ny\n " \
    | sudo -A mysql_secure_installation 2>/dev/null;

echo -e "         >> Authorise binding from remote hosts";
sudo -A sed -i "s/.*bind-address.*/bind-address\t\t= 0.0.0.0/" \
                                   /etc/mysql/mariadb.conf.d/50-server.cnf;
grep bind /etc/mysql/mariadb.conf.d/50-server.cnf;

echo -e "         >> Restart MariaDB.";
sudo -A service mysql restart;
# sudo -A systemctl start mariadb;
# sudo -A systemctl status mariadb;

EOIS
  chmod 770 mariadbInstallScript.sh;


  cat << EOPDB > prepareDatabase.sql
-- Run with MySql
CREATE DATABASE IF NOT EXISTS ${RDBMS_DB};
GRANT ALL PRIVILEGES ON ${RDBMS_DB}.* TO '${RDBMS_UID}'@'%' IDENTIFIED BY '${RDBMS_PWD}';
FLUSH PRIVILEGES
EOPDB

popd >/dev/null;

echo -e "~~~~~ Copy ASKPASS file to target";
scp -r ${INSTALLER_BUNDLE_DIR} ${SETUP_USER_UID}@${RDBMS_HST}:/home/${SETUP_USER_UID};

echo -e "~~~~~~ Run AskPass installer ";

echo -e ssh ${SETUP_USER_UID}@${RDBMS_HST} "${INSTALLER_BUNDLE}/askPassInstallScript.sh;";
# echo -e "||||||||||||||||||  CURTAILED  ||||||||||||||||||||||||";
# exit;
ssh ${SETUP_USER_UID}@${RDBMS_HST} "${INSTALLER_BUNDLE}/askPassInstallScript.sh;";

echo -e "~~~~~~~ Run MariaDB installer ";
ssh ${SETUP_USER_UID}@${RDBMS_HST} "${INSTALLER_BUNDLE}/mariadbInstallScript.sh";

echo -e "~~~~~~~ Run database preparation script ";
ssh ${SETUP_USER_UID}@${RDBMS_HST} \
  "source .bash_login; sudo -A mysql -u root -e \"GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY '${RDBMS_ADMIN_PWD}' WITH GRANT OPTION; FLUSH PRIVILEGES;\"";

# cat ${INSTALLER_BUNDLE_DIR}/prepareDatabase.sql;
mysql -h ${RDBMS_HST} -u root -p${RDBMS_ADMIN_PWD} mysql < ${INSTALLER_BUNDLE_DIR}/prepareDatabase.sql;

# ssh ${SETUP_USER_UID}@${RDBMS_HST} \
#   "source .bash_login; sudo -A mysql -u root -e \"SELECT User, Host FROM mysql.user\"";

echo -e "~~~~ Done ~~~~";
exit;
