#!/bin/bash
#
cat <<EOF
{
  "HOST_SERVER_NAME": "localhost:3000",
  "MAILGUN_DOMAIN": "${MAILGUN_DOMAIN}",
  "MAILGUN_KEY": "${MAILGUN_KEY}",
  "LOGGLY_SUBDOMAIN": "${LOGGLY_SUBDOMAIN}",
  "LOGGLY_TOKEN": "${LOGGLY_TOKEN}",

  "PG_DB": "${PG_DB}",
  "PG_UID": "${PG_UID}",
  "PG_PWD": "${PG_PWD}",
  "PG_HST": "${PG_HST}",
  "PG_BKP": "${PG_BKP}",
  "public": {
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
