import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonsForm from "./components/PersonsForm";
import Persons from "./components/Persons";
import noteService from "./services/notes";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [notification, setNotification] = useState({
    message: null,
    isError: false,
  });

  useEffect(() => {
    noteService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const handleSearch = (e) => setSearch(e.target.value);
  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);

  const handleNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 3000);
  };

  const addName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const person = persons.find((person) => person.name === newName);

    if (person) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook, replace the old number with a new one?`
        )
      ) {
        noteService
          .update(personObject, person.id)
          .then((updatedPerson) => {
            const newState = persons.map((p) =>
              p.id === person.id ? updatedPerson : p
            );

            setPersons(newState);
            setNewName("");
            setNewNumber("");
            handleNotification(`Updated ${person.name}`, false);
          })
          .catch(() => {
            handleNotification(
              `Information of ${person.name} has already been removed from the server`,
              true
            );

            setPersons(persons.filter((p) => p.id !== person.id));
          });
        return;
      }
    }

    noteService.create(personObject).then((createdPerson) => {
      setPersons(persons.concat(createdPerson));
      setNewName("");
      setNewNumber("");

      handleNotification(`Added ${createdPerson.name}`, false);
    });
  };

  const handleDeleteClick = (id) => {
    const { name } = persons.find((person) => person.id === id);
    if (window.confirm(`Do you really wanna delete ${name}`)) {
      noteService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));

          handleNotification(`Deleted ${name}`, false);
        })
        .catch(() => {
          handleNotification(
            `Information of ${name} has already been removed from the server`,
            true
          );
          setPersons(persons.filter((p) => p.id !== id));
        });
    }
  };

  const personsToShow = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        message={notification.message}
        isError={notification.isError}
      />
      <Filter search={search} onSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonsForm
        onSubmit={addName}
        newName={newName}
        newNumber={newNumber}
        onChangeName={handleName}
        onChangeNumber={handleNumber}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} onDeleteClick={handleDeleteClick} />
    </div>
  );
};

export default App;
