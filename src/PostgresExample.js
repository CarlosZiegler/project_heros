//npm ionstall sequelize pg-hstore pg

const Sequelize =  require('sequelize')
const driver = new Sequelize(
    'heros',
    'carlos',
    'carlos',
    { 
        host:'192.168.99.100',
         dialect: 'postgres',
         quoteIdentifiers: false,
         operatorAliases: false
    }
)

async function main(params) {
    const Herois = driver.define('heros',
    {
        id : {
            type : Sequelize.INTEGER,
            required:true,
            primaryKey: true,
            autoIncrement: true
        },
        nome : {
            type: Sequelize.STRING,
            required:true
        },
        poder : {
            type: Sequelize.STRING,
            required:true
        }
    },{
        tableName : 'TB_HEROIS',
        freezeTableName : false,
        timestamps:false
    })

    await Herois.sync()
    await Herois.create({
        nome:'Lanterna Verde',
        poder:'Anel'
    })
    const result = await Herois.findAll({ raw: true})
    
}
main()