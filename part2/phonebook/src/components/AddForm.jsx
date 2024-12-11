import { useState } from 'react'
import Title from './Title'

const AddForm = ({ persons, setPersons }) => {

    const [newName, setNewName] = useState('')
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
  
    const addPerson = (event) => {
      event.preventDefault()
      const personObject = {
        name: newName,
        phoneNumber: newPhoneNumber,
        id: String(persons.length +1)
      }
  
      if (persons.some(person => person.name === personObject.name))
        {
          alert(`${newName} is already added to phonebook`)
        }    
      else {
        setPersons(persons.concat(personObject))
        setNewName('') 
        setNewPhoneNumber('')
      }
    }
    
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