import Title from './Title'
import personService from '../services/persons'

const handleDelete = (phonebookLine, setPersons, persons) => {
    console.log ('delete ' + phonebookLine.id)
    if (window.confirm(`Delete ${phonebookLine.name}`)) {
        personService
        .remove(phonebookLine.id)
        .then(response => {
            setPersons(persons.filter(person => person.id !== phonebookLine.id));
          })
    }
}

const PhonebookLine = ({ phonebookLine, setPersons, persons }) => 
    <p>
        {phonebookLine.name} {phonebookLine.phoneNumber} <button onClick={() => handleDelete(phonebookLine, setPersons, persons)}>delete</button>
    </p>
  
const Phonebook = ({ phonebookLines, filterString, setPersons, persons }) => {

const filteredLines = filterString !== ''
    ? phonebookLines.filter(phonebookLine =>
        phonebookLine.name.includes(filterString)
    )
    : phonebookLines;

return (
    <>
    <Title text='Numbers' />
    {filteredLines.map(phonebookLine => 
        <PhonebookLine key={phonebookLine.id} setPersons={setPersons} persons={persons} phonebookLine={phonebookLine}/>)}
    </>
    )
}
  
export default Phonebook;