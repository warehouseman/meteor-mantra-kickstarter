#!/bin/bash
#
declare -A SHELLVARS;
declare SHELLVARNAMES=();

function addShellVar() {

  declare -A SHELLVAR;

  SHELLVARNAMES+=($1);
  SHELLVAR['LONG']=$2;
  SHELLVAR['SHORT']=$3;
  SHELLVAR['VAL']=$4;
  for key in "${!SHELLVAR[@]}"; do
    SHELLVARS[$1,$key]=${SHELLVAR[$key]}
  done

};


# PREPARE ALL NEEDED SHELL VARIABLES BELOW THIS LINE
# EXAMPLE
# addShellVar 'NAME' \
#             'LONG' \
#             'SHORT' \
#             'POSITION';

export X=${YOUR_FULLNAME:="You Yourself"}
addShellVar 'YOUR_FULLNAME' \
            'The project owner full name to use in APK signing  :: ' \
            'User full name : \"${YOUR_FULLNAME}\";' \
            '1';

export X=${YOUR_ORGANIZATION_NAME:="Your Org"}
addShellVar 'YOUR_ORGANIZATION_NAME' \
            'The organization name to use in APK signing  :: ' \
            'Organization name : \"${YOUR_ORGANIZATION_NAME}\";' \
            '2';

export X=${HOST_SERVER_PROTOCOL:="http"}
addShellVar 'HOST_SERVER_PROTOCOL' \
            'The app server access protocol ( http or https )   :: ' \
            'Server protocol ( http or https ) : \"${HOST_SERVER_PROTOCOL}\";' \
            '3';

export X=${HOST_SERVER_NAME:="localhost"}
addShellVar 'HOST_SERVER_NAME' \
            'The app server domain name ( or localhost )   :: ' \
            'Server domain name ( or localhost ) : \"${HOST_SERVER_NAME}\";' \
            '4';

export X=${HOST_SERVER_PORT:=3000}
addShellVar 'HOST_SERVER_PORT' \
            'The app server access port ( 3000, 80, 443 or ? )   :: ' \
            'Server port ( 3000, 80, 443 or ? ) : ${HOST_SERVER_PORT};' \
            '5';

export X=${KEYSTORE_PWD:="obscuregobbledygook"}
addShellVar 'KEYSTORE_PWD' \
            'Password for disposable Android app signature keys and key store  :: ' \
            'APK signing key password : \"${KEYSTORE_PWD}\";' \
            '6';

export X=${NON_STOP:="no"}
addShellVar 'NON_STOP' \
            'Run scripts without stopping to check environment variables  :: ' \
            'Assume env vars are correct : \"${NON_STOP}\";' \
            '7';

