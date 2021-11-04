import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Form from './components/Form';
import Alert from './components/Alert';
import { v4 as uuidv4 } from 'uuid';

// const initialData = [
//   { id: uuidv4(), charge: 'rent', amount: '1600' },
//   { id: uuidv4(), charge: 'car emi', amount: '400' },
//   { id: uuidv4(), charge: 'CC bill', amount: '1200' },
// ];
const initialData = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem('expenses')): [];

function App() {
  //*********** State Values ***********//
  // all expenses, add expense
  const [expenses, setExpenses] = useState(initialData);
  // Single expense
  const [charge, setCharge] = useState('');
  // Single amount
  const [amount, setAmount] = useState('');
  // Alert
  const [alert, setAlert] = useState({ show: false });
  // Edit
  const [edit, setEdit] = useState(false);
  // ID
  const [id, setId] = useState(0);
  
  useEffect(() => { 
    localStorage.setItem('expenses', JSON.stringify(expenses)); // set local storage
  }, [expenses]); // Only run when expenses changes 

  //************* Functionality *******//

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 5000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== '' && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: 'success', text: 'item edited' });
      } else {
        // if charge and amount are not empty
        const singleExpense = { id: uuidv4(), charge, amount }; //object
        setExpenses([...expenses, singleExpense]); // spread operator
        handleAlert({ type: 'success', text: `${charge} added` });
      }
      setCharge(''); // clear the charge
      setAmount(''); // clear the amount
    } else {
      // if charge or amount is empty
      handleAlert({ type: 'danger', text: `Charge or amount is missing` });
    }
  };
  const clearItems = () => {
    // clear all items
    setExpenses([]);
    handleAlert({ type: 'danger', text: `All items cleared` });
  };
  const handleDelete = (id) => {
    // delete single item
    setExpenses(expenses.filter((item) => item.id !== id));
    handleAlert({ type: 'danger', text: `Item deleted` });
  };
  const handleEdit = (id) => {
    // edit single item
    const expense = expenses.find((item) => item.id === id);
    const { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total Expense:{' '}
        <span className='total'>
          ₹
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}
export default App;
