#!/usr/bin/env bash
#
echo -e "Pre-commit : drop 'mmks_' packages from 'package.json'."
sed -ir '/"mmks_[^\s\\]*":/d' package.json;
