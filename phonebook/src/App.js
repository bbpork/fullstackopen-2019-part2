import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  const PersonsToDisplay = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    personService.getAll().then(initialPersons => setPersons(initialPersons));
  }, []);

  const handleNewNameChange = event => setNewName(event.target.value);
  const handleNewNumberChange = event => setNewNumber(event.target.value);
  const handleFilterChange = event => setFilter(event.target.value);

  const clearPersonForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const showNotification = notification => {
    setNotification(notification);
    setTimeout(() => setNotification(null), 2000);
  };

  const handleAddPerson = event => {
    event.preventDefault();
    let foundPerson = persons.find(person => newName === person.name);
    if (!foundPerson) {
      const newObject = { name: newName, number: newNumber };
      personService.create(newObject).then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        clearPersonForm();
        showNotification({ type: "successful", message: `Added ${newName}` });
      });
    } else {
      // `newName` has already existed
      const confirmMessage = `${newName} is already added to phonebook, replace the old number with a new one?`;
      if (window.confirm(confirmMessage)) {
        const newObject = { ...foundPerson, number: newNumber };
        personService
          .update(foundPerson.id, newObject)
          .then(returnedPerson => {
            const updatedPersons = persons.map(person =>
              person.name !== newName ? person : returnedPerson
            );
            setPersons(updatedPersons);
            clearPersonForm();
            showNotification({
              type: "successful",
              message: `Updated ${newName}`
            });
          })
          .catch(error => {
            showNotification({
              type: "unsuccessful",
              message: `Information of ${newName} has already been removed from server`
            });
          });
      }
    }
  };

  const handleDeletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filter={filter} handler={handleFilterChange} />
      <h3>Add a new</h3>
      <PersonForm
        handleAddPerson={handleAddPerson}
        newName={newName}
        handleNewNameChange={handleNewNameChange}
        newNumber={newNumber}
        handleNewNumberChange={handleNewNumberChange}
      />
      <h3>Numbers</h3>
      <Persons
        persons={PersonsToDisplay}
        handleDeletePerson={handleDeletePerson}
      />
    </div>
  );
};

export default App;
