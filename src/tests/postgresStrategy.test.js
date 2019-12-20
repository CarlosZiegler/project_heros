const assert = require('assert')
const Postgres = require('../db/strategies/postgres/postgres')
const Context = require('../db/strategies/base/ContextStrategy')
const HeroisSchema = require('./../db/strategies/postgres/schemas/heroisSchemas')
let context = {}


const MOCK_HEROI_CADASTRAR = { nome : 'Gaviao Negro', poder:'flexas'}
const MOCK_HEROI_ATUALIZAR = { nome : 'Batman', poder:'Dinheiro'}

describe('postgres Strategy', function (){
    this.timeout(Infinity)
    this.beforeAll( async function () {
    const connection = await Postgres.connect()
    const model = await Postgres.defineModel(connection,HeroisSchema)
    context =  new Context(new Postgres(connection,model))  
    
    await context.create(MOCK_HEROI_ATUALIZAR)
    })
    it('Postgres Connection', async function () {
        const result = await context.isConected()
        assert.equal(result,true)
    })
    it('Postgres Cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })

    it('Postgres Listar', async function () {
        const [result] = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        delete result.id 
                       
        assert.deepEqual(result,MOCK_HEROI_CADASTRAR)
    })

    it('Postgres update', async function () {
        const [itemAtualizar] = await context.read({nome : MOCK_HEROI_ATUALIZAR.nome })
        const novoItem = {
            ...MOCK_HEROI_ATUALIZAR, 
            nome: 'Mulher Maravilha'
        }
        const [result] = await context.update( itemAtualizar.id, novoItem)
        const [resultDados] = await context.read({id : itemAtualizar.id })
        
        assert.deepEqual(result,1)
        assert.deepEqual(resultDados.nome,novoItem.nome)
    })

    it('Postgres delete', async function () {
        const [itemDeletar] = await context.read({nome : MOCK_HEROI_CADASTRAR.nome })
        const result = await context.delete( itemDeletar.id)
        const [resultDados] = await context.read({id : itemDeletar.id })
        
        assert.deepEqual(result,1)
        assert.deepEqual(resultDados,undefined)
    })
})