const assert = require('assert')
const api = require('./../api')
var ObjectId = require('mongodb').ObjectID;
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inh1eGEiLCJpZCI6MSwiaWF0IjoxNTc2NzQxNTU5fQ.AQa-_lDsugBl-JbPFWc30EqgyHCu2j1-2DFeoUXnits"

const headers = {
    Authorization : TOKEN
}
let app = {}

const MOCK_HEROI_CADASTRAR = {
    nome: 'Homem de Ferro',
    poder:'Armadura'
}
const MOCK_HEROI_INICIAL = {
    nome: 'Mulher Maravilha',
    poder:'Laco'
}
let MOCK_ID=''

describe('API - Tests', function (){
    
    this.beforeAll( async function () {
       app = await api
       const result = await app.inject({
        method:'POST',
        url:'/herois',
        payload: MOCK_HEROI_INICIAL,
        headers
    })
    const dados = JSON.parse(result.payload)

    MOCK_ID =dados._id
    
    })
    it('Route /herois', async function () {
        const result = await app.inject({
            method:'GET',
            url:'/herois?skip=0&limit=30',
            headers
        })
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))

    })
    it('Route /herois Paginacao', async function () {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=0&limit=${TAMANHO_LIMITE}`,
            headers
        })
        
        const dados = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
        assert.ok(dados.length === TAMANHO_LIMITE)

    })
    it('Route /herois Paginacao com parametro String', async function () {
        const TAMANHO_LIMITE = 1
        const result = await app.inject({
            method:'GET',
            url:`/herois?skip=eva&limit=${TAMANHO_LIMITE}`,
            headers
        })
        
        const {statusCode} = result
        assert.deepEqual(statusCode, 400)
        

    })
    it('Route /herois Paginacao com parametro String', async function () {
        const NOME = MOCK_HEROI_INICIAL.nome
        const result = await app.inject({
            method:'GET',
            url:`/herois?nome=${NOME}&skip=0&limit=1`,
            headers
        })
        
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        

    })
    it('Route /herois POST Criar herois', async function () {
        const NOME = 'Batman'
        const result = await app.inject({
            method:'POST',
            url:`/herois`,
            payload: MOCK_HEROI_CADASTRAR,
            headers
        })
        
        const { message } = JSON.parse(result.payload)
        const {statusCode} = result
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, "Heroi Cadastrado com Sucesso!")
        

    })

    it('Route /herois/:id PATCH Atualizar', async function () {
        
        const id = MOCK_ID
        const expected = {
            poder: 'Super Mira'
        }
       
        const result = await app.inject({
            method:'PATCH',
            url:`/herois/${id}`,
            payload: JSON.stringify(expected),
            headers
        })
        
        const {statusCode} = result
        const {message} = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, "Heroi atualizado com Sucesso!")
        

    })

    it('Route /herois/:id Delete Deletar', async function () {
        
        const id = MOCK_ID
               
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${id}`,
            headers
        })
        
        const {statusCode} = result
        const {message} = JSON.parse(result.payload)
        assert.deepEqual(statusCode, 200)
        assert.deepEqual(message, "Heroi deletado com Sucesso!")
        

    })

    it('Route /herois/:id Nao deve deletar com ID Invalido Deletar', async function () {
        
        const id = 'ID_Invalido'
               
        const result = await app.inject({
            method:'DELETE',
            url:`/herois/${id}`,
            headers
        })
        
        const {statusCode} = result
        assert.deepEqual(statusCode, 500)
        
        

    })
})