const BaseRoute = require('./base/baseRoute')
const { join } = require('path')

class UtilRoutes extends BaseRoute{
    constructor(){
        super()
    }

    coverage(){
        return {
            path: '/coverage',
            method:'GET',
            config: {
                auth:false,
                tags:['api'],
                description:'Coverage',
                notes:'coverage',
            },
            handler:{
                directory: {
                    path: join(__dirname,'../../coverage'),
                    redirectToSlash: true,
                    index: true
                }
            }
        }
    }

}

module.exports = UtilRoutes