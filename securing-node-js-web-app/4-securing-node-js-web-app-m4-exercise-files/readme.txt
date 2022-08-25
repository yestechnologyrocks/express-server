
With every course module, there is generally a “before” and “after” demo files.  You are welcome to either update the “before” demo files along with the course, or see the final change in the “after” version of the demo files. 

The application will change slightly on occasions as we install various local NPM packages to support various changes to the application as we add and update application code. 

The following are both the one-time installation instructions as well as instructions for updating individual modules demos and running the application. 

IMPORTANT NOTE: Unfortunately, if it wasn’t for the requirement of the bcrypt NPM package which builds using node-gyp (which has its own Mac and Windows based dependencies), a large portion of the separate installation components and configuration would not be needed. You won’t have to manually compile bcrypt dependencies, but when installing bcrypt from NPM, part of the install process will compile dependencies.   



ONE TIME INSTALLATION

MAC USER
	1.	Install Node 5.11.1
	2.	Install MongoDB 3.4.0 (see https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/ for more information)
			1. Requires /data/db folder 

REQUIRED FOR BCRYPT (Password Storage)
	1.	Install node-gyp
		A) run at terminal: npm install node-gyp -g

	2.	Python 2.7
	4.	run at terminal: npm config set python python2.7
	3.	Install Xcode (terminal) 
	1.	xcode-select —install
	2.	accept terms
	3.	install

ADDITIONAL: For compiling bcrypt, bcrypt uses the node.js build tool node-gyp. For Mac users, node-gyp requires Xcode to be installed. For more information or instructions see: https://github.com/nodejs/node-gyp/issues/569 


WINDOWS USER

APPLICATION REQUIREMENTS
	1.	Install Node 5.11.1
	2.	Install MongoDB 3.4.0 ( see https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-os-x/ for more information)
	1.	Requires c:\data\db directory

REQUIRED FOR BCRYPT (Password Storage)
	1.	Install node-gyp
	1.	run at console: npm install node-gyp -g
	2.	run at console: npm config set msvs_version 2015
	2.	Python 2.7
	1.	run at console: npm config set python python2.7

ADDITIONAL: For compiling bcrypt, bcrypt uses the node.js build tool node-gyp.  For Windows OS, node-gyp requires use of Visual Studio C++ build tools.  You will find the specific instructions for acquiring/installing these Visual Studio C++ build tools @ https://www.npmjs.com/package/node-gyp under the “Installation” section. 


UNIX USER
	1.	Install Node 5.11.1
	2.	Install MongoDB 3.4.0 (see https://docs.mongodb.com/v3.4/administration/install-on-linux/ for more information)
	1.	Requires /data/db folder 

REQUIRED FOR BCRYPT (Password Storage)
	1.	Install node-gyp
	1.	run at terminal: npm install node-gyp -g
	2.	Python 2.7
	1.	run at terminal: npm config set python python2.7
	3.	make (unix based build tool - see https://www.gnu.org/software/make/)
	4.	compiler tool chain like: GCC (see “additional” below for more information)


ADDITIONAL: For compiling bcrypt, bcrypt uses the node.js build tool node-gyp. Unix users, see: https://github.com/nodejs/node-gyp/issues/569 which outlines details about the make/gcc compiling dependencies for more information.


—————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————————
RUNNING APPLICATION

THINGS TO KNOW
	1.	When the application is ran, it will verify DB and required data is seeded. Therefore the first time the application is ran the necessary database, collections and seed data will be created.


	2.	To keep things simple, the application is looking for a locally ran mongodb server running on the default port 27017.


	3.	Some modules add additional NPM packages. Therefore, various module demos will need to update the locally installed NPM packages before running the application.  See instructions below for updating and running.


	4.	The application will launch your default browser when the server has started.


	5.	Its not always required when moving between demo archive, but at times properties are added to the Mongoose schema and requires that the current database OR collections be dropped so that the next time the application is ran, the seed data for the need schema properties are filled.


	6.	You only need to run the application (according to the instructions below) unless the course module is updating locally installed NPM packages or mongoose schemas.

INSTRUCTIONS:UPDATING
	1.	Extract demo archive
	2.	Navigate to root of demo directory
	3.	from terminal run:  npm install

INSTRUCTIONS:RUNNING
	1.	Extract demo archive
	2.	Navigate to root of demo directory
	3.	from terminal run:  npm start






