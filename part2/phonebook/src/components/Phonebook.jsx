import Title from './Title'

const PhonebookLine = ({ phonebookLine }) => 
    <p>
        {phonebookLine.name} {phonebookLine.phoneNumber}
    </p>
  
  const Phonebook = ({ phonebookLines, filterString }) => {

    const filteredLines = filterString !== ''
        ? phonebookLines.filter(phonebookLine =>
            phonebookLine.name.includes(filterString)
        )
        : phonebookLines;

    return (
        <>
        <Title text='Numbers' />
        {filteredLines.map(phonebookLine => <PhonebookLine key={phonebookLine.id} phonebookLine={phonebookLine}/>)}
        </>
        )
    }
  
export default Phonebook;