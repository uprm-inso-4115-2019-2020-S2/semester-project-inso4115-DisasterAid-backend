# Project setup with Vagrant
Vagrant is a tool for building and managing virtual machine environments in a single workflow.

Download latest version [here](https://www.vagrantup.com/downloads.html).

## Requirements
* Vagrant, [download here](https://www.vagrantup.com/downloads.html).
* VirtualBox, [download here](https://www.virtualbox.org/wiki/Downloads)
## Installation
### Vagrant up
In the project directory with **Vagrantfile** already created, run:
```bash
    $ vagrant up
```
This creates the virtual machine with all requirements for the project and sharing folders with the host machine's project directory.

### Setup local database in CLI
Enter the virtual machine through ssh
```bash
    $ vagrant ssh
```
### Create a new database user
Create a new user in postgres with the following properties: `user: insouser` `password: inso4115`
```bash
    $ sudo -i -u postgres
    $ createuser insouser -e -P
    $ inso4115
    $ inso4115
```

### Create database
Create a new database named **DisasterAid** and set the owner to **insouser**.
```bash
    $ createdb DisasterAid
    $ psql DisasterAid
    $ grant all privileges on database "DisasterAid" to insouser;
```

## Create database tables
When you have the app running, open a separate terminal and run:
```bash
    $ python3 /vagrant/setUpDB.py 
``` 
To run the application, change directory into the shared folder **vagrant** and  run:
```bash
    $ cd /vagrant/
    $ flask run --host=0.0.0.0
```

Connect to your application through your host machine using IP Address 192.168.33.102
Your all set, happy coding!