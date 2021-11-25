#Nodejs

1. To install nodejs, download the current version of node from here https://nodejs.org/en/
2. After downloading, install the node.
3. Open Terminal, and type ```node -v``` to check node version
4. To check where nodejs is installed type command ```which node```

To add key in github
1. run command ```ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```
2. Enter your file name where you want to store: ```Enter a file in which to save the key (/Users/you/.ssh/id_rsa): [Press enter]```
3. Enter password
4. Before adding the new SSH key to the ssh-agent first ensure the ssh-agent is running by executing: ```eval "$(ssh-agent -s)"```
5. Once the ssh-agent is running the following command will add the new SSH key to the local SSH agent. ```ssh-add -K /Users/you/.ssh/id_rsa```
6. The new SSH key is now registered and ready to use!
7. To copy ssh public key, then run command ```pbcopy < ~/.ssh/id_rsa.pub```
