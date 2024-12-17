import { useState, useEffect } from 'react'
import axios from 'axios'
import Phonebook from './components/Phonebook'
import AddForm from './components/AddForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])  

  return (
    <div>
      <Filter filterString={filterString} setFilterString={setFilterString}/>
      <AddForm persons={persons} setPersons={setPersons}/>
      <Phonebook phonebookLines={persons} filterString={filterString}/>
    </div>
  )
}

export default App