const {config } = require('dotenv')
const {join} = require('path')
const { ok } = require('assert')

const env = process.env.NODE_ENV || "dev"

ok(env ==="prod" || env=="dev", "Env is Invalid")

const configPath = join(__dirname, './config',`.env.${env}`)

config({
    path:configPath
})

//npm install hapi
//import hapi
const Hapi = require('hapi')


//Import Data from Database
const Context = require('./db/strategies/base/ContextStrategy')
const Mongodb = require('./db/strategies/mongodb/mongodb')
const HeroiSchema = require('./db/strategies/mongodb/schemas/heroisSchema')
const HerouRoute = require('./routes/heroRoutes')
const AuthHero = require('./routes/authRoutes')
const JWT_SECRET = process.env.JWT_KEY
const Hapijwt = require('hapi-auth-jwt2')
const Postgres = require('./db/strategies/postgres/postgres')
const UsersSchema = require('./db/strategies/postgres/schemas/usersSchemas')

//import Plugins for a Documentation
const Vision = require('vision')
const Inert = require('inert')
const HapiSwagger = require('hapi-swagger')

//new APP
const app = new Hapi.Server({
    port:process.env.PORT || 5000
})
console.log(server.options.port)
//List all Methods from a Instance
function mapRoutes(instance, methods) {
    return methods.map(method => instance[method]())
}

async function main() {
    //new Connection
    const connection = Mongodb.connect()
    //New Context with connection and Schema
    const context = new Context(new Mongodb(connection, HeroiSchema))

    const connectionpostgres = await Postgres.connect()
    const usuarioSchema = await Postgres.defineModel(connectionpostgres,UsersSchema)
    const contextPostgres = new Context(new Postgres(connectionpostgres,usuarioSchema))
    //options for a Swaggger Plugin
    const sawaggerOptions = {
        info: {
            title: 'API Herois',
            version: 'V1.0'
        }
    }

    //register Plugins for a Documentation
    await app.register([
        Hapijwt,
        Vision,
        Inert,
        {
            plugin: HapiSwagger,
            options: sawaggerOptions
        }
    ])
    //Set Default JWT Strategie

    app.auth.strategy('jwt','jwt', {
        key: JWT_SECRET,
        options:{
            expiresIn: 60
        },
        validate: async(dado, request) =>{
            //verifica no banco se o usuario continua ativo, pagando
            const [result]  = await contextPostgres.read(
                {
                    username : dado.username.toLowerCase(),
                }
            )
            if (!result) {
                return {
                    isValid: false
                }
            }
            return {
                isValid: true
            }
        }
    })

    app.auth.default('jwt')

    //Mapping Methods from Class HeruRoute with Instance and a Result from Static Methode BaseRoute REST/SPREAT
    app.route(
        [
            ...mapRoutes(new HerouRoute(context), HerouRoute.methods()),
            ...mapRoutes(new AuthHero(JWT_SECRET,contextPostgres), AuthHero.methods())
        ]
    )

    //Start Server
    await app.start()
    console.log('Server running', app.info.port)

    return app
}
module.exports = main()