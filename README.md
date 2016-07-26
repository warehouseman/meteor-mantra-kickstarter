
# meteor-mantra-kickstarter

### bring your meteor mantra development up to speed

Please make sure you read [Mantra Specification](https://kadirahq.github.io/mantra/) and visit the [official repository](https://github.com/kadirahq/mantra). Keep in mind that Mantra is an approach to application architecture rather than a framework. It is supposed to keep our options open and not lock us in to any particular library, we are free to choose how manage routing, state management and data-binding. In other words bring your own toolkit: flow router / react router GraphQL, Redux or any other shiny new thing.


### Features

* follows mantra feature specific modules approach, if interested please join an [ongoing discussion here](https://github.com/kadirahq/mantra/issues/3)

* formsy-react for user login, registration and password forms [formsy-react](https://github.com/christianalfoni/formsy-react) and [formsy-react-components](https://github.com/twisty/formsy-react-components)

* user registration, login, logout with application wide state, composed in pure React JS components with [react-komposer](https://github.com/kadirahq/react-komposer) (there is no blaze ui, or any blaze to react)

* simple but complete Colors modules wih CRUD

* simple but not fully complete user management module

* [tcomb-form](https://github.com/gcanti/tcomb-form) based forms in Colors module.

* [meteor astronomy](https://github.com/jagi/meteor-astronomy) models (looking forward to the upcoming v2)

* bootstrap theme module based on [Flatly](https://bootswatch.com/flatly/) with a configuration file, you can replace it or remove if you have other requirements


![screen homepage](public/screens/homepage.png)

![screen register](public/screens/register.png)

![screen login](public/screens/login.png)

![screen password](public/screens/password.png)

![screen users-collection](public/screens/users.collection.png)

![screen users-add](public/screens/users.add.png)

![screen colors-collection](public/screens/colors.collection.png)

![screen colors-add](public/screens/colors.add.png)

![screen colors-single](public/screens/colors.single.png)

### Setting Up

1. make sure you [have Meteor installed](curl https://install.meteor.com/ | sh)
1. make sure you have your Mailgun API key ready.  Get it here, [Mailgun API key](https://mailgun.com/app/dashboard). *
1. clone [this repo](https://github.com/warehouseman/meteor-mantra-kickstarter)
1. make **certain** you are on the v0.2.1 branch!  ( **¡¡ Seriously !!** )
1. copy "settings.json.example" to "settings.json"
1. write your Mailgun credentials into the corresponding fields


```
npm install
sudo npm run workarounds # clean up some ugly non-fatal run-time warnings from the mailer package
meteor --settings=settings.json
```

Your app should be running [http://localhost:3000](http://localhost:3000)

Please report issues.  We have an [overv.io](https://overv.io/warehouseman/meteor-mantra-kickstarter/board/) repository overview.

* Note : If you don't care whether password reset works, you don't need Mailgun.  In that case, you can use this as your API key ...  ```key-dead0dead0dead0dead0dead0dead000```.

### Roadmap

This is an early draft. Mantra architecture is very fresh and React environment is quite dynamic, that means things will change and break. We will be following the discussions and will try to keep this project up to date.

The goal is to bring some simple yet valuable to most apps features:

* user management
* role management
* ACL management
* profile page
* account page
* advanced CRUD component with pagination
* file manager

### Running Tests (to be completed)

#### Unit Tests
In this app, a good portion of the client side is fully tested using the familiar tools like Mocha, Chai and Sinon.

You can run linting and unit tests with:

```
npm test
```

#### Acceptance (end to end) Tests

Acceptance Tests, (a.k.a end to end, e2e, functional, etc. tests) require Chimp.

To use Chimp you will have to have installed :

1. Jave JRE
1. NPM
1. NodeJS
1. Chimp

You can acceptance tests with:

```
npm run acceptance
```



**See the `scripts` section of `package.json` for details of other testing and setup commands.**

### Other Notes

For my own use, I set up at least 4 terminal windows with these commands ready to run :

*Term 1*

```
cd projects/meteor-mantra-kickstarter/
meteor --settings=settings.json
```

*Term 2*
```
cd projects/meteor-mantra-kickstarter/
npm run acceptance
```

*Term 3*
```
cd projects/meteor-mantra-kickstarter/
meteor mongo
# then
 db.users.findOne({ "emails.address" : "member@example.com" });
 db.getCollection("_colors").find({});
```

*Term 4*
```
cd projects/meteor-mantra-kickstarter/
grep -R --exclude=\*.{css,txt,min.js} --exclude-dir={.git,.meteor,node_modules} "key" -A 1
```

I tend to use the above commands daily.
To get quickly ready to work, I open this file, open the four terminal windows and cut and paste into them.
