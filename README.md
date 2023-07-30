*** Project Structure ***
This project uses object oriented JS to reduce code duplication. For compilers of loosely typed languages like python, php & js,
the Interpreter class is inherited from (interpreter.js) and for staticly typed languages like cpp, c, etc., the Compiler class is 
inherited from (compiler.js). Both these classes inherit from AbstractCompiler class(abstractcompiler.js).

*** Hosting ***
To host this node-app, we have to use a web hosting service. In this demo i have used AWS (t4.micro w/ 1gb ram and 8gb storage, Debian OS).

1. Initial Setup
Run the following commands:
    sudo apt update
    sudo apt upgrade
    sudo apt install nodejs npm
    sudo apt install git
    git clone -b <branch-name> <repository-url>
    cd <project-folder>
    npm install
    node app.js (To check if server starts up correctly)

PORT - the default port is 3000, it can be changed through the app.js file.

Now to install nginx:
    sudo apt install nginx
    sudo nano /etc/nginx/sites-available/webserver_name

Copy the following 