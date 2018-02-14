# If /root/.my.cnf exists then it won't ask for root password
if [ -f /root/.my.cnf ]; then

    mysql -e "CREATE DATABASE clients;"
    mysql -e "CREATE USER clients@localhost IDENTIFIED BY 'clients';"
    mysql -e "GRANT ALL PRIVILEGES ON clients.* TO 'clients'@'localhost';"
    mysql -e "FLUSH PRIVILEGES;"

# If /root/.my.cnf doesn't exist then it'll ask for root password   
else
    echo "Please enter root user MySQL password!"
    read rootpasswd
    mysql -uroot -p${rootpasswd} -e "CREATE DATABASE clients;"
    mysql -uroot -p${rootpasswd} -e "CREATE USER clients@localhost IDENTIFIED BY 'clients';"
    mysql -uroot -p${rootpasswd} -e "GRANT ALL PRIVILEGES ON clients.* TO 'clients'@'localhost';"
    mysql -uroot -p${rootpasswd} -e "FLUSH PRIVILEGES;"
fi