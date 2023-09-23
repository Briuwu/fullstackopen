const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Person = require("../models/person");
const helper = require("./test_helpers");

beforeEach(async () => {
  await Person.deleteMany({});

  const personObjects = helper.initialPeople.map((p) => new Person(p));
  const promiseArray = personObjects.map((p) => p.save());
  await Promise.all(promiseArray);
});

describe("when there is initially some people saved", () => {
  test("all persons are returned as json", async () => {
    await api
      .get("/api/persons")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all person are returned", async () => {
    const response = await api.get("/api/persons");
    expect(response.body).toHaveLength(helper.initialPeople.length);
  });

  test("a specific person is within the returned people", async () => {
    const response = await api.get("/api/persons");
    const names = response.body.map((r) => r.name);
    expect(names).toContain("John Doe");
  });
});

describe("viewing a specific person", () => {
  test("succeeds with a valid id", async () => {
    const peopleAtStart = await helper.peopleInDb();
    const person = peopleAtStart[0];

    const result = await api
      .get(`/api/persons/${person.id}`)
      .expect(200)
      .expect("Content-Type", /application\/json/);

    expect(result.body).toEqual(person);
  });

  test("fails with statuscode 404 if person does not exist", async () => {
    const invalidId = await helper.nonExistingId();

    await api.get(`/api/persons/${invalidId}`).expect(404);
  });

  test("fails with statuscode 400 if id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";

    await api.get(`/api/persons/${invalidId}`).expect(400);
  });
});

describe("addition of a new person", () => {
  test("succeeds with valid data", async () => {
    const newPerson = {
      name: "John Poe",
      number: "012-3456789",
    };

    await api
      .post("/api/persons")
      .send(newPerson)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const peopleAtEnd = await helper.peopleInDb();
    expect(peopleAtEnd).toHaveLength(helper.initialPeople.length + 1);

    const personNames = peopleAtEnd.map((p) => p.name);
    expect(personNames).toContain("John Poe");
  });

  test("fails with statuscode 400 if data is invalid", async () => {
    const newPerson = {
      name: "J",
      number: "012-3456789",
    };

    await api.post("/api/persons").send(newPerson).expect(400);
  });
});

describe("deletion of a person", () => {
  test("succeeds with statuscode 204 if id is valid", async () => {
    const personAtStart = await helper.peopleInDb();
    const personToDelete = personAtStart[0];

    await api.delete(`/api/persons/${personToDelete.id}`).expect(204);

    const peopleAtEnd = await helper.peopleInDb();
    expect(peopleAtEnd).toHaveLength(helper.initialPeople.length - 1);

    const personNames = peopleAtEnd.map((p) => p.name);
    expect(personNames).not.toContain(personToDelete.name);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
