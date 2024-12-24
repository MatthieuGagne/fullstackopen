import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getAll = () => {
    const url = baseUrl +'all'
    console.log (url)
    const request = axios.get(url)
    return request.then(response => response.data)
  }

  const get = (countryName) => {
    const request = axios.get(baseUrl +'api/name/' + countryName)
    return request.then(response => response.data)
  }

  export default {getAll, get}