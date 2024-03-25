const express = require('express')
const app = express()
const port = 3000
const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('restoranas', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
    } catch(e) {
        console.error(e)
    }
})