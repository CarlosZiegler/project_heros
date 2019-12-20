const assert = require('assert')
const api = require('./../api')
const PasswordHelper = require('../helpers/passwordHelper')

let app = {}
const SENHA = 'carlos@1984'
const HASH = '$2a$04$9wOTesGh/bSbT2kn/FJdFe3kutq2.7UAoMYXIOkpf712rBMWGtWgO'



describe('UserHelper - Tests', function (){
    
    this.beforeAll( async function () {
       app = await api
      
    })
    it('Deve gerar hash a partit de senha', async function () {
        const result = await PasswordHelper.hashPassword(SENHA)
        console.log(result)
        assert.ok(result.length > 10)

    })
    it('Deve validar a senha', async function () {
        const result = await PasswordHelper.comparePassword(SENHA,HASH)
        
        assert.ok(result)

    })
    
})