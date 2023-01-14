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

  const [habits, setHabits] = useState([]);
  const dates = ["1/8", "1/9", "1/10", "1/11", "1/12", "1/13", "1/14"];

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(Boolean(storedHabits));
    if (storedHabits) setHabits(storedHabits)
    // console.log(habits);
  }, [])

  useEffect(() => {
    console.log(habits);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits))
  }, [habits])



  function toggleHabitDay(name, date) {
    const newHabits = [...habits]
    const habit = newHabits.find(habit => habit.name === name)
    if (habit.dates_accomp.includes(date)) {
      habit.dates_accomp.splice(habit.dates_accomp.indexOf(date), 1);
      console.log(habit.dates_accomp)
    } else {
      habit.dates_accomp.push(date)
    }
    setHabits(newHabits)
  };


  

  return (

    <div className="App">
      <HabitWeekDisplay toggleHabitDay={toggleHabitDay} setHabits={setHabits} habits={habits} dates={dates} />
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
