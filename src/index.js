const ContextStrategy = require('./db/strategies/base/ContextStrategy')
const MongoDB = require('./db/strategies/mongodb')
const Postgres = require('./db/strategies/postgres')


const contextMongo = new ContextStrategy(new MongoDB)
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres)
contextPostgres.delete()