const assert = require('assert')
const api = require('./../api')
const Context = require('./../db/strategies/base/ContextStrategy')
const UsersSchema = require('./../db/strategies/postgres/schemas/usersSchemas')
const Postgres =  require('./../db/strategies/postgres/postgres')


let app = {}

const USER = {
    username: 'xuxa',
    password: '123'
}

const USER_DB = {
    username: USER.username.toLocaleLowerCase(),
    password: '$2a$04$/sRc66oggxeta03D.PtXROSYtq2R1e2XZKm5Noc6YJOM4DMozA1lC'
}

describe('Auth - Tests', function (){
    
    this.beforeAll( async function () {
       app = await api
       const connectionPostgres = await Postgres.connect()
       const model = await Postgres.defineModel(connectionPostgres,UsersSchema)
       const postgres =  new Context(new Postgres(connectionPostgres, model))
       const result = await postgres.update(null, USER_DB, true)
       
         
    })
    it('Deve obter Token', async function () {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload:USER,
            
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10 )

    })
    it('Deve logar com token', async function () {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username: 'xuxa',
                password: '123'
            },
            
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10 )

    })

    it('Deve retotnar nao autorizado ao tentar login errado  com token', async function () {
        const result = await app.inject({
            method:'POST',
            url:'/login',
            payload: {
                username: 'Carlos',
                password: '145'
            },
            
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 401)
        

    })
    
})