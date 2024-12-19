import { useState, useEffect } from 'react'
import Phonebook from './components/Phonebook'
import AddForm from './components/AddForm'
import Filter from './components/Filter'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])  

  return (
    <div>
      <Filter filterString={filterString} setFilterString={setFilterString}/>
      <AddForm persons={persons} setPersons={setPersons}/>
      <Phonebook phonebookLines={persons} filterString={filterString} setPersons={setPersons} persons={persons}/>
    </div>
  )
}

export default App