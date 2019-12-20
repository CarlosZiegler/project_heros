class NotImplementedException extends Error {
    constructor(){
        super("Not Implemented Exception")
    }
}

class ICrud{
    create(item){
        throw new NotImplementedException
    }

    read(query){
        throw new NotImplementedException
    }

    update(id,item){
        throw new NotImplementedException
    }

    delete(id){
        throw new NotImplementedException
    }
    
}

class MongoDB extends ICrud {
    constructor(){
        super()
    }

    create(item){
        console.log("Item foi salvo MongoDB")
        
    }

    read(query){
        console.log("Item foi lido MongoDB")
    }

    update(id,item){
        console.log("Item foi atualizado MongoDB")
    }

    delete(id){
        console.log("Item foi deletado MongoDB")
    }

}

class Postgres extends ICrud {
    constructor(){
        super()
    }

    create(item){
        console.log("Item foi salvo Postgres")
        
    }

   

}

class ContextStrategy {

    constructor(strategy){
        this._database = strategy
    }

    create(item){
        return this._database.create(item)
    }

    read(query){
        return this._database.create(query)
    }

    update(id,item){
        return this._database.create(id,item)
    }

    delete(id){
        return this._database.create(id)
    }

}

const contextMongo = new ContextStrategy(new MongoDB)
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres)
contextPostgres.read()