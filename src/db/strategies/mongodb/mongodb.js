const ICrud = require('../interfaces/ICrud')
const Mongoose = require('mongoose')
ObjectId = require('mongodb').ObjectID;

const STATUS = {
    0:"Disconnected",
    1:"Connected",
    2:"Connecting",
    3:"Disconnecting"
}


class MongoDB extends ICrud {
    constructor( connection, schema){
        super()
        this._schema = schema
        this._connection = connection
    }
    async isConected(){
        const state = STATUS[this._connection.readyState]
        if (state === 'Connected') {
            
            return state
        }
        if (state !== 'Connecting') {
            return state
        }
        await new Promise(resolve => setTimeout(resolve,1000))
        return STATUS[this._connection.readyState]

    }
    static connect(){
        Mongoose.connect(process.env.MONGO_DB_URL, {useNewUrlParser: true}, function (error) {
            if(error){
            return console.log('Falha na conexao', error)
            }
        })

        const connection = Mongoose.connection
        connection.once('open', ()=>{ console.log('Database running')})
        return connection

    }
    
    async create(item){
        return await this._schema.create({nome:item.nome, poder:item.poder})
        
    }

    async read(item ={}, skip=0, limit= 10){
        return await this._schema.find(item).skip(skip).limit(limit)
        
    }

    async update(id,item,upsert=false){
        
        return await this._schema.updateOne({ _id: id }, { $set: item })
    }

    async delete(id){
        return await this._schema.deleteOne({ _id: id }); 
    }

}
module.exports = MongoDB







