import { DatabaseError } from "sequelize/types"

docker exec -it d50657e1aed5 mongo -u carlos -p carlos --authenticationDatabase herois

//Databases
show dbs    

//Dab Herois
use herois 

//show collections 
show collections

//create
db.herois.insert({
    nome:'Flash',
    poder: 'Velocidade',
    dataNascimento: '30-11-1984'
})

for (let i = 0; i < 50; i++) {
    db.herois.insert({
        nome:`Clone-${i}` ,
        poder: 'Velocidade',
        dataNascimento: '30-11-1984'
    }) 
}

//read
db.herois.find()

db.herois.find().pretty()

db.herois.count()

db.herois.findOne()

db.herois.find().limit(100).sort({nome: -1})

//delete
db.herois.remove({nome:"Flash"})


//update
db.herois.findOne({nome:"Flash"})
db.herois.update(
    {_id:ObjectId("5df35322f80dff538ddc6b74")},
    { $set : {nome : "Superman"}})