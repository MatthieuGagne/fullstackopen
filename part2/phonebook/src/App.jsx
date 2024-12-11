import { useState } from 'react'
import Phonebook from './components/Phonebook'
import AddForm from './components/AddForm'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phoneNumber: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phoneNumber: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phoneNumber: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phoneNumber: '39-23-6423122', id: 4 }
  ]) 
  const [filterString, setFilterString] = useState('Ab')

  return (
    <div>
      <Filter filterString={filterString} setFilterString={setFilterString}/>
      <AddForm persons={persons} setPersons={setPersons}/>
      <Phonebook phonebookLines={persons} filterString={filterString}/>
    </div>
  )
}

export default App