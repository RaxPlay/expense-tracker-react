import { useEffect, useReducer, useState } from "react";
import './App.css'

const initialState = [{
  id: new Date().getTime(),
  name: 'Example: Video Games',
  amountSpent: `$30`,
}]

const appReducer = (state = initialState, action = {}) => {
  switch(action.type){
    case 'add-expense': 
      return[...state, action.payload]
    case 'delete-expense': 
      let setAmountRemainingFunc = () => {
      setAmountRemaining(`Amount remaining: $${incomeValue + amountSpent}`);
      setIncomeValue(`${incomeValue + amountSpent}`);
        
    }
    return(
      setAmountRemainingFunc()
    )
  }
}

export const App = () => {
  const [incomeValue, setIncomeValue] = useState('');
  const [showIncomeValue, setShowIncomeValue] = useState();
  const [amountRemaining, setAmountRemaining] = useState(); 
  const [totalAmountSpent, setTotalAmountSpent] = useState(); 
  const [expenseName, setExpenseName] = useState('');
  const [amountSpent, setAmountSpent] = useState('');
  
  const [newState, dispatch] = useReducer(appReducer, initialState)

  const addExpense = (event) => {
    event.preventDefault();

    if(expenseName == '' || amountSpent == 0){
      return;
    }

    const expense = {
      id: new Date().getTime(),
      name: expenseName,
      amountSpent: `$${amountSpent}`,
    }

    const action = {
      type: 'add-expense',
      payload: expense
    }

    const setAmountRemainingFunc = () => {
      setAmountRemaining(`Amount remaining: $${incomeValue - amountSpent}`);
      setIncomeValue(`${incomeValue - amountSpent}`);

      if(incomeValue <= `0`){
        alert('No more capital left!!');
      }
    }

    setAmountRemainingFunc();

    dispatch(action);
  }

  const deleteExpense = ({ id }) => {
    event.preventDefault();
    const action = {
      type: 'delete-expense',
      payload: id,
    }

    dispatch(action); 
  }

  const IncomeInput = () => {
    setIncomeValue(event.target.value);
  }

  const getIncome = () => {
    event.preventDefault();

    setShowIncomeValue(`Your income: $${incomeValue}`);
  }

  const expenseNameInput = () => {
    setExpenseName(event.target.value);
  }


  const amountSpentInput = () => {
    setAmountSpent(event.target.value);

    if(incomeValue == 0 || incomeValue < 0) {
      alert('Please insert a valid amount of budget');
      setAmountSpent(0);
      return
    }
  }

  return (
    <>
      <div id="get-income-form">
        <form action="get-income" onSubmit={getIncome}>
          <input type="number" className="income" value={incomeValue} onChange={IncomeInput} placeholder="3000" required/>
          <button className="get-income-btn" onSubmit={getIncome}>
            <i className="fa-solid fa-arrow-up"></i>
          </button> 
        </form> 
      </div>
      
      <div className="income-display">
        <p>{showIncomeValue}</p>
        <p>{amountRemaining}</p>
      </div>
      
      <div id="add-expense-container">
        <label htmlFor="expense" className="expense-label">Enter Expense: </label>
        <form className="add-expense" onSubmit={addExpense}>
          <input type="text" pattern="^[a-zA-Z\s]+$" className="expense-name" placeholder="Shopping" value={expenseName} onChange={expenseNameInput} required/>
          <input type="number" className="spent-amount" placeholder="400" value={amountSpent} onChange={amountSpentInput} required/>
          <button type="submit" onSubmit={addExpense}>
            Add
          </button>
        </form>
      </div>

      <div id="expense-list">
        <ul className="list-group"> 
          {newState.map(expense => {
            return(
              <li key={expense.id}>
                <span>{expense.name} </span>
                <span> {expense.amountSpent}</span>
                <button className="delete-expense-btn" type="button" onClick ={() => deleteExpense(expense)}>
                  🗑️
                </button>
              </li>
            )
          })}
        </ul>
    </div>

    <footer>
        <h3>Created by: Raxon Suri</h3>
        <div>
            <p>
                My links: 
                <a href="https://github.com/RaxPlay" className="github" target="_blank">
                  <i className="fa-brands fa-github"></i>
                </a>
                <a href="https://www.linkedin.com/in/raxon-suri-216b9326b/" className="linkedin" target="_blank">
                  <i className="fa-brands fa-linkedin"> </i>
                </a>
            </p>
        </div>
    </footer>
    </>
  )
}