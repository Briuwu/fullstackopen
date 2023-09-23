const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://fullstackopen:${password}@cluster0.f8njhvv.mongodb.net/testPersonApp?retryWrites=true&w=majority`;

mongoose.set("strictQuery", false);
mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name: name,
  number: number,
});

if (process.argv.length < 4) {
  console.log("phonebook:");
  Person.find({}).then((result) => {
    result.forEach((person) => {
      console.log(person.name, person.number);
    });

    mongoose.connection.close();
  });
} else {
  person.save().then(() => {
    console.log("added ", name, "number", number, "to phonebook");
    mongoose.connection.close();
  });
}
