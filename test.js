const request = require("supertest");
const app = require("./index.js");

describe("Get All Products", () => {
    test("Trying to get all products", () => {
        return request(app)
            .get("/products")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(3);
                expect(response.body.data[1].name).toBe("Produktas B");
            })
    });
});

describe("Get Product By ID", () => {
    test("Get Product With Existing ID", () => {
        return request(app)
            .get("/products/3")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.name).toBe("Produktas C");
            })
    })
    test("Get Product With Non-Existing ID", () => {
        return request(app)
            .get("/products/4")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.length).toBeGreaterThan(0)
            })
    })
    test("Get Product With Invalid ID", () => {
        return request(app)
            .get("/products/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.length).toBeGreaterThan(0)
            })
    })
})

describe("Add Product", () => {
    test("Add Product With Valid Data", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add Product With Existing Name", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Product with that name already exists.")).toBe(true)
            })
    })
    test("Add Product With Too Short Name", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVa",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 255 characters long.")).toBe(true)
            })
    })
    test("Add Product With Too Long Name", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 255 characters long.")).toBe(true)
            })
    })
    test("Add Product With Too Short Description", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Description must be between 30 and 255 characters long.")).toBe(true)
            })
    })
    test("Add Product With Too Long Description", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Description must be between 30 and 255 characters long.")).toBe(true)
            })
    })
    test("Add Product With Invalid Price", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: "kaina",
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Price must be a number.")).toBe(true)
            })
    })
    test("Add Product With Invalid Availability", () => {
        return request(app)
            .post("/products")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: 12.50,
                isAvailable: "treu"
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("isAvailable must be a boolean.")).toBe(true)
            })
    })
})

describe("Update Product", () => {
    test("Update Product With Valid Data", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas123",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update Product With Non-Existing Product ID", () => {
        return request(app)
            .put("/products/53")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas123",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Product with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Update Product With Invalid Product ID", () => {
        return request(app)
            .put("/products/a")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas123",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Product ID must be an integer.")).toBe(true)
            })
    })
    test("Update Product With Existing Name", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Another product already has the provided name.")).toBe(true)
            })
    })
    test("Update Product With Too Short Name", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVa",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 255 characters long.")).toBe(true)
            })
    })
    test("Update Product With Too Long Name", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
                description: "Labai geras ir tinkantis aprašymas.",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 255 characters long.")).toBe(true)
            })
    })
    test("Update Product With Too Short Description", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Description must be between 30 and 255 characters long.")).toBe(true)
            })
    })
    test("Update Product With Too Long Description", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc",
                price: 12.50,
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Description must be between 30 and 255 characters long.")).toBe(true)
            })
    })
    test("Update Product With Invalid Price", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: "kaina",
                isAvailable: true
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Price must be a number.")).toBe(true)
            })
    })
    test("Update Product With Invalid Availability", () => {
        return request(app)
            .put("/products/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                description: "abc",
                price: 12.50,
                isAvailable: "treu"
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Availability must be a boolean.")).toBe(true)
            })
    })
})

describe("Delete Product", () => {
    test("Delete Product With Existing ID That Is Depended On", () => {
        return request(app)
            .delete("/products/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(500);
            })
    })
    test("Delete Product With Existing ID", () => {
        return request(app)
            .delete("/products/4")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
        })
    test("Delete Product With Non-Existing ID", () => {
        return request(app)
            .delete("/products/53")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Product with provided ID doesn't exist."))
            })
    })
    test("Delete Product With Invalid ID", () => {
        return request(app)
            .delete("/products/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Product ID must be an integer."))
            })
    })
})

describe("Get All Roles", () => {
    test("Trying to get all roles", () => {
        return request(app)
            .get("/roles")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(3);
                expect(response.body.data[1].name).toBe("Darbuotojas");
            })
    });
})

describe("Get Role By ID", () => {
    test("Get Role With Existing ID", () => {
        return request(app)
            .get("/roles/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.name).toBe("Vartotojas")
            })
    })
    test("Get Role With Non-Existing ID", () => {
        return request(app)
            .get("/roles/4")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Role with provided ID doesn't exist."))
            })
    })
    test("Get Role With Invalid ID", () => {
        return request(app)
            .get("/roles/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role ID must be an integer."))
            })
    })
})

describe("Add Role", () => {
    test("Add Role With Valid Data", () => {
        return request(app)
            .post("/roles")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add Role With Existing Name", () => {
        return request(app)
            .post("/roles")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role name is already in use."))
            })
    })
    test("Add Role With Name Too Short", () => {
        return request(app)
            .post("/roles")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long."))
            })
    })
    test("Add Role With Name Too Long", () => {
        return request(app)
            .post("/roles")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long."))
            })
    })
})