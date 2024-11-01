const prompt = require('prompt-sync')()

const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')

const Customer = require('./models/customer.js')

const connect = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  await runQueries()
  await mongoose.disconnect()
  process.exit()
}

const runQueries = async () => {
  await main()
}

const createCustomer = async () => {
  const customerData = {
    name: prompt('Enter customer name: '),
    age: parseInt(prompt('Enter customer age: '))
  }

  const customer = await Customer.create(customerData)
  console.log(
    `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
  )
  console.log('Create Customer successfully')
}

const viewCustomers = async () => {
  const customer = await Customer.find({})

  console.log('\nBelow is a list of customers:')
  customer.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
}

const updateCustomer = async () => {
  const customer = await Customer.find({})
  console.log('\nBelow is a list of customers:')
  customer.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
  const id = prompt(
    'Copy and paste the id of the customer you would like to update here: '
  )
  const updatedCustomer = await Customer.findByIdAndUpdate(id, {
    name: prompt('Enter customer name: '),
    age: parseInt(prompt('Enter customer age: '))
  })
  console.log('Updated Customer successfully')
}

const deleteCustomer = async () => {
  const customer = await Customer.find({})
  console.log('\nBelow is a list of customers:')
  customer.forEach((customer) => {
    console.log(
      `id: ${customer._id} -- Name: ${customer.name}, Age: ${customer.age}`
    )
  })
  const id = prompt(
    'Copy and paste the id of the customer you would like to delete here: '
  )
  const deleteCustomer = await Customer.findByIdAndDelete(id)
  console.log('Delete Customer successfully')
}

const welcomeMessage = async function () {
  console.log('Welcome to the CRM\n')
}

const showMenu = async function () {
  console.log('\nWhat would you like to do?')
  console.log('  1. Create a customer')
  console.log('  2. View all customers')
  console.log('  3. Update a customer')
  console.log('  4. Delete a customer')
  console.log('  5. Quit')
}

const main = async () => {
  await welcomeMessage()

  while (true) {
    await showMenu()
    const choice = parseInt(prompt('Number of action to run: '))

    switch (choice) {
      case 1:
        await createCustomer()
        break
      case 2:
        await viewCustomers()
        break
      case 3:
        await updateCustomer()
        break
      case 4:
        await deleteCustomer()
        break
      case 5:
        console.log('exiting...')
        return
      default:
        console.log('Invalid choice. Please enter a number between 1 and 5.')
    }
  }
}
connect()
