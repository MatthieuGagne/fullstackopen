import { useState } from 'react'
import Title from './Title'
import personService from '../services/persons'

const AddForm = ({ persons, setPersons, setErrorMessage, setSuccessMessage }) => {

    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
  
    const addPerson = async (event) => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: newNumber
        };

        const existingPerson = persons.find(person => person.name === personObject.name);

        try {
            if (existingPerson) {
                if (window.confirm(`${newName} is already added to phonebook, replace old number with a new one?`)) {
                    const updatedPerson = await personService.update(existingPerson.id, { ...existingPerson, number: newNumber });
                    setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson));
                    setSuccessMessage(`${newName} phone number was updated to ${newNumber}.`);
                }
            } else {
                const response = await personService.create(personObject);
                setPersons(persons.concat(response));
                setSuccessMessage(`${newName} was added to the phonebook.`);
            }
            setNewName('');
            setNewNumber('');
            setTimeout(() => {
                setSuccessMessage(null);
            }, 5000);
        } catch (error) {
            console.log(error);
            setErrorMessage(`Problem while processing ${newName}`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };
    
    const handlePersonChange = (event) => {
      console.log(`Person : ${event.target.value}`)
      setNewName(event.target.value)
    }
  
    const handlePhoneNumberChange = (event) => {
      console.log(`Phone number : ${event.target.value}`)
      setNewNumber(event.target.value)
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
            value={newNumber}
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