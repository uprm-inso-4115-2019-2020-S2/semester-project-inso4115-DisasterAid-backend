# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

  # Every Vagrant development environment requires a box. You can search for
  # boxes at https://vagrantcloud.com/search.
  config.vm.box = "hashicorp/bionic64"

  # Create a private network, which allows host-only access to the machine
  # using a specific IP.
  config.vm.network "private_network", ip: "192.168.33.10"

  # Enable provisioning with a shell script. Additional provisioners such as
  # Ansible, Chef, Docker, Puppet and Salt are also available. Please see the
  # documentation for more information about their specific syntax and use.
  config.vm.provision "shell", inline: <<-SHELL
    sudo apt-get update
    sudo apt install python3-pip -y
    pip3 install flask
    pip3 install flask-sqlalchemy
    pip3 install psycopg2-binary
    pip3 install flask_cors
    pip3 install bcrypt
    pip3 install gunicorn
    sudo apt-get update -y
    sudo apt-get install postgresql postgresql-contrib -y
    sudo apt-get install pgadmin3 -y
  SHELL
end
