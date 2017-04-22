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

export IDX=10;
while printf "."; ! httping -qc1 http://localhost:3000 && ((IDX-- > 0));
do
  sleep 5;
done;

${CHIMP} ${E2E}/chimp-config.js --ddp=http://localhost:3000 --path=${E2E};
