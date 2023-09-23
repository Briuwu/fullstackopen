const personsRouter = require("express").Router();
const Person = require("../models/person");

personsRouter.get("/", async (request, response) => {
  const people = await Person.find({});

  response.json(people);
});

personsRouter.get("/:id", async (request, response) => {
  const person = await Person.findById(request.params.id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

personsRouter.delete("/:id", async (request, response) => {
  await Person.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

personsRouter.post("/", async (request, response) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  const savedPerson = await person.save();
  response.status(201).json(savedPerson);
});

personsRouter.put("/:id", (request, response, next) => {
  const { name, number } = request.body;

  Person.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

module.exports = personsRouter;
