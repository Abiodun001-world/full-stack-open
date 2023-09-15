import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data);
      });
  }, []);

  const showNotification = (message, isError = false) => {
    setNotification({ message, error: isError });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const addPerson = (newPerson) => {
    axios.post('http://localhost:3001/persons', newPerson)
      .then(response => {
        setPersons(persons.concat(response.data));
        showNotification(`Added ${newPerson.name}`);
      });
  };

  const deletePerson = (id) => {
    axios.delete(`http://localhost:3001/persons/${id}`)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id));
        showNotification(`Deleted person with id ${id}`);
      })
      .catch(error => {
        showNotification(`Failed to delete person with id ${id}`, true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if the person's name already exists
    const existingPerson = persons.find(person => person.name === newName);

    if (existingPerson) {
      // Ask user for confirmation to update the number
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        axios.put(`http://localhost:3001/persons/${existingPerson.id}`, updatedPerson)
          .then(response => {
            setPersons(persons.map(person => (person.id === existingPerson.id ? response.data : person)));
            showNotification(`Updated number for ${newName}`);
            setNewName('');
            setNewNumber('');
          })
          .catch(error => {
            showNotification(`Failed to update number for ${newName}`, true);
          });
      }
    } else {
      // Add a new person
      const newPerson = { name: newName, number: newNumber };
      addPerson(newPerson);
      setNewName('');
      setNewNumber('');
    }
  };

  const filteredPersons = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map(person => (
          <li key={person.id}>
            {person.name} {person.number}{' '}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>

      {/* Display the notification */}
      {notification && (
        <div className={`notification ${notification.error ? 'error' : 'success'}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default App;



