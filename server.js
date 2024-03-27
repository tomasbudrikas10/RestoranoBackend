const app = require('./index')
const {Sequelize} = require("sequelize");
const sequelize = new Sequelize(process.env.NODE_ENV === "test" ? 'restoranas-test' : 'restoranas', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})
app.listen(3000, async () => {
    console.log(`Example app listening on port 3000`)
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
    } catch(e) {
        console.error(e)
    }
})