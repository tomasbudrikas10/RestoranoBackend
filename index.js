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

app.get("/users",
    async (req, res) => {
        let users = await db["User"].findAll()
        res.status(200).json({message: "Successfully retrieved all users.", data: users})
    })

app.post("/users",
    body("name").trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Name must be between 8 and 30 characters long."),
    body("password").trim().notEmpty().withMessage("Password must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Password must be between 8 and 30 characters long."),
    body("location").optional().trim().notEmpty().withMessage("Location must not be empty."),
    body("roleId").trim().notEmpty().withMessage("Role ID must not be empty.")
        .isNumeric().withMessage("Role ID must be numeric."),
    async (req, res) => {
        let valResult = validationResult(req)
        let data = matchedData(req)
        if (valResult.isEmpty()) {
            let userNameExists = await db["User"].findOne({where: {
                    name: data.name
                }})
            if (userNameExists === null) {
                let roleExists = await db["Role"].findByPk(data.roleId)
                if (roleExists !== null) {
                    await db["User"].create(data)
                    res.status(200).json({message: "Successfully created user."})
                } else {
                    res.status(400).json({message: "Failed to create user.", errors: ["Provided role doesn't exist."]})
                }
            } else {
                res.status(400).json({message: "Failed to create user.", errors: ["A user with the provided name already exists."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create user.", errors: errors})
        }
    })

app.get("/users/:userId",
    param("userId").isNumeric().withMessage("User ID must be numeric."),
    async (req, res) => {
        let valResult = validationResult(req)
        if (valResult.isEmpty()) {
            let user = await db["User"].findByPk(req.params.userId)
            if (user !== null) {
                res.status(200).json({message: "Successfully retrieved user.", data: user})
            } else {
                res.status(404).json({message: "Failed to retrieve user.", errors: ["User with provided ID doesn't exist."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create user.", errors: errors})
        }
    })

app.put("/users/:userId",
    param("userId").isNumeric().withMessage("User ID must be numeric."),
    body("name").trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Name must be between 8 and 30 characters long."),
    body("password").trim().notEmpty().withMessage("Password must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Password must be between 8 and 30 characters long."),
    body("location").optional().trim().notEmpty().withMessage("Location must not be empty."),
    body("roleId").trim().notEmpty().withMessage("Role ID must not be empty.")
        .isNumeric().withMessage("Role ID must be numeric."),
    async (req, res) => {
        let valResult = validationResult(req)
        let data = matchedData(req)
        if (valResult.isEmpty()) {
            let userNameExists = await db["User"].findOne({where: {
                    name: data.name,
                    id: {
                        [Op.not]: req.params.userId
                    }
                }})
            if (userNameExists === null) {
                let roleExists = await db["Role"].findByPk(data.roleId)
                if (roleExists !== null) {
                    let user = await db["User"].findByPk(req.params.userId)
                    if (user !== null) {
                        await user.update(data)
                        res.status(200).json({message: "Successfully updated user."})
                    } else {
                        res.status(404).json({message: "Failed to update user.", errors: ["No user found with provided ID."]})
                    }
                } else {
                    res.status(400).json({message: "Failed to update user.", errors: ["No role found with provided ID.."]})
                }
            } else {
                res.status(400).json({message: "Failed to update user.", errors: ["Provided name is already in use."]})
            }
        } else {
            let errors = valResult.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update user.", errors: errors})
        }
    })

app.delete("/users/:userId",
    param("userId").isNumeric().withMessage("User ID must be numeric."),
    async (req, res) => {
        let validatedRes = validationResult(req)
        if (validatedRes.isEmpty()) {
            let deletedCount = await db["User"].destroy({where: {
                id: req.params.userId
            }})
            if (deletedCount !== 0) {
                res.status(200).json({message: "Successfully deleted user."})
            } else {
                res.status(404).json({message: "Failed to delete user.", errors: ["No user found with provided ID."]})
            }
        } else {
            let errors = validatedRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete user.", errors: errors})
        }
    }
)

app.get("/orderstates", async (req, res) => {
    let orderstates = await db["OrderState"].findAll()
    res.status(200).json({message: "Successfully retrieved all order states.", data: orderstates})
})

app.post("/orderstates",
    body("name").trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Name must be between 3 and 30 characters long."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let orderStateExists = await db["OrderState"].findOne({where: {
                name: data.name
            }})
            if (orderStateExists === null) {
                await db["OrderState"].create(data)
                res.status(200).json({message: "Successfully created order state."})
            } else {
                res.status(400).json({message: "Failed to create order state.", errors: ["Order state with provided name already exists."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create order state.", errors: errors})
        }
})

app.get("/orderstates/:orderStateId",
    param("orderStateId").isNumeric().withMessage("Order State ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let orderState = await db["OrderState"].findByPk(req.params.orderStateId)
            if (orderState !== null) {
                res.status(200).json({message: "Successfully retrieved order state.", data: orderState})
            } else {
                res.status(404).json({message: "Failed to retrieve order state.", errors: ["Order State with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to retrieve order state.", errors: errors})
        }
    }
)

app.put("/orderstates/:orderStateId",
    param("orderStateId").isNumeric().withMessage("Order State ID must be numeric."),
    body("name").trim().notEmpty().withMessage("Name must not be empty.")
        .isLength({min: 8, max: 30}).withMessage("Name must be between 3 and 30 characters long."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let orderStateToUpdate = await db["OrderState"].findByPk(req.params.orderStateId)
            if (orderStateToUpdate === null) {
                res.status(404).json({message: "Failed to update order state.", errors: ["Couldn't find Order State with provided ID."]})
            } else {
                let orderStateNameExists = await db["OrderState"].findOne({where: {
                        name: data.name,
                        id: {
                            [Op.not]: req.params.orderStateId
                        }
                    }})
                if (orderStateNameExists === null) {
                    await orderStateToUpdate.update(data)
                    res.status(200).json({message: "Successfully updated order state."})
                } else {
                    res.status(400).json({message: "Failed to update order state.", errors: ["Another Order State is already using that name."]})
                }
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update order state.", errors: errors})
        }
    })

app.delete("/orderstates/:orderStateId",
    param("orderStateId").isNumeric().withMessage("Order State ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let rowsDeleted = await db["OrderState"].destroy({where: {
                    id: req.params.orderStateId
                }})
            if (rowsDeleted !== 0) {
                res.status(200).json({message: "Successfully deleted order state."})
            } else {
                res.status(404).json({message: "Failed to delete order state.", errors: ["Order State with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete order state.", errors: errors})
        }
    }
)

app.get("/orders", async (req, res) => {
    let orders = await db["Order"].findAll()
    res.status(200).json({message: "Successfully retrieved all orders.", data: orders})
})

app.post("/orders",
    body("userId").trim().notEmpty().withMessage("User ID must not be empty.")
        .isNumeric().withMessage("User ID must be numeric."),
    body("orderDate").trim().notEmpty().withMessage("Order date must not be empty.")
        .isDate().withMessage("Order date must be a valid date."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let userExists = await db["User"].findByPk(data.userId)
            if (userExists === null) {
                res.status(400).json({message: "Failed to create order.", errors: ["Provided user doesn't exist."]})
            } else {
                await db["Order"].create({...data, stateId: 1})
                res.status(200).json({message: "Successfully created order."})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create order.", errors: errors})
        }
})

app.get("/orders/:orderId",
    param("orderId").isNumeric().withMessage("Order ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let order = await db["Order"].findByPk(req.params.orderId)
            if (order !== null) {
                res.status(200).json({message: "Successfully retrieved order.", data: order})
            } else {
                res.status(404).json({message: "Failed to retrieve order.", errors: ["Order with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to retrieve order.", errors: errors})
        }
    }
)

app.put("/orders/:orderId",
    param("orderId").isNumeric().withMessage("Order ID must be numeric."),
    body("userId").trim().notEmpty().withMessage("User ID must not be empty.")
        .isNumeric().withMessage("User ID must be numeric."),
    body("stateId").trim().notEmpty().withMessage("Order State ID must not be empty.")
        .isNumeric().withMessage("Order State ID must be numeric."),
    body("orderDate").trim().notEmpty().withMessage("Order date must not be empty.")
        .isDate().withMessage("Order date must be a valid date."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let userExists = await db["User"].findByPk(data.userId)
            let orderStateExists = await db["OrderState"].findByPk(data.stateId)
            let order = await db["Order"].findByPk(req.params.orderId)
            if (userExists === null) {
                res.status(400).json({message: "Failed to update order.", errors: ["Provided user doesn't exist."]})
            }
            else if (orderStateExists === null) {
                res.status(400).json({message: "Failed to update order.", errors: ["Provided order state doesn't exist."]})
            } else if (order === null) {
                res.status(404).json({message: "Failed to update order.", errors: ["Provided order doesn't exist."]})
            } else {
                await order.update(data)
                res.status(200).json({message: "Successfully updated order."})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update order.", errors: errors})
        }
    })

app.delete("/orders/:orderId",
    param("orderId").isNumeric().withMessage("Order ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let rowsDeleted = await db["Order"].destroy({where: {
                    id: req.params.orderId
                }})
            if (rowsDeleted !== 0) {
                res.status(200).json({message: "Successfully deleted order."})
            } else {
                res.status(404).json({message: "Failed to delete order.", errors: ["Order with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete order.", errors: errors})
        }
    }
)

app.get("/orderitems", async (req, res) => {
    let orderitems = await db["OrderItem"].findAll()
    res.status(200).json({message: "Successfully retrieved all order items for all orders.", data: orderitems})
})

app.post("/orderitems",
    body("orderId").trim().notEmpty().withMessage("Order ID must not be empty.")
        .isNumeric().withMessage("Order ID must be numeric."),
    body("productId").trim().notEmpty().withMessage("Product ID must not be empty.")
        .isNumeric().withMessage("Product ID must be numeric."),
    body("quantity").trim().notEmpty().withMessage("Quantity must not be empty.")
        .isNumeric().withMessage("Quantity must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let orderExists = await db["Order"].findByPk(data.orderId)
            let productExists = await db["Product"].findByPk(data.productId)
            if (orderExists === null) {
                res.status(400).json({message: "Failed to create order item.", errors: ["The provided order doesn't exist."]})
            } else if (productExists === null) {
                res.status(400).json({message: "Failed to create order item.", errors: ["The provided product doesn't exist."]})
            } else {
                let orderItemExists = await db["OrderItem"].findOne({where: {
                    orderId: data.orderId,
                    productId: data.productId
                }})
                if (orderItemExists === null) {
                    await db["OrderItem"].create(data)
                    res.status(200).json({message: "Successfully created order item."})
                } else {
                    res.status(400).json({message: "Failed to create order item.", errors: ["An order item with this product already exists on the provided order."]})
                }
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to create order.", errors: errors})
        }
})

app.get("/orderitems/:orderItemId",
    param("orderItemId").isNumeric().withMessage("Order Item ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let orderItem = await db["OrderItem"].findByPk(req.params.orderItemId)
            if (orderItem !== null) {
                res.status(200).json({message: "Successfully retrieved order item.", data: orderItem})
            } else {
                res.status(404).json({message: "Failed to retrieve order item.", errors: ["Order item with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to retrieve order item.", errors: errors})
        }
    }
)

app.put("/orderitems/:orderItemId",
    param("orderItemId").isNumeric().withMessage("Order Item ID must be numeric."),
    body("orderId").trim().notEmpty().withMessage("Order ID must not be empty.")
        .isNumeric().withMessage("Order ID must be numeric."),
    body("productId").trim().notEmpty().withMessage("Product ID must not be empty.")
        .isNumeric().withMessage("Product ID must be numeric."),
    body("quantity").trim().notEmpty().withMessage("Quantity must not be empty.")
        .isNumeric().withMessage("Quantity must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let orderExists = await db["Order"].findByPk(data.orderId)
            let productExists = await db["Product"].findByPk(data.productId)
            let orderItem = await db["OrderItem"].findByPk(req.params.orderItemId)
            if (orderExists === null) {
                res.status(400).json({message: "Failed to update order item.", errors: ["The provided order doesn't exist."]})
            } else if (productExists === null) {
                res.status(400).json({message: "Failed to update order item.", errors: ["The provided product doesn't exist."]})
            } else if (orderItem === null) {
                res.status(404).json({message: "Failed to update order item.", errors: ["The provided order item doesn't exist."]})
            } else {
                let orderItemExists = await db["OrderItem"].findOne({where: {
                    orderId: data.orderId,
                    productId: data.productId,
                    id: {
                        [Op.not]: req.params.orderItemId
                }}})
                if (orderItemExists === null) {
                    await orderItem.update(data)
                    res.status(200).json({message: "Successfully updated order item."})
                } else {
                    res.status(400).json({message: "Failed to update order item.", errors: ["Another order item with this product already exists on the provided order."]})
                }
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update order.", errors: errors})
        }
    })
app.delete("/orderitems/:orderItemId",
    param("orderItemId").isNumeric().withMessage("Order Item ID must be numeric."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let rowsDeleted = await db["OrderItem"].destroy({where: {
                    id: req.params.orderItemId
                }})
            if (rowsDeleted !== 0) {
                res.status(200).json({message: "Successfully deleted order item."})
            } else {
                res.status(404).json({message: "Failed to delete order item.", errors: ["Order with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete order item.", errors: errors})
        }
    }
)

app.get("/userpaymentmethods", async (req, res) => {
    let userPaymentMethods = await db["UserPaymentMethod"].findAll()
    res.status(200).json({message: "Successfully retrieved all user payment methods for all users.", data: userPaymentMethods})
})

app.post("/userpaymentmethods",
    body("userId").trim().notEmpty().withMessage("User ID must not be empty.")
        .isNumeric().withMessage("User ID must be numeric."),
    body("cardNumber").trim().notEmpty().withMessage("Card number must not be empty.")
        .customSanitizer((value) => {
            return value.replace(/\s/g, '');
        }).isCreditCard().withMessage("Card number must be valid."),
    body('cvc').isInt().withMessage("CVC must be an integer.")
        .isLength({ min: 3, max: 4 }).withMessage('CVC must be 3 or 4 digits'),
    body('expiryDate').trim().notEmpty().withMessage("Expiry date must not be empty.")
        .isDate().withMessage("Expiry date must be a valid date."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let userExists = await db["User"].findByPk(data.userId)
            let cardNumberExists = await db["UserPaymentMethod"].findOne({where: {
                    cardNumber: data.cardNumber,
                    userId: data.userId,
                }})
            if (userExists === null) {
                res.status(400).json({message: "Failed to add user payment method for user.", errors: ["Provided user doesn't exist."]})
            } else if (cardNumberExists !== null) {
                res.status(400).json({message: "Failed to add user payment method for user.", errors: ["Provided user already added this card."]})
            } else {
                let expiryDate = new Date(data.expiryDate)
                let currentDate = new Date()

                expiryDate.setHours(0, 0, 0, 0);
                currentDate.setHours(0, 0, 0, 0);
                expiryDate.setDate(1)
                currentDate.setDate(1)

                if (expiryDate < currentDate) {
                    res.status(400).json({message: "Failed to add user payment method for user.", errors: ["Provided expiry date has already passed."]})
                } else {
                    await db["UserPaymentMethod"].create(data)
                    res.status(200).json({message: "Successfully added user payment method for user."})
                }
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to add user payment method for user.", errors: errors})
        }
})

app.get("/userpaymentmethods/:userPaymentMethodId",
    param("userPaymentMethodId").isInt().withMessage("User Payment Method ID must be an integer."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let userPaymentMethod = await db["UserPaymentMethod"].findByPk(req.params.userPaymentMethodId)
            if (userPaymentMethod !== null) {
                res.status(200).json({message: "Successfully retrieved user payment method.", data: userPaymentMethod})
            } else {
                res.status(404).json({message: "Failed to retrieve user payment method.", errors: ["User Payment Method with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to retrieve user payment method.", errors: errors})
        }
    }
)

app.put("/userpaymentmethods/:userPaymentMethodId",
    param("userPaymentMethodId").isInt().withMessage("User Payment Method ID must be an integer."),
    body("cardNumber").trim().notEmpty().withMessage("Card number must not be empty.")
        .customSanitizer((value) => {
        return value.replace(/\s/g, '');
    }).isCreditCard().withMessage("Card number must be valid."),
    body('cvc').isInt().withMessage("CVC must be an integer.")
        .isLength({ min: 3, max: 4 }).withMessage('CVC must be 3 or 4 digits'),
    body('expiryDate').trim().notEmpty().withMessage("Expiry date must not be empty.")
        .isDate().withMessage("Expiry date must be a valid date."),
    async (req, res) => {
        let validationRes = validationResult(req)
        let data = matchedData(req)
        if (validationRes.isEmpty()) {
            let paymentMethod = await db["UserPaymentMethod"].findOne({where: {
                    id: req.params.userPaymentMethodId
                }})
             if (paymentMethod === null) {
                res.status(404).json({message: "Failed to update user payment method for user.", errors: ["Provided payment method doesn't exist."]})
            } else {
                let cardNumberExists = await db["UserPaymentMethod"].findOne({where: {
                        cardNumber: data.cardNumber,
                        userId: paymentMethod.userId,
                        id: {
                            [Op.not]: req.params.userPaymentMethodId
                        }
                    }})
                if (cardNumberExists !== null) {
                    res.status(400).json({message: "Failed to update user payment method for user.", errors: ["Provided user already added this card."]})
                } else {
                    let expiryDate = new Date(data.expiryDate)
                    let currentDate = new Date()

                    expiryDate.setHours(0, 0, 0, 0);
                    currentDate.setHours(0, 0, 0, 0);
                    expiryDate.setDate(1)
                    currentDate.setDate(1)

                    if (expiryDate < currentDate) {
                        res.status(400).json({message: "Failed to update user payment method for user.", errors: ["Provided expiry date has already passed."]})
                    } else {
                        await paymentMethod.update(data)
                        res.status(200).json({message: "Successfully updated user payment method for user."})
                    }
                }
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to update user payment method for user.", errors: errors})
        }
    })

app.delete("/userpaymentmethods/:userPaymentMethodId",
    param("userPaymentMethodId").isInt().withMessage("User Payment Method ID must be an integer."),
    async (req, res) => {
        let validationRes = validationResult(req)
        if (validationRes.isEmpty()) {
            let rowsDeleted = await db["UserPaymentMethod"].destroy({where: {
                    id: req.params.userPaymentMethodId
                }})
            if (rowsDeleted !== 0) {
                res.status(200).json({message: "Successfully deleted user payment method."})
            } else {
                res.status(404).json({message: "Failed to delete user payment method.", errors: ["User payment method with provided ID doesn't exist."]})
            }
        } else {
            let errors = validationRes.array().map((error => error.msg))
            res.status(400).json({message: "Failed to delete user payment method.", errors: errors})
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