const express = require('express')
const app = express()
const port = 3000
const { Sequelize, Op} = require('sequelize')
const { body, validationResult, matchedData, param} = require('express-validator');
const db = require('./models/index.js')
const sequelize = new Sequelize('restoranas', 'root', '', {
    host: "localhost",
    dialect: 'mysql'
})
app.use(express.json())
app.get('/', async (req, res) => {
    res.send("Hello World!")
});

app.get('/products', async (req, res) => {
    let products = await db["Product"].findAll()
    res.json(products)
})

app.post('/products',
    body('name')
        .trim().isLength({min: 8, max: 255}).withMessage("Name must be between 8 and 255 characters long."),
    body('description')
        .trim().isLength({min: 30, max: 255}).withMessage("Description must be between 30 and 255 characters long."),
    body('price')
        .trim().isNumeric().withMessage("Price must be a number."),
    body('isAvailable').isBoolean().withMessage("isAvailable must be a boolean."),
    async (req, res) => {
    let result = validationResult(req)
    let data = matchedData(req)
    if (result.isEmpty()) {
        let productNameExists = await db["Product"].findOne({where: {
            name: data.name
            }})
        if (productNameExists === null) {
            await db["Product"].create({
                name: data.name,
                description: data.description,
                price: data.price,
                isAvailable: data.isAvailable,
            })
            res.status(200).json({message: "Successfully created product."})
        } else {
            res.status(400).json({
                message: "Failed to create product.",
                errors: ["Product with that name already exists."]
            })
        }
    } else {
        let errors = result.array().map((error => error.msg))
        res.status(400).json({message: "Failed to create product.", errors: errors})
    }
})

app.get("/products/:productId", param("productId").isNumeric().withMessage("Product ID must be numeric."), async (req, res) => {
    let product = await db["Product"].findByPk(req.params.productId)
    let validationRes = validationResult(req)
    if (!validationRes.isEmpty()) {
        let errors = validationRes.array().map((error => error.msg))
        res.status(400).json({message: "Failed to retrieve product.", errors: errors})
    } else {
        if (product === null) {
            res.status(404).json({message: "Failed to retrieve product.", errors: ["No product exists with provided ID."]})
        } else {
            res.status(200).json({message: "Successfully retrieved product.", data: product})
        }
    }
})

app.put("/products/:productId",
    param("productId").isNumeric().withMessage("Product ID must be numeric."),
    body('name')
        .trim().isLength({min: 8, max: 255}).withMessage("Name must be between 8 and 255 characters long."),
    body('description')
        .trim().isLength({min: 30, max: 255}).withMessage("Description must be between 30 and 255 characters long."),
    body('price')
        .trim().isNumeric().withMessage("Price must be a number."),
    body('isAvailable').isBoolean().withMessage("Availability must be a boolean."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let product = await db["Product"].findByPk(req.params.productId)
            if (product === null) {
                res.status(404).json({message: "Failed to update product.", errors: ["Product with provided ID doesn't exist."]})
            } else {
                let productNameExists = await db["Product"].findOne({where: {
                        name: data.name,
                        id: {
                            [Op.not]: req.params.productId
                        }
                    }})
                if (productNameExists === null) {
                    await product.update(data)
                    res.status(200).json({message: "Successfully updated product."})
                } else {
                    res.status(400).json({message: "Failed to update product.", errors: ["Another product already has the provided name."]})
                }
            }
        } else {
            let errors = validationRes.array().map((err) => err.msg)
            res.status(400).json({message: "Failed to update product.", errors: errors})
        }
    })

app.delete("/products/:productId",
    param("productId").isNumeric().withMessage("Product ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let result = await db["Product"].destroy({where: {
                id: req.params.productId
            }})
            if (result === 0) {
                res.status(404).json({message: "Failed to delete product.", errors: ["Product with provided ID doesn't exist."]})
            } else {
                res.status(200).json({message: "Deleted product successfully."})
            }
        } else {
            let errors = validationRes.array().map((err) => err.msg)
            res.status(400).json({message: "Failed to update product.", errors: errors})
        }
    })

app.get("/roles", async (req, res) => {
    let roles = await db["Role"].findAll()
    res.status(200).json(roles)
})

app.post("/roles",
    body("name")
        .trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 3, max: 50}).withMessage("Name must be between 3 and 50 characters long."),
    async (req, res) => {
        let valResult = validationResult(req)
        let data = matchedData(req)
        if (valResult.isEmpty()) {
            let roleNameUsed = await db["Role"].findOne({where: {
                    name: data.name
                }})
            if (roleNameUsed === null) {
                await db["Role"].create({name: data.name})
                res.status(200).json({message: "Successfully created role."})
            } else {
                res.status(400).json({message: "Failed to create role.", errors: ["Role name is already in use."]})
            }

        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create role.", errors: errors})
        }
})

app.get("/roles/:roleId",
    param("roleId").isNumeric().withMessage("Role ID must be numeric."),
    async (req, res) => {
        let valResult = validationResult(req)
        if (valResult.isEmpty()) {
            let role = await db["Role"].findByPk(req.params.roleId)
            if (role !== null) {
                res.status(200).json({message: "Successfully retrieved role.", data: role})
            } else {
                res.status(404).json({message: "Failed to retrieve role.", errors: ["No role exists with provided ID."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to retrieve role.", errors: errors})
        }
    })

app.put("/roles/:roleId",
    param("roleId").isNumeric().withMessage("Role ID must be numeric."),
    body("name")
        .trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 3, max: 50}).withMessage("Name must be between 3 and 50 characters long."),
    async (req, res) => {
        let valResult = validationResult(req)
        let data = matchedData(req)
        if (valResult.isEmpty()) {
            let roleNameExists = await db["Role"].findOne({where: {
                    name: data.name,
                    id: {
                        [Op.not]: req.params.roleId
                    }
                }})
            if (roleNameExists === null) {
                let role = await db["Role"].findByPk(req.params.roleId)
                if (role !== null) {
                    await role.update(data)
                    res.status(200).json({message: "Successfully updated role."})
                } else {
                    res.status(404).json({message: "Failed to update role.", errors: ["Couldn't find provided role."]})
                }
            } else {
                res.status(400).json({message: "Failed to update role.", errors: ["Role name is already in use."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update role.", errors: errors})
        }
    }
)

app.delete("/roles/:roleId",
    param("roleId").isNumeric().withMessage("Role ID must be numeric."),
    async (req, res) => {
        let valResult = validationResult(req)
        if (valResult.isEmpty()) {
            let rowsDeleted = await db["Role"].destroy({where: {
                    id: req.params.roleId
                }})
            if (rowsDeleted !== 0) {
                res.status(200).json({message: "Successfully deleted role."})
            } else {
                res.status(404).json({message: "Failed to delete role.", errors: ["No role exists with provided ID."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete role.", errors: errors})
        }
    }
)

app.listen(port, async () => {
    console.log(`Example app listening on port ${port}`)
    try {
        await sequelize.authenticate()
        await sequelize.sync({force: false})
    } catch(e) {
        console.error(e)
    }
})