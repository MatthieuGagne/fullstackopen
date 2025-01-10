import Title from './Title'
import personService from '../services/persons'

const PhonebookLine = ({ phonebookLine, setPersons, persons, setErrorMessage, setSuccessMessage }) => {

    const handleDelete = () => {
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

    return (
        <p>
            {phonebookLine.name} {phonebookLine.number} <button onClick={handleDelete}>delete</button>
        </p>
    )}
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