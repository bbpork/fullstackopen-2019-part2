import React from "react";

const Person = ({ person, handleDeletePerson }) => {
  const handler = () => {
    handleDeletePerson(person);
  };
  return (
    <div>
      {person.name} {person.number} <button onClick={handler}>delete</button>
    </div>
  );
};

const Persons = ({ persons, handleDeletePerson }) =>
  persons.map(person => (
    <Person
      key={person.id}
      person={person}
      handleDeletePerson={handleDeletePerson}
    />
  ));

export default Persons;
