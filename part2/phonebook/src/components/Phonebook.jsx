import Title from './Title'
import personService from '../services/persons'

const handleDelete = (phonebookLine, setPersons, persons, setErrorMessage, setSuccessMessage) => {
    console.log ('delete ' + phonebookLine.id)
    if (window.confirm(`Delete ${phonebookLine.name}`)) {
        personService
        .remove(phonebookLine.id)
        .then(response => {
            setPersons(persons.filter(person => person.id !== phonebookLine.id));
            setSuccessMessage(`${phonebookLine.name} was sucessfully deleted.`)
            setTimeout(() => {
                setSuccessMessage(null)
            }, 5000)            
        })
        .catch(error => {
            console.log (error)
            setErrorMessage(`Problem while deleting ${phonebookLine.name} phone number`);
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        });                  
    }
}

const PhonebookLine = ({ phonebookLine, setPersons, persons, setErrorMessage, setSuccessMessage }) => 
    <p>
        {phonebookLine.name} {phonebookLine.phoneNumber} <button onClick={() => handleDelete(phonebookLine, setPersons, persons, setErrorMessage, setSuccessMessage)}>delete</button>
    </p>
  
const Phonebook = ({ phonebookLines, filterString, setPersons, persons, setErrorMessage, setSuccessMessage }) => {

const filteredLines = filterString !== ''
    ? phonebookLines.filter(phonebookLine =>
        phonebookLine.name.includes(filterString)
    )
    : phonebookLines;

return (
    <>
    <Title text='Numbers' />
    {filteredLines.map(phonebookLine => 
        <PhonebookLine key={phonebookLine.id} setPersons={setPersons} persons={persons} phonebookLine={phonebookLine} setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>)}
    </>
    )
}
  
export default Phonebook;