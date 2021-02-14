# LAN-Clipboard
A web app that serves as a clipboard for your local area network.

A video demo: <https://youtu.be/qLrLzOocVww>

## Installation

- The app is build with NodeJS which you can install the Long Term Support (LST) version from <https://nodejs.org/>.

- run the command

        node -v

    to check that Node is installed successfully on your device.

- download the code from the repo or clone it

        git clone https://github.com/IsmailElShinnawy/LAN-Clipboard.git

- navigate into the folder and create a db folder

        cd LAN-clipboard
        mkdir db

- Run this command
        
        npm install

    to install the project dependencies.

- Set the PORT and server password using

        echo SERVER_PASSWORD=the_password_you_choose > .env
    
    and
        
        echo PORT=the_port_you_choose > .env
    
    the default PORT is 3000 and the default password is 1234test

- Then run this command:
        
        node index
    
    which will start the app locally. Open <http://localhost:3000> in your browser to view it.

## Connect from other devices

- To run from other devices you should know the IP address of the machine running the server you could do this by running

        ipconfig /all
    
    in your command prompt.
    
    Your IP will be listed at 
    
    Wireless LAN adapter Wi-Fi > IPv4 address.

- Make sure both the machine running the server and the other device you're trying to connect are on the same LAN.

- Enter the IP as a URL in the other device's browser.

## Additional info

- to delete all info about users and items delete the '/db/lan_clipboard.db' file
- all items inserted by user are deleted once the user is deleted

