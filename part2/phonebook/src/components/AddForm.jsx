import { useState } from 'react'
import Title from './Title'
import personService from '../services/persons'

const AddForm = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
  
    const addPerson = (event) => {
      event.preventDefault();
      const personObject = {
          name: newName,
          phoneNumber: newPhoneNumber,
          id: String(persons.length + 1)
      };

      const existingPerson = persons.find(person => person.name === personObject.name);

      if (existingPerson) {
          if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
              personService
                  .update(existingPerson.id, { ...existingPerson, phoneNumber: newPhoneNumber })
                  .then(updatedPerson => {
                      setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
                      setNewName('');
                      setNewPhoneNumber('');
                  })
          }
      } else {
          personService
              .create(personObject)
              .then(response => {
                  setPersons(persons.concat(response));
                  setNewName('');
                  setNewPhoneNumber('');
              })
      }
  };
    
    const handlePersonChange = (event) => {
      console.log(`Person : ${event.target.value}`)
      setNewName(event.target.value)
    }
  
    const handlePhoneNumberChange = (event) => {
      console.log(`Phone number : ${event.target.value}`)
      setNewPhoneNumber(event.target.value)
    }
    
    return (
      <>
      <Title text='Add a new' />
      <form onSubmit={addPerson}>
          <div>
            name: 
            <input 
            value={newName}
              onChange={handlePersonChange}
            />
          </div>
          <div>
            phone number : 
            <input 
            value={newPhoneNumber}
              onChange={handlePhoneNumberChange}
            />          
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    )
  }

export default AddForm;