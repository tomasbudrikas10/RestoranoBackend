const request = require("supertest");
const app = require("./index.js");

describe("Get All Products", () => {
    test("Trying to get all products", () => {
        return request(app)
            .get("/products")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(21);
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
            .get("/products/234")
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
                expect(response.body.errors.includes("Product with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Delete Product With Invalid ID", () => {
        return request(app)
            .delete("/products/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Product ID must be an integer.")).toBe(true)
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
                expect(response.body.errors.includes("No role exists with provided ID.")).toBe(true)
            })
    })
    test("Get Role With Invalid ID", () => {
        return request(app)
            .get("/roles/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role ID must be an integer.")).toBe(true)
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
                expect(response.body.errors.includes("Role name is already in use.")).toBe(true)
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
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long.")).toBe(true)
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
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long.")).toBe(true)
            })
    })
})

describe("Update Role", () => {
    test("Update Role With Valid Data", () => {
        return request(app)
            .put("/roles/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas2",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update Role With Non-Existing ID", () => {
        return request(app)
            .put("/roles/253")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas23",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Couldn't find provided role.")).toBe(true)
            })
    })
    test("Update Role With Invalid ID", () => {
        return request(app)
            .put("/roles/a")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas2",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role ID must be an integer.")).toBe(true)
            })
    })
    test("Update Role With Existing Name", () => {
        return request(app)
            .put("/roles/2")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas2",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role name is already in use.")).toBe(true)
            })
    })
    test("Update Role With Name Too Short", () => {
        return request(app)
            .put("/roles/2")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long.")).toBe(true)
            })
    })
    test("Update Role With Name Too Long", () => {
        return request(app)
            .put("/roles/2")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 50 characters long.")).toBe(true)
            })
    })
})

describe("Delete Role", () => {
    test("Delete Role With Existing ID That Is Depended On", () => {
        return request(app)
            .delete("/roles/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(500);
            })
    })
    test("Delete Role With Existing ID", () => {
        return request(app)
            .delete("/roles/4")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Delete Role With Non-Existing ID", () => {
        return request(app)
            .delete("/roles/53")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("No role exists with provided ID.")).toBe(true)
            })
    })
    test("Delete Role With Invalid ID", () => {
        return request(app)
            .delete("/roles/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Role ID must be an integer.")).toBe(true)
            })
    })
})

describe("Get All Users", () => {
    test("Trying to get all users", () => {
        return request(app)
            .get("/users")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(23);
                expect(response.body.data[1].name).toBe("TikrasDarbuotojas2");
            })
    });
});

describe("Get User By ID", () => {
    test("Get User With Existing ID", () => {
        return request(app)
            .get("/users/3")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.name).toBe("KietasAdminas3");
            })
    })
    test("Get User With Non-Existing ID", () => {
        return request(app)
            .get("/users/43")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("User with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Get User With Invalid ID", () => {
        return request(app)
            .get("/users/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("User ID must be an integer.")).toBe(true)
            })
    })
})

describe("Add User", () => {
    test("Add User With Valid Data Without Location", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add User With Valid Data With Location", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas123",
                password: "GerasSlaptazodis",
                roleId: 1,
                location: "Puiki Vieta"
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add User With Existing Name", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("A user with the provided name already exists.")).toBe(true)
            })
    })
    test("Add User With Non-Existing Role", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas1234",
                password: "GerasSlaptazodis",
                roleId: 5
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Provided role doesn't exist.")).toBe(true)
            })
    })
    test("Add User With Name Too Short", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Add User With Name Too Long", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Add User With Password Too Short", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSl",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Password must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Add User With Password Too Long", () => {
        return request(app)
            .post("/users")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSlaptazodisGerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Password must be between 8 and 30 characters long.")).toBe(true)
            })
    })
})

describe("Update User", () => {
    test("Update User With Valid Data Without Location", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas12",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update User With Non-Existing ID", () => {
        return request(app)
            .put("/users/253")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas23",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("No user found with provided ID.")).toBe(true)
            })
    })
    test("Update User With Invalid ID", () => {
        return request(app)
            .put("/users/a")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas2",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("User ID must be an integer.")).toBe(true)
            })
    })
    test("Update User With Valid Data With Location", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas12",
                password: "GerasSlaptazodis",
                roleId: 1,
                location: "Puiki Vieta"
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update User With Existing Name", () => {
        return request(app)
            .put("/users/2")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas12",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Provided name is already in use.")).toBe(true)
            })
    })
    test("Update User With Non-Existing Role", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas12",
                password: "GerasSlaptazodis",
                roleId: 5
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("No role found with provided ID.")).toBe(true)
            })
    })
    test("Update User With Name Too Short", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Update User With Name Too Long", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
                password: "GerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Update User With Password Too Short", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSl",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Password must be between 8 and 30 characters long.")).toBe(true)
            })
    })
    test("Update User With Password Too Long", () => {
        return request(app)
            .put("/users/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
                password: "GerasSlaptazodisGerasSlaptazodis",
                roleId: 1
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Password must be between 8 and 30 characters long.")).toBe(true)
            })
    })
})

describe("Delete User", () => {
    test("Delete User With Existing ID That Is Depended On", () => {
        return request(app)
            .delete("/users/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(500);
            })
    })
    test("Delete User With Existing ID", () => {
        return request(app)
            .delete("/users/4")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Delete User With Non-Existing ID", () => {
        return request(app)
            .delete("/users/53")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("No user found with provided ID.")).toBe(true)
            })
    })
    test("Delete User With Invalid ID", () => {
        return request(app)
            .delete("/users/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("User ID must be an integer.")).toBe(true)
            })
    })
})

