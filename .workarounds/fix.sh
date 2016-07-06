#!/bin/bash
echo "Minor fixes for npm package debris";

function mailgun {

  pushd ./.workarounds/nodemailer-mailgun-transport
  npm link
  popd
  rm -fr node_modules/nodemailer-mailgun-transport
  npm link nodemailer-mailgun-transport 

}

mailgun;
