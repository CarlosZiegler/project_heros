//npm install hapi

//Import Data from Database
const Context = require('./db/strategies/base/ContextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')

//import hapi
const Hapi = require('hapi')

//new APP
const app = new Hapi.Server({
    port:5000
})

async function main() {
    //new Connection
    const connection = Mongodb.connect()
    //New Context with connection and Schema
    const context = new Context(new Mongodb(connection, HeroiSchema))
    app.route([
        {
            path:'/herois',
            method:'GET',
            handler:(request, head) =>{
                return context.read()
            }
        }
    ])
    await app.start()
    console.log('Servidor rodando', app.info.port)
}
main()