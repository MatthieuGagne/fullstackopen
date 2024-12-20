import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import Notifications from './components/Notifications'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterString, setFilterString] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])  

  return (
    <div>
      <Notifications errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter filterString={filterString} setFilterString={setFilterString}/>
      <AddForm persons={persons} setPersons={setPersons} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
      <Phonebook phonebookLines={persons} filterString={filterString} setPersons={setPersons} persons={persons} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>
    </div>
  )
}

export default App