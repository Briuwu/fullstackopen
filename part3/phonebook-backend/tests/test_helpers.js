const Person = require("../models/person");

const initialPeople = [
  {
    name: "John Doe",
    number: "012-3456789",
  },
  {
    name: "Jane Smith",
    number: "001-9876543",
  },
];

const nonExistingId = async () => {
  const person = new Person({
    name: "Will Smith",
    number: "012-3456789",
  });

  await person.save();
  await person.deleteOne();

  return person._id.toString();
};

const peopleInDb = async () => {
  const people = await Person.find({});
  return people.map((p) => p.toJSON());
};

module.exports = {
  initialPeople,
  nonExistingId,
  peopleInDb,
};
