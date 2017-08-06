#!/usr/bin/env bash
#
sed -ir '/"mmks_[^\s\\]*":/d' package.json;
