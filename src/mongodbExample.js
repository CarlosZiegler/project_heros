const Mongoose = require('mongoose')
Mongoose.connect('mongodb://carlos:carlos@192.168.99.100:27017/herois', {useNewUrlParser: true}, function (error) {
    if(error){
        console.log('Falha na conexao', error)
    }
})

const connection = Mongoose.connection
const state = connection.readyState

connection.once('open', ()=>{ console.log('Database running')})
console.log('state', state)
setTimeout(()=>{
    const newstate = connection.readyState
    console.log('state', newstate)
},1000)

// 0 = Desconectado
// 1 = Conectado
// 2 = Conectando
// 3 = Desconectando

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required:true
    },
    poder: {
        type: String,
        required:true
    },
    insertedAt: {
        type: Date,
        default:new Date()
    }  
})

const model = Mongoose.model('herois',heroiSchema)

async function main(){

    const resultcadastrar= await model.create({
        nome:'Maria', 
        poder: 'Dinheiro'
    })

    console.log('Cadatrar', resultcadastrar)

    const listItems = await model.find()

    console.log('Find', listItems)

}
main()