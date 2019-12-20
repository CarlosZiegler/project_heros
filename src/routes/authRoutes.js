const BaseRoute = require('./base/baseRoute')
const Joi = require('joi')
const Boom = require('boom')
const Jwt= require('jsonwebtoken')
const PassordHelper = require('./../helpers/passwordHelper')

const USER = {
    username:'xuxa', 
    password:'admin'
}


class AuthRoutes extends BaseRoute{
    constructor(secret, db){
        super()
        this.secret = secret
        this.db = db
        
    }

    login(){
        return {
            path: '/login',
            method:'POST',
            config: {
                auth:false,
                tags:['api'],
                description:'Login',
                notes:'Token JWT',
                validate: {
                    //payload, header, params, query
                    failAction:(request, headers, erro) =>{
                        throw erro        
                    },
                    payload:{
                        username: Joi.string().required(),                        
                        password:Joi.string().required()
                    }
                }
            },
            handler: async (request, head) =>{
                try {
                    const {username, password} = request.payload
                    const [usuario] = await this.db.read({
                        username:username.toLowerCase()
                    })
                    if (!usuario) {
                        return Boom.unauthorized('User not found')
                    }
                    const match = await PassordHelper.comparePassword(password, usuario.password)

                    if (!match) {
                        return Boom.unauthorized('Senha ou Usuario invalidos')
                    }

                   // if (username.toLowerCase()!== USER.username || password.toLowerCase()!== USER.password) {
                     //   return Boom.unauthorized()
                   // }
                    const token = Jwt.sign({
                        username:username,
                        id:usuario.id
                    }, this.secret)

                    return {
                        token
                    }
                } catch (error) {
                    console.log('Error', error)
                    return Boom.internal()
                }
                
            }
        }
    }


}

module.exports = AuthRoutes