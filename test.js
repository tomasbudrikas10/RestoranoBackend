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
