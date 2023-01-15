// Import dependencies
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import HabitWeekDisplay from './components/HabitWeekDisplay';

function App() {

  const LOCAL_STORAGE_KEY = 'habitApp.habits';

  // const [habits, setHabits] = useState([
  //   {name: "drink water", dates_accomp:["1/8", "1/9", "1/10", "1/11"]},
  //   {name: "run 30 minutes", dates_accomp:["1/10", "1/11", "1/12", "1/13"]},
  //   {name: "sleep 8 hours", dates_accomp: ["1/9", "1/11", "1/13"]}
  // ]);

  // Initialize state variables to be passed down 
  const [habits, setHabits] = useState([]);
  const [dates, setDates] = useState([]);
  // const dates = ["1/8", "1/9", "1/10", "1/11", "1/12", "1/13", "1/14"];



  useEffect(() => {
    // const storedHabits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(Boolean(storedHabits));
    // if (storedHabits) setHabits(storedHabits)
    // console.log(habits);


    //populates date data
    const dateArray = []
    let currDate = new Date();
    dateArray.push(currDate.toLocaleDateString());

    for (let i=0; i<6; i++){
      currDate.setDate(currDate.getDate() - 1)

      dateArray.unshift(currDate.toLocaleDateString());
      } 
    
    loadHabits();
    setDates(dateArray);
  }, [])

  // for (let i=1; i<=7; i++) {
  //   let first = curr.getDate() - curr.getDay() + i;
  //   let day = new Date(curr.setDate(first)).toLocaleDateString(); 
  //   dates.push(day); 
  // };

  // console.log(dates); 

  const updateHabitDay = async function(habit_id, date) {
    const newHabits = [...habits]
    const habit = newHabits.find(habit => habit._id === habit_id)
    if (habit.dates_accomp.includes(date)) {
      habit.dates_accomp.splice(habit.dates_accomp.indexOf(date), 1);
      console.log(habit.dates_accomp)
    } else {
      habit.dates_accomp.push(date)
    }
    const response = await fetch(`/habits/${habit_id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name: habit.name,
        dates_accomp: habit.dates_accomp
      }),
      headers: {'Content-Type': 'application/json',},
    });

    if (response.status === 200) {
      alert("Successfully edited document!");
    } else {
      const errMessage = await response.json();
      alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
    }
    setHabits(newHabits)
  };

  const loadHabits = async () => {
    const response = await fetch('/habits');
    const newHabits = await response.json();
    console.log(newHabits)
    setHabits(newHabits);
  }

  return (

    <div className="App">
      <HabitWeekDisplay updateHabitDay={updateHabitDay} setHabits={setHabits} habits={habits} dates={dates} />
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
    </div>
  );
}

export default App;
