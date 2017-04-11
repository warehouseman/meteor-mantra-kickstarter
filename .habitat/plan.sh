############################################################################
#                                                                          #
#  ******  A Chef Habitat plan file for packaging Meteor projects ******   #
#                                                                          #
############################################################################


#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#                                                                          #
#             You    * DO *    need to change these settings ...           #
#                                                                          #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

#               Name of Habitat origin.  E.g. --  pkg_origin=yourse1f-yourorg
pkg_origin=warehouseman

#              Name of Habitat package.  E.g. --  pkg_name=todos
pkg_name=meteor-mantra-kickstarter

#       Package formal release version.  E.g. --  pkg_version=0.1.1
pkg_version=0.2.81

#        How you wish to be identified.  E.g. --  pkg_maintainer="Yourself <yourse1f.yourorg@gmail.com>"
pkg_maintainer="Martin Bramwell <mhb.warehouseman@gmail.com>"

# Where your source code is published..  E.g. --  pkg_upstream_url=https://github.com/yourse1f-yourorg/todos
pkg_upstream_url=https://github.com/warehouseman/meteor-mantra-kickstarter;


#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#                                                                          #
#               You  * should *  look over these settings ...              #
#                                                                          #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#


#                 The same license as your project  E.g. --  pkg_license=('MIT')
pkg_license=('MIT')

# The port this package should expose to the world  E.g. --  pkg_expose=(3000)
pkg_expose=(3000)



#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#
#                                                                          #
#             You  * DO NOT *  need to change these settings ...           #
#                                                                          #
#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~#

pkg_source="unused. source code is supplied dynamically locally"

# pkg_deps=(core/node)
pkg_deps=(looprock/node/4.4.7)

do_download() { # 01
  return 0;     # Nothing to download
}

do_verify() { # 02
  return 0;     # No download to verify
}

# do_check() { # 03  return 0 }

# do_clean() { # 04  return 0 }

do_unpack() { # 05
  return 0;     # No download to unpack
}

# do_prepare() { # 06  return 0 }


do_build() {

  build_line "Build. Start...";
  echo " ** Variable ${pkg_prefix} -  This variable is the absolute path for your package.";
  echo " ** Variable ${pkg_dirname} -  Set to ${pkg_name}-${pkg_version} by default. If a .tar file extracts to a directory that's different from the filename, then you would need to override this value to match the directory name created during extraction.";
  echo " ** Variable ${pkg_svc_path} -  Where the running service is located. $HAB_ROOT_PATH/svc/$pkg_name";
  echo " ** Variable ${pkg_svc_data_path} -  Where the running service data is located. $pkg_svc_path/data";
  echo " ** Variable ${pkg_svc_files_path} -  Where the gossiped configuration files are located. $pkg_svc_path/files";
  echo " ** Variable ${pkg_svc_var_path} -  Where the running service variable data is located. $pkg_svc_path/var";
  echo " ** Variable ${pkg_svc_config_path} -  Where the running service configuration is located. $pkg_svc_path/config";
  echo " ** Variable ${pkg_svc_static_path} -  Where the running service static data is located. $pkg_svc_path/static";
  echo " ** Variable ${HAB_CACHE_SRC_PATH} -  The default path where source archives are downloaded, extracted, & compiled.";
  echo " ** Variable ${HAB_CACHE_ARTIFACT_PATH} -  The default download root path for packages.";
  echo " ** Variable ${HAB_PKG_PATH} -  The root path containing all locally installed packages.";
  echo " ** Variable ${PLAN_CONTEXT} -  The location on your local dev machine for the files in your plan directory.";
  echo " . . . ";
  cd ${PLAN_CONTEXT};
  chmod a+rw -R ./results;
  mkdir -p ./results/bundle;
  if [ -f "./results/bundle/main.js" ]; then
    pushd ./results/bundle/programs/server;
    npm install;
    popd;
  else
    build_line "Build. Error:";
    build_line "A previously built Meteor bundle is required in the directory './.habitat/results/.";
    build_line "You need to execute the following command (or similar) before using 'hab'";
    build_line "  meteor build ./.habitat/results --directory; # --server-only;";
    exit_with "Follow the instructions above and repeat." 55;
  fi;
  # npm install;

  # mkdir -p ./results/meteor
  # meteor build ./results/meteor --directory --server-only
  build_line "Build. Done.";

}

do_install() {
  build_line "Install. Start...";
  cp -fr ${PLAN_CONTEXT}/results/bundle/* ${pkg_prefix};
  build_line "Install. Moved to ${pkg_prefix}";
  build_line "Install. Done.";

}
