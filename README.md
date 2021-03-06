# UAS_2017_WebGroup
WebApp 

The Webapp is built with [AngularJS 1.65](https://angularjs.org/). 
The UI components are built with [Angular Material](https://material.angularjs.org/).

## Installation

Clone the repository:

    $ git clone https://github.com/MojioMS/UAS_2017_WebGroup

Install dependencies:
    
    $ npm install

* if you got an error, you probably have not node or a recent version of npm installed. Follow the steps at ```https://docs.npmjs.com/getting-started/installing-node``` to install Node.js. After installing, test it using ```$ node -v```. It should say a version number. Then, make sure npm is installed by using ```$ npm install npm@latest -g```. After install process, test your npm version with ```$ npm -v``` It should again say a version number. Now retry installing the node dependencies with ```$ npm install```.

Install bower components:

    $ bower install

## Run it:

Run the development web-server via gulp:

    $ gulp

You can now have a look on the Webapp via your webbrowser at 
```localhost:4014``` or ```127.0.0.1:4014```

Not a fan of gulp? Then run it via NodeJS: 
    
    $ node all.js

Have a look on the Webapp via your webbrowser at
```localhost:4014``` or ```127.0.0.1:4014```

### Changing the port:
* for gulp:
4014 is the default port for this project, if you want or have to change it, 
open the project's ```/gulpfile.js``` and change the port in line 
19 to your desire.

* for node:
if you want or have to change port when hosting via nodeJS, 
open the project's ```/all.js``` and change the port in line 
7 to your desire.