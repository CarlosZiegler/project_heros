const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')

const headers = Joi.object({
    authorization: Joi.string().required()
}).unknown()

class HeroRoutes extends BaseRoute{
    constructor(db){
        super()
        this.db = db
    }

    list(){
        return {
            path: '/herois',
            method:'GET',
            config: {
                tags:['api'],
                description:'List Hero',
                notes:'Can with Pagination anf filter per Nome',
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    headers,
                    query:{
                        skip: Joi.number().integer().default(0),
                        limit:Joi.number().integer().default(100),
                        nome:Joi.string().optional().allow('').min(3).max(100).default('')
                    }
                }
            },
            handler:(request, head) =>{
                try {
                    const {skip, limit, nome} = request.query

                    let query = {
                        nome : {$regex : `.*${nome}.*`}
                    }                    
                    return this.db.read(query, skip, limit)
                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

    create(){
        return {
            path: '/herois',
            method:'POST',
            config: {
                tags:['api'],
                description:'Create Hero',
                notes:'Need a name and a Power ',
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    headers,
                    payload:{
                        nome:Joi.string().required().min(3).max(100),
                        poder: Joi.string().required().min(3).max(30)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {nome, poder} = request.payload
                    const item = {nome,poder}               
                    const result = await this.db.create(item)
                    return {
                        message: "Heroi Cadastrado com Sucesso!",
                        _id: result._id
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

    update(){
        return {
            path: '/herois/{id}',
            method:'PATCH',
            config: {
                tags:['api'],
                description:'Update Hero',
                notes:'Update a Hero need a ID and a Atribute',
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    headers,
                    params: {
                        id: Joi.string().required()
                    },
                    payload:{
                        nome:Joi.string().min(3).max(100),
                        poder: Joi.string().min(3).max(30)
                    }
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params
                    const {payload} = request
                    const dadosString = JSON.stringify(payload)
                    const dados = JSON.parse(dadosString)         
                    const result = await this.db.update(id , dados)
                    if (result.nModified != 1) {
                        return Boom.preconditionFailed('ID nao encontrado no Banco')
                    }
                    return {
                        message: "Heroi atualizado com Sucesso!",
                        _id: result._id
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }
    delete(){
        return {
            path: '/herois/{id}',
            method:'DELETE',
            config: {
                tags:['api'],
                description:'Delete a Hero',
                notes:'Delete a Hero with ID',
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    headers,
                    params: {
                        id: Joi.string().required()
                    },
                    
                }
            },
            handler: async (request) =>{
                try {
                    const {id} = request.params
                            
                    const result = await this.db.delete(id)
                    if (result.deletedCount != 1) {
                        return Boom.preconditionFailed('ID nao encontrado no Banco')
                    }
                    return {
                        message: "Heroi deletado com Sucesso!",
                    }

                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }

}

module.exports = HeroRoutes