#!/bin/bash
echo "Minor fixes for npm package debris";

function mailgun {

  rm -fr node_modules/nodemailer-mailgun-transport
  npm install ./.workarounds/nodemailer-mailgun-transport

}

mailgun;
