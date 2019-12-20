# lista containers
docker ps 

# instala e configura um container para postgres
docker run --name postgres -e POSTGRES_USER=carlos -e POSTGRES_PASSWORD=carlos -e POSTGRES_DB=heros -p 5432:5432 -d postgres

# entrar no container
docker exec -it postgres /bin/bash

# acesso grafico ao postgress pelo adminer
docker run --name adminer -p 8080:8080 --link postgres:postgres -d adminer

# instala e configura o mongoDB
docker run --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=admin -e MONGO_INITDB_ROOT_PASSWORD=admin -d mongo:4

# cliente Grafico para Mongo db
docker run --name mongoclient -p 3000:3000 --link mongodb:mongodb -d mongoclient/mongoclient

# porta de acesso no Windows
http://192.168.99.100:8080/ Postgres
http://192.168.99.100:3000/ Mongodb

# Configurar acesso ver video https://cursos.nodebr.org/courses/448292/lectures/8539753 aos 13 minutos

# cria um usuario no Database
docker exec -it mongodb mongo --host localhost -u admin -p admin --authenticationDatabase admin --eval "db.getSiblingDB('herois').createUser({user:'carlos', pwd:'carlos', roles: [{role:'readWrite', db:'herois'}]})"

# start containers  
docker start $(docker ps -aq)