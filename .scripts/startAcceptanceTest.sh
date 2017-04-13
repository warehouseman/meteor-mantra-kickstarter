#!/usr/bin/env bash
#
pushd `dirname $0` > /dev/null; SCRIPTPATH=`pwd`; popd > /dev/null;
declare PROJECT_ROOT=${SCRIPTPATH%/.scripts};
declare E2E=${PROJECT_ROOT}/.e2e_tests;

echo PROJECT_ROOT=${PROJECT_ROOT};
echo Acceptance test dir : ${E2E};
${PROJECT_ROOT}/.scripts/free.sh;

declare CHIMP="${CHIMP_CMD:-${PROJECT_ROOT}/node_modules/.bin/chimp}";
declare LOGS_DIR="${CIRCLE_ARTIFACTS:-/var/log/meteor}";

pushd ${E2E} >/dev/null;

  pwd;
  ${CHIMP} ./chimp-config.js --ddp=http://localhost:3000 --watch --path=.;

popd >/dev/null;
