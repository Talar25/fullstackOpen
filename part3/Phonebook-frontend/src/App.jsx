import { useEffect, useState } from "react";
import { PersonForm } from "./components/PersonForm";
import { SearchFilter } from "./components/SearchFilter";
import { Persons } from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  function handleAddNumber(e) {
    e.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const checked = persons.find(
      (person) => person.name.toLowerCase() === newPerson.name.toLowerCase()
    );

    if (!newNumber || !newName)
      return alert("Add data before clicking the button");

    if (checked) {
      const changedPerson = { ...checked, number: newNumber };
      personService
        .update(checked.id, changedPerson)
        .then((returnedPerson) => {
          setPersons(
            persons.map((person) =>
              person.id !== checked.id ? person : returnedPerson
            )
          );
          setNewName("");
          setNewNumber("");

          setErrorMessage(`Changed number of ${newPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage(
            `${newPerson.name}'s number has already been changed`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }

    if (!checked)
      personService
        .create(newPerson)
        .then((returnedPerson) => {
          setPersons([...persons, returnedPerson]);
          setNewName("");
          setNewNumber("");

          setErrorMessage(`Added ${newPerson.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage(
            `${newPerson.name} has already been added to the server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
  }

  function handleDelete(person) {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id);

      personService
        .getAll()
        .then((data) => {
          setPersons(data);

          setErrorMessage(`Deleted ${person.name}`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        })
        .catch((err) => {
          setErrorMessage(
            `${person.name} has already been removed from server`
          );
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  }

  useEffect(function () {
    personService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} />
      <SearchFilter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <PersonForm
        handleAddNumber={handleAddNumber}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
