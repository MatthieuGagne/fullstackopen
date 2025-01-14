const mongoose = require('mongoose')

const password = process.argv[2]
const newName = process.argv[3]
const newNumber = process.argv[4]

console.log(process.argv.toString)

const url =
  `mongodb+srv://mathdaman:${password}@cluster0.n7imt.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (newName && newNumber) {
  const person = new Person({
    name: newName,
    number: newNumber,
  })

  person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook saved!`)
    mongoose.connection.close()
  })
} else {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}