describe("Get All Order States", () => {
    test("Trying to get all order states", () => {
        return request(app)
            .get("/orderstates")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(6);
                expect(response.body.data[1].name).toBe("Priimtas");
            })
    });
})

describe("Get Order State By ID", () => {
    test("Get Order State With Existing ID", () => {
        return request(app)
            .get("/orderstates/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.name).toBe("Sukurtas")
            })
    })
    test("Get Order State With Non-Existing ID", () => {
        return request(app)
            .get("/orderstates/7")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Order State with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Get Order State With Invalid ID", () => {
        return request(app)
            .get("/orderstates/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order State ID must be an integer.")).toBe(true)
            })
    })
})

describe("Add Order State", () => {
    test("Add Order State With Valid Data", () => {
        return request(app)
            .post("/orderstates")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add Order State With Existing Name", () => {
        return request(app)
            .post("/orderstates")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order state with provided name already exists.")).toBe(true)
            })
    })
    test("Add Order State With Name Too Short", () => {
        return request(app)
            .post("/orderstates")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 30 characters long.")).toBe(true)
            })
    })
    test("Add Order State With Name Too Long", () => {
        return request(app)
            .post("/orderstates")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 30 characters long.")).toBe(true)
            })
    })
})

describe("Update Order State", () => {
    test("Update Order State With Valid Data", () => {
        return request(app)
            .put("/orderstates/3")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas1234",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update Order State With Non-Existing ID", () => {
        return request(app)
            .put("/orderstates/253")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas23",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Couldn't find Order State with provided ID.")).toBe(true)
            })
    })
    test("Update Order State With Invalid ID", () => {
        return request(app)
            .put("/orderstates/a")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas2",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order State ID must be an integer.")).toBe(true)
            })
    })
    test("Update Order State With Valid Data", () => {
        return request(app)
            .put("/orderstates/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas1",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);

            })
    })
    test("Update Order State With Existing Name", () => {
        return request(app)
            .put("/orderstates/2")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardas1",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Another Order State is already using that name.")).toBe(true)
            })
    })
    test("Update Order State With Name Too Short", () => {
        return request(app)
            .put("/orderstates/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "Ge",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 30 characters long.")).toBe(true)
            })
    })
    test("Update Order State With Name Too Long", () => {
        return request(app)
            .put("/orderstates/1")
            .set('Content-Type', 'application/json')
            .send({
                name: "GerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardasGerasVardas",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Name must be between 3 and 30 characters long.")).toBe(true)
            })
    })
})

describe("Delete Order State", () => {
    test("Delete Order State With Existing ID That Is Depended On", () => {
        return request(app)
            .delete("/orderstates/1")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(500);
            })
    })
    test("Delete Order State With Existing ID", () => {
        return request(app)
            .delete("/orderstates/7")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Delete Order State With Non-Existing ID", () => {
        return request(app)
            .delete("/orderstates/53")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Order State with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Delete Order State With Invalid ID", () => {
        return request(app)
            .delete("/orderstates/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order State ID must be an integer.")).toBe(true)
            })
    })
})

describe("Get All Orders", () => {
    test("Trying to get all products", () => {
        return request(app)
            .get("/orders")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.length).toBe(3);
                expect(response.body.data[1].stateId).toBe(2);
            })
    });
});

describe("Get Orders By ID", () => {
    test("Get Orders With Existing ID", () => {
        return request(app)
            .get("/orders/3")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
                expect(response.body.data.stateId).toBe(3);
            })
    })
    test("Get Orders With Non-Existing ID", () => {
        return request(app)
            .get("/orders/232")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Order with provided ID doesn't exist.")).toBe(true)
            })
    })
    test("Get Orders With Invalid ID", () => {
        return request(app)
            .get("/orders/a")
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order ID must be an integer.")).toBe(true)
            })
    })
})

describe("Add Order", () => {
    test("Add Order With Valid Data", () => {
        return request(app)
            .post("/orders")
            .set('Content-Type', 'application/json')
            .send({
                userId: 1,
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Add Order With Non-Existing User", () => {
        return request(app)
            .post("/orders")
            .set('Content-Type', 'application/json')
            .send({
                userId: 153,
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Provided user doesn't exist.")).toBe(true)
            })
    })
    test("Add Order With Invalid User ID", () => {
        return request(app)
            .post("/orders")
            .set('Content-Type', 'application/json')
            .send({
                userId: "abc",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("User ID must be an integer.")).toBe(true)
            })
    })
})

describe("Update Order", () => {
    test("Update Order With Valid Data", () => {
        return request(app)
            .put("/orders/1")
            .set('Content-Type', 'application/json')
            .send({
                stateId: 5,
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(200);
            })
    })
    test("Update Order With Non-Existing Order State", () => {
        return request(app)
            .put("/orders/1")
            .set('Content-Type', 'application/json')
            .send({
                stateId: 153,
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Provided order state doesn't exist.")).toBe(true)
            })
    })
    test("Update Order With Invalid Order State ID", () => {
        return request(app)
            .put("/orders/a")
            .set('Content-Type', 'application/json')
            .send({
                stateId: "abc",
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(400);
                expect(response.body.errors.includes("Order State ID must be an integer.")).toBe(true)
            })
    })
    test("Update Order With Non-Existing Order ID", () => {
        return request(app)
            .put("/orders/999")
            .set('Content-Type', 'application/json')
            .send({
                stateId: 1,
            })
            .then(response => {
                expect(response.headers["content-type"]).toMatch(/json/);
                expect(response.statusCode).toBe(404);
                expect(response.body.errors.includes("Provided order doesn't exist.")).toBe(true)
            })
    })
})