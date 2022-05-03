#!/bin/bash
sudo apt update;
sudo apt upgrade;
sudo apt install -y curl;
sudo curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -;
sudo apt install nodejs
sudo npm install pm2 -g
git clone src://
pm2 start --name front "HTTPS=true SSL_CRT_FILE=${cert} SSL_KEY_FILE=${private}" --start
