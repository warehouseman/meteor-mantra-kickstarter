#!/bin/bash
#
cat <<EOF
{
  "HOST_SERVER_NAME": "localhost:3000",
  "MAILGUN_DOMAIN": "${MAILGUN_DOMAIN}",
  "MAILGUN_KEY": "${MAILGUN_KEY}",
  "LOGGLY_SUBDOMAIN": "${LOGGLY_SUBDOMAIN}",
  "LOGGLY_TOKEN": "${LOGGLY_TOKEN}",

  "RDBMS_BKP": "${RDBMS_BKP}",
  "RDBMS_DB": "${RDBMS_DB}",
  "RDBMS_DIALECT": "${RDBMS_DIALECT}",
  "RDBMS_HST": "${RDBMS_HST}",
  "RDBMS_PWD": "${RDBMS_PWD}",
  "RDBMS_UID": "${RDBMS_UID}",
  "public": {
    "IS_GITSUBMODULE":"${IS_GITSUBMODULE}",
    "PASSWORD_RESET": {
      "Route": "/prrq/",
      "Html_1": "<b>If you did not request a password reset just ignore this.</b><br /><b>If you did request it, then please click <a href='http://",
      "Html_2": "'>this link</a> to open your password reset page.",
      "Text_1": "If you did not request a password reset just ignore this.\nIf you did request it, then please go to http://",
      "Text_2": " in order to reset your password.",
      "Subject": "Your Mantra Kickstarter password reset request",
      "From": "yourself@yourpublic.work"
    }
  }
}
EOF
