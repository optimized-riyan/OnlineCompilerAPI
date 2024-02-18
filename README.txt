*** Project Structure ***
This project uses object oriented JS to reduce code duplication. For compilers of loosely typed languages like python, php & js,
the Interpreter class is inherited from (interpreter.js) and for staticly typed languages like cpp, c, etc., the Compiler class is 
inherited from (compiler.js). Both these classes inherit from AbstractCompiler class(abstractcompiler.js).

Due to the similarity of all the compilers, refer to the comments in the cpp compiler and the python compiler.
However, the java compiler is inherently different due to the file naming issue after compilation.
Also, java programs are supposed to be written by omitting the "public class ABCD {}" part of the code, as if it was
already written.

*** Hosting ***
To host this node-app, we have to use a web hosting service. In this demo i have used AWS (t4.micro w/ 1gb ram and 8gb storage, Debian OS).

1. Initial Setup
    Run the following commands inside a directory of your choice:
        sudo apt update
        sudo apt upgrade
        sudo apt install nodejs npm
        sudo apt install git
        git clone -b <branch-name> <repository-url>
        cd <project-folder>
        npm install
        mkdir files
        node app.js (To check if server starts up correctly)

    PORT - the default port is 3000, it can be changed through the app.js file.

2. Install and Configure Nginx:
    Run these commands:
        sudo apt install nginx
        sudo nano /etc/nginx/sites-available/webserver_name

    Copy the following code into this file:
        server {
            listen 80;
            server_name your_domain.com; # Replace with your domain or IP address

            location / {
                proxy_pass http://127.0.0.1:YOUR_NODEJS_APP_PORT; # Replace with your Node.js app's listening port
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
            }
        }

    Then run the following command:
        sudo ln -s /etc/nginx/sites-available/webserver_name /etc/nginx/sites-enabled/

    Test the nginx configuration that you just made:
        sudo nginx -t
    If there are no errors, you should see "syntax is okay" and "test is successful" messages, now you can restart nginx:
        sudo service nginx restart



3. Installing and Configuring PM2, this will keep the server running even if you logout from the ec2 instance:
    In your project directory:
        sudo npm install -g pm2
        pm2 start app.js --name "custom-name"

    To see the status of, stop, restart or delete the server process, use the following respectively:
        pm2 list
        pm2 stop "custom-name"
        pm2 restart "custom-name"
        pm2 delete "custom-name"


4. Configuring firewall
    Install firewall-cmd, if not already installed:
        sudo apt install firewall-cmd
    
    Allow port 80:
        sudo firewall-cmd --zone=public --add-service=http --permanent
        sudo firewall-cmd --reload

    To verify that port 80 is allowed through the firewall, run:
        sudo firewall-cmd --list-all
    
    in the "ports" parameter, there should be "80/tcp" present.

Now this project should be up and running on the aws ec2 machine.
To see the webpage, enter the ip address of the ec2 instance in the web browser. Thats it!