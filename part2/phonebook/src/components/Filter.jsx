import Title from './Title'

  const Filter = ({filterString, setFilterString}) => {

    const handleFilterChange = (event) => {
      setFilterString(event.target.value)
    }
    
    return (
        <>
        <Title text='Phonebook'/>
        filter shown with <input value={filterString} onChange={handleFilterChange}></input>
        </>
        )
    }
  
export default Filter;