[![CircleCI](https://circleci.com/gh/yourse1f-yourorg/mmks/tree/apollo.svg?style=svg)](https://circleci.com/gh/yourse1f-yourorg/mmks/tree/apollo)  [![Dependency Status](https://david-dm.org/yourse1f-yourorg/mmks/apollo/status.svg)](https://david-dm.org/yourse1f-yourorg/mmks/apollo)  [![devDependency Status](https://david-dm.org/yourse1f-yourorg/mmks/apollo/dev-status.svg)](https://david-dm.org/yourse1f-yourorg/mmks/apollo?type=dev)  [![Join the chat at https://gitter.im/meteor-mantra-kickstarter/MeteorMantraKickStarter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/meteor-mantra-kickstarter/MeteorMantraKickStarter)  [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Meteor Mantra Kickstarter

![screen register](https://github.com/yourse1f-yourorg/mmks/blob/apollo/public/screens/users.collection.png)

### tl, dr!

This a starter app for Meteor developers who want to structure their work according to the [Mantra Specification](https://kadirahq.github.io/mantra/).

Please feel welcome to comment on any experience you have with it in the on going discussion [here](https://talk.mantrajs.com/) ( for reference, prior discussion venues are available [here](https://talk.mantrajs.com/) and, even earlier, [here](https://github.com/kadirahq/mantra/issues/3) )


### Features

You get :

* a thoroughly tested application from which to launch your application development
* [single command installation](https://github.com/yourse1f-yourorg/mmks/blob/apollo/install_all.sh) of all dependencies and support services
* [single command build](https://github.com/yourse1f-yourorg/mmks/blob/apollo/build_all.sh) of Android APK, with download from app menu bar.
* [database flexibility](https://github.com/yourse1f-yourorg/mmks/blob/apollo/server/api/db-connectors.js#L5) ready for SQLite for development and PostgreSQL for production, thanks to [Sequelize](http://docs.sequelizejs.com/en/v3/) and [Apollo](http://www.apollodata.com/).
* [database migration](https://github.com/yourse1f-yourorg/mmks/blob/apollo/server/api/.knex) with [knex](http://knexjs.org/)
* full [end to end, functional testing](https://github.com/yourse1f-yourorg/mmks/blob/apollo/.e2e_tests/features/002_colors/addColor.feature) with [Chimp](https://chimp.readme.io/) and [Cucumber](https://cucumber.io/)
* continuous integration and test in [CircleCI](https://circleci.com/gh/yourse1f-yourorg/mmks).  (Latest build result :: [![CircleCI](https://circleci.com/gh/yourse1f-yourorg/mmks/tree/apollo.svg?style=svg)](https://circleci.com/gh/yourse1f-yourorg/mmks/tree/apollo))
* [unit testing](https://github.com/yourse1f-yourorg/mmks/blob/apollo/client/modules/core/containers/tests/post.js) with Mocha, Chai, Sinon
* client side **and** server side [logging](https://github.com/yourse1f-yourorg/mmks/tree/apollo/lib/logging) to [Loggly](https://www.loggly.com/):
    * [logatim](https://github.com/sospedra/logatim): isomorphic multilevel logging, that feeds into
    * [winston](https://github.com/winstonjs/winston) server side transports
* [Mailgun ready](https://github.com/yourse1f-yourorg/mmks/blob/apollo/server/methods/mail.js) password reset example
* several different CRUD examples, including
    * an isomorphic MongoDB CRUD [module in a single NPM package](https://github.com/yourse1f-yourorg/mmks/tree/apollo/.pkgs/mmks_widget), which contains all client **and** server elements, as well as all Chimp tests
    * a isomorphic Apollo CRUD [module in a single NPM package](https://github.com/yourse1f-yourorg/mmks/tree/apollo/.pkgs/mmks_book), which contains all client **and** server elements, as well as all Chimp tests
    * user management CRUD module: user registration, password reset, login, logout
* full [multi-level access control](https://github.com/yourse1f-yourorg/mmks/blob/apollo/lib/access_control.js) authorizations:
    * levels: Owner, Administrator, Staff, Member, Customer, Registered
    * acts on: [menu items](https://github.com/yourse1f-yourorg/mmks/blob/apollo/client/modules/layout/components/NavLeftContent.jsx#L40), React [components](https://github.com/yourse1f-yourorg/mmks/blob/apollo/client/modules/_colors/components/_sidebar.jsx#L24) and server side [methods](https://github.com/yourse1f-yourorg/mmks/blob/apollo/server/methods/_colors.js#L23)
* uses [mantra-core](https://github.com/mantrajs/mantra-core) modularization, with application wide state, composed in pure React JS components with [react-komposer](https://github.com/kadirahq/react-komposer) (Blaze is not used at all)
* [Astronomy v2](https://github.com/jagi/meteor-astronomy) model schema
* forms based development examples with:
    * [uniforms](https://github.com/vazco/uniforms): in the 'books' module
    * [tcomb-form](https://github.com/gcanti/tcomb-form): for most of the CRUD modules
    * [formsy-react](https://github.com/christianalfoni/formsy-react): for user login, registration and password forms. Also [formsy-react-components](https://github.com/twisty/formsy-react-components)
* [Switchable Bootstrap Swatches](https://bootswatch.com/) bootstrap theme modules can be switched in and out.
* completely linted with eslint, with specs available to editors such as Sublime Text 3

### Getting started

My default development, test and run environment is a virtual machine running Xubuntu Xenial Xerus, with 12Gb of disk, 3Gb memory and 2 processors.

If you are in a disposable virtual machine with a recent fresh Ubuntu installation, you can follow the steps below more or less blindly. **Please, do NOT do this in a machine that has stuff you care about!**

1.  Pull in your GitHub SSH credentials from somewhere, for example a sister VM...

    ```
    pushd ~/.ssh;
    scp -r 192.168.122.xxx:/home/you/.ssh .;
    popd;

    ```

1.  Ensure dependencies are clean and up-to-date :

    ```
    sudo apt-get -y update && sudo apt-get -y upgrade && sudo apt-get -y dist-upgrade && sudo apt-get -y clean && sudo apt-get -y autoremove;

    ```

1.  Install and configure git :

    ```
    sudo apt -y install git;
    git config --global user.name "You Yourself";
    git config --global user.email "yourself.yourorg@gmail.com";
    git config --global credential.helper cache;
    git config --global credential.helper 'cache --timeout=36000';
    git config --global push.default simple;

    ```

1. Make a parent directory and step into it :

    ```
    mkdir -p ~/projects;
    cd ~/projects;

    ```

1. Clone our repository and step into it :

    ```
    git clone git@github.com:yourse1f-yourorg/mmks.git;
    cd mmks;

    ```

1. Switch over to our branch :

    ```
    git checkout apollo;
    git branch # verify being on apollo;

    ```

1. Run the script to set up for development and testing (installs Java, NodeJS, Chimp, Meteor and the project's NodeJS package dependencies) :

    ```
    meteor npm run install_all;

    ```

1. Prepare your `settings.json` :

    ```
    cp settings.json.example settings.json;
    nano settings.json;

    ```
    You'll need to go [get your Mailgun API key.](https://mailgun.com/app/dashboard) and [your Loggly domain token](https://www.loggly.com/),  then correct these settings :
    ```
    >   "HOST_SERVER_NAME": "localhost:3000",
    >   "MAILGUN_DOMAIN": "yourhost.yourpublic.work",
    >   "MAILGUN_KEY": "(As if I'm gonna to leave THAT lying around.)  A valid key has 36 characters and begins with 'key-'.",
    >   "LOGGLY_SUBDOMAIN": "yourwork",
    >   "LOGGLY_TOKEN": " ( not this either ) ",
    ```

    * Note : If you don't care whether password reset works, you don't need Mailgun.  In that case, you can use this as your API key ...  ```key-dead0dead0dead0dead0dead0dead000```.

1. Now we can run Meteor and explore at [http://localhost:3000](http://localhost:3000) :

    ```
    meteor --settings=settings.json;

    ```
    (The first time through, you may see it terminate with the message `killed`.  Just run it again.)

1. Open a **new** terminal window to run linting and unit-tests :

    ```
    cd ~/projects/meteor-mantra-kickstarter;
    npm test;

    ```
    A goodly portion of the client side is fully tested using the familiar tools Mocha, Chai and Sinon.

1. Open another terminal window and run acceptance tests :

    ```
    source ~/.profile; # if you haven't logged out since running 'install_all'
    cd ~/projects/meteor-mantra-kickstarter;
    meteor npm run acceptance;

    ```
1. See the `scripts` section of `package.json` for details of other testing and setup commands.

1. Return to your original terminal window and build for Android :

    ```
    export KEYSTORE_PWD="obscuregobbledygook";
    export HOST_SERVER_NAME="http://moon.planet.sun:3000/";
    export ROOT_URL="${HOST_SERVER_NAME}";
    export YOUR_FULLNAME="You Yourself";
    export YOUR_ORGANIZATION_NAME="YourOrg";

    meteor npm run build_all;
    meteor npm run run_development;

    ```

1. Debug in Android in a Xubuntu virtual machine :

    To see how to debug an Android app between two virtual machines watch [Meteor / CircleCI Tutorial -- Bonus - Debug your Android App in a Virtual Machine](https://www.youtube.com/watch?v=xB3wWvK5YT0&index=12&list=PLq7op4J183lXpGr79hjfQVQHB-saVqLBL)

    Set up server IP address in KitKat machine from the server ...

    ```
    you@yours:~$ ifconfig                           # Grab IP address to clipboard
    you@yours:~$ adb connect 192.168.122.174        # Start a connection to KitKat host (as shown in video)
    you@yours:~$ adb devices -l                     # Make sure the host is listed
    you@yours:~$ adb shell                          # Get into the Android terminal shell
    uid=2000(shell)@x86:/ $ su                      ## Get root privileges
    uid=0(root)@x86:/ $ mount -o remount,rw /system ## Allow to write
    uid=0(root)@x86:/ $ vi /system/etc/hosts        ### Edit to add the server (paste in IP addresss and whatever you used for ${HOST_SERVER_NAME})
    uid=0(root)@x86:/ $ mount -o remount,ro /system ## Go back to read-only
    uid=0(root)@x86:/ $ exit                        ## Get out
    uid=2000(shell)@x86:/ $ ping moon.planet.sun    # See if it worked

    ```

1. Serve up occasional public demos directly from your developer machine via [NGrok](https://ngrok.com/):

    If you want to see an Android phone running the app from a server on the web, without having to go through all the server setup effort, [ngrok](https://ngrok.com/) makes it easy:

    1. Use you GitHub gredentials to log in through [NGrok's login/sign-up page](https://dashboard.ngrok.com/user/login)
    1. [Download NGrok](https://ngrok.com/download)
    1. Install it somewhere...

        ```
        cd ~;
        mkdir -p utilities;
        cd utilities;
        unzip ~/Downloads/ngrok*.zip;
        ```
    1. Copy **Your Tunnel Authtoken** from the [Auth tab](https://dashboard.ngrok.com/auth)
    1. Install your token :

        ```
        ./ngrok authtoken 2RCuUd7C8Qi5qMJJQAmD6_25xo9VDPpfiZXgTk2kY8X;
        ```
    1. Start an http tunnel to port 3000 :

        ```
        ./ngrok http 3000;
        ```
    1. Return to your project root and build for Android, specifying the `ngrok` "forwarding" address for the *HOST_SERVER_NAME* to which remote mobile devices should connect :

        ```
        export EXTERNAL_DOMAIN="a9a18d90.ngrok.io";
        export HOST_SERVER_NAME="http://${EXTERNAL_DOMAIN}/";

        ./build_all.sh;
        ```
    1.  Start up meteor on `localhost:3000` as usual, but specify *ROOT_URL* to match *HOST_SERVER_NAME*.

        ```
        export ROOT_URL="${HOST_SERVER_NAME}";
        meteor --settings=settings.json;
        ```

        You should see :

        ```
        [[[[[ ~/projects/mmks ]]]]]

        => Started proxy.
        => Started MongoDB.
        => Started your app.
        => App running at: http://a9a18d90.ngrok.io/
        ```


        You can then tap on the little android robot icon in the menu bar to download the app version for installation in the device.


        **Note :** You can still access the app [locally](http://localhost:3000) as before.


### Other Notes

For my own use, I keep open at least 4 terminal windows, with these commands, ready to run :

1. For running Meteor

    ```
    cd projects/meteor-mantra-kickstarter/
    meteor --settings=settings.json
    ```

2. For running acceptance tests

    ```
    cd projects/meteor-mantra-kickstarter/
    meteor npm run acceptance
    ```

3. For checking changes in the database

    ```
    cd projects/meteor-mantra-kickstarter/
    meteor mongo
    # then
     db.users.findOne({ "emails.address" : "member@example.com" });
     db.getCollection("_colors").find({});
    ```

4. For searching for keywords in the code

    ```
    cd projects/meteor-mantra-kickstarter/
    grep -R --exclude=\*.{css,txt,min.js} --exclude-dir={.git,.meteor,node_modules} "key" -A 1
    ```

I tend to use the above commands daily.
To get quickly ready to work, I open this README page, open the four terminal windows and cut and paste into them.



