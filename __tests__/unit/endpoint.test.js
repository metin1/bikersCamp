
const app = require('../../server') // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const coffee = require('../../db/coffees.json');

function getCoffeeCategories() {
    var coffeeCategories = [];
    for (var i = 0, l = coffee.length; i < l; i++) {
      const category = coffee[i].category
      if (!coffeeCategories.some(cat => cat === category)) coffeeCategories.push(coffee[i].category);
    }
    return coffeeCategories;
}

function getMaxIdFromFile() {
  let max = 0
  for (let i = 0; i < coffee.length; i++) {
    const element = coffee[i];
    if (parseInt(element.id)> max) max = parseInt(element.id)
  }
  return max
}

const validData = {
    "title": "Latte",
    "description": "As the most pot",
    "ingredients": ["Espresso", "Steamed Milk"],
    "category": "hot"
}

const invalidData = {
    "title": "Latte3",
    "ingredients": "Espresso",
    "category": "hot"
}

// GET REQUESTS
// Get All Coffees
it("should return all coffee array as expected", async () => {
    const response = await request.get("/coffee/all");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(coffee.length);
});

// Get only one Coffee without Id
it("should return only one coffee info request without id", async () => {
    const response = await request.get(`/coffee`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(coffee[0]);
});

// Get only one Coffee with Id
it("should return only one coffee info request with id", async () => {
    const response = await request.get(`/coffee/${coffee[2].id}`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(coffee[2]);
});

// Get error with invalid id
it("should return error message for invalid coffee id", async () => {
    const response = await request.get(`/coffee/${getMaxIdFromFile()+1}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Not Found");
});

// Get coffee according to category
it("should return coffees according to category", async () => {
    const response = await request.get("/category/hot");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(coffee.filter(coffee => coffee.category === "hot").length);

    const response2 = await request.get("/category/iced");
    expect(response2.status).toBe(200);
    expect(response2.body.length).toBe(coffee.filter(coffee => coffee.category === "iced").length);
});

// Get error according to invalid category
it("should return empty array for invalid coffee category", async () => {
    const response = await request.get("/category/qwer");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(0);
});

// Get categoryies array
it("should return all coffee categories array as expected", async () => {
    const response = await request.get("/categories")
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(getCoffeeCategories());
})

// PUT REQUESTS
// Update with valid data
it("should update with valid data", async () => {
    const response = await request.put("/coffee/2").send(validData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(validData));
});

// Not update with invalid data
it("should return error message at update with invalid data", async () => {
    const response = await request.put("/coffee/2").send(invalidData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Input");
});

// Not update with invalid id
it("should return error message at update for invalid id", async () => {
    const response = await request.put(`/coffee/${getMaxIdFromFile()+1}`).send(validData);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Not Found");
});



// POST REQUESTS
// Create with valid data
it("should create with valid data", async () => {
    const response = await request.post("/coffee").send(validData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expect.objectContaining(validData));
});

// Not Create with invalid data
it("should return error message when create with invalid data", async () => {
    const response = await request.post("/coffee").send(invalidData);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid Input");
});

// DELETE REQUESTS
// Delete with valid id
it("should delete with valid id", async () => {
    const response = await request.delete(`/coffee/${coffee[coffee.length-1].id}`);
    expect(response.status).toBe(204);
    expect(response.body).toEqual({});
});

// Not delete with invalid id
it("should return error message when delete with invalid id", async () => {
    const response = await request.delete(`/coffee/${getMaxIdFromFile()+12}`);
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Not Found");
});