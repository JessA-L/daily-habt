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
  const [dates, setDates] = useState([]);
  // const dates = ["1/8", "1/9", "1/10", "1/11", "1/12", "1/13", "1/14"];

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // console.log(Boolean(storedHabits));
    if (storedHabits) setHabits(storedHabits)
    // console.log(habits);


    //populates date data
    const dateArray = []
    const currDate = new Date();
    let currMonth = currDate.getMonth() + 1;
    let currDay = currDate.getDate();
    dateArray.push(`${currMonth}/${currDay}`)
    for (let i=0; i<6; i++){
      currDay = currDay - 1;
      if (currDay === 0) {
        console.log(currDay)
        currMonth -= 1;
      
        switch (currMonth) {
          case 0:
            currMonth = 12;
            currDay = 31;
            break;
          case 1: case 3: case 5: case 7: case 8: case 10:
            currDay = 31;
            break;
          case 4: case 6: case 9: case 11:
            currDay = 30;
            break
          case 2: 
            currDay = 28;
            break
        }}
      dateArray.unshift(`${currMonth}/${currDay}`)
      } 
    

    setDates(dateArray)
  }, [])


  

  useEffect(() => {
    console.log(habits);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits))
  }, [habits])

  // Source: https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
  // Getting days of the week starting from when user begins adding the habit
  // let curr = new Date;
  // let dates = [];

  // for (let i=1; i<=7; i++) {
  //   let first = curr.getDate() - curr.getDay() + i;
  //   let day = new Date(curr.setDate(first)).toLocaleDateString(); 
  //   dates.push(day); 
  // };

  // console.log(dates); 

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
