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
