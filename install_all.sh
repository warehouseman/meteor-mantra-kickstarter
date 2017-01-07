#!/usr/bin/env bash
#
RUN_IT=${1:-null};

source .scripts/trap.sh;

source .scripts/refreshApt.sh;
source .scripts/installJava.sh;
source .scripts/installNodeJs.sh;
source .e2e_tests/installChimp.sh;
source .scripts/installMeteorFramework.sh;
source .scripts/android/installAndroid.sh;
source .scripts/installMeteorApp.sh;
# source .pkgs/install_local_packages.sh;

export FREESPACE=$(($(stat -f --format="%a*%S" ${HOME})/1000000));
export MINFREE=7000
if [ ${FREESPACE} -lt ${MINFREE} ]; then
  echo -e "
             * * *   WARNING * * *
    Your free disk space is: '${FREESPACE}MB'.
    You must have at least:  '${MINFREE}MB' free!

------------------------------------------------
  ";
else
  echo "Found '${FREESPACE}MB' of free disk space.";
fi;

[ -f settings.json ] || cp settings.json.example settings.json;
echo -e "
  While the system builds, you should prepare your settings:

       nano $(pwd)/settings.json;

Press any key to continue or <ctrl-c> to quit.
";
read -n 1 -s;

refreshApt;
installJava;
installNodeJs;
installChimp;
installMeteorFramework;
installAndroid;
installMeteorApp;

declare MSG="";
if [ -f ./settings.json ]; then
  if [ "${RUN_IT}" = "run" ]; then
    meteor --settings=settings.json;
    MSG="
    Done!
    ";
  else
    MSG="

  Next steps:

      Sanity check
      ~~~~~~~~~~~~

        Terminal #1 : meteor --settings=settings.json
        Terminal #2 : meteor npm run acceptance

*OR*

      Build and launch server for mobile
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

        export KEYSTORE_PWD=\"obscuregobbledygook\";
        export HOST_SERVER_NAME=\"http://moon.planet.sun:3000/\";
        export ROOT_URL=\"\${HOST_SERVER_NAME}\";
        export YOUR_FULLNAME=\"You Yourself\";
        export GITHUB_ORGANIZATION_NAME=\"YourOrg\";
        ./build_all.sh;
        meteor run --mobile-server=\${HOST_SERVER_NAME}  --settings=settings.json;
   ";

  fi;
else
  MSG="

  Next steps :
     1) cp settings.json.example settings.json
     2) # Correctly configure 'settings.json'
     3) meteor --settings=settings.json
     ";
fi;

echo -e "${MSG}";
