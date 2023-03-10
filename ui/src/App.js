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
  const [streakCounter, setStreakCounter] = useState([]); 
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


  

  // useEffect(() => {
  //   console.log(habits);
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(habits))
  // }, [habits])



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

  const updateHabitDay = async function(habit_id, date) {
    const newHabits = [...habits]
    const habit = newHabits.find(habit => habit._id === habit_id)
    if (habit.dates_accomp.includes(date)) {
      habit.dates_accomp.splice(habit.dates_accomp.indexOf(date), 1);

    } else {
      habit.dates_accomp.push(date); 
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
      habitStreakCount(habit_id);
      
      console.log("Successfully edited document!");
    } else {
      const errMessage = await response.json();
      alert(`Failed to update document. Status ${response.status}. ${errMessage.Error}`);
    }
    setHabits(newHabits);
    // habitStreakCount(habit_id);
    //habitStreakCount(habit.dates_accomp); 
  };

  const onDeleteHabit = async function(_id) {
    const response = await fetch(`/habits/${_id}`, {method: 'DELETE'});
    if (response.status === 204) {
      const getResponse = await fetch('/habits');
      const newHabits = await getResponse.json();
      setHabits(newHabits);
    } else {
      console.error(`Failed to delete exercise with _id = ${_id}, status code = ${response.status}`)
    }
  }

  const loadHabits = async () => {
    const response = await fetch('/habits');
    const newHabits = await response.json();
    
    setHabits(newHabits);
  };

  // function to get streak for each habit
  const habitStreakCount = async function(habit_id){
    const newHabits = [...habits]
    const newStreaks = [...streakCounter]

    const habit = newHabits.find(habit => habit._id === habit_id);
    let index = newHabits.indexOf(habit);
    

    let streakCount = 0;
    let today = new Date(); 
    let yesterday = new Date();

    yesterday.setDate(yesterday.getDate()-1);
    console.log(today);
    console.log(yesterday);
    let intCounter;
    let currDate;
    let prevDate;

    

    if (habit.dates_accomp.includes(today.toLocaleDateString())) {
      // console.log(today)
      currDate = today;
      prevDate = yesterday
      intCounter = 1;
    } else if (habit.dates_accomp.includes(yesterday.toLocaleDateString())){
      currDate = today;
      currDate.setDate(currDate.getDate()-1)
      prevDate = yesterday;
      prevDate.setDate(prevDate.getDate()-1)
      intCounter = 1;
    } else {
      newStreaks[index] = 0;
      setStreakCounter(newStreaks)
      return
    }
    prevDate = new Date(prevDate.setDate(prevDate.getDate()-1));
    currDate = new Date(currDate.setDate(currDate.getDate()-1));
    let tempDate = new Date(currDate);
    console.log(`tempDate: ${tempDate}`)

    while (habit.dates_accomp.includes(currDate.toLocaleDateString())) {
      console.log(currDate)
      intCounter += 1;
      prevDate = new Date(prevDate.setDate(prevDate.getDate()-1));
      currDate = new Date(currDate.setDate(currDate.getDate()-1));
      
    }
    newStreaks[index] = intCounter;
    console.log(intCounter);

    setStreakCounter(newStreaks)
    
  }
  // const habitStreakCount = function(datesAccomp) {
  //     console.log(datesAccomp);
  //     let streakCount = 0; 
  //     let cmpStreaks = []; 
  //     for (let i=0; i<=datesAccomp.length; i++) {
  //       console.log(datesAccomp[i]); 
  //       let todaysDate = new Date(datesAccomp[i]); 
  //       let result = todaysDate.setDate(todaysDate.getDate()-1); 
  //       let yesterday = new Date(result); 
  //       if (datesAccomp.includes(yesterday.toLocaleDateString())) {
  //           streakCount++; 
  //       } else {
  //           // add streakCount to array to get max streak
  //           cmpStreaks.push(streakCount); 
  //           streakCount = 1; 
  //       }; 
  //     }; 
  //     const finalStreak = Math.max(...cmpStreaks); 
  //     setStreakCounter(finalStreak);
  // }; 

  return (

    <div className="App">
      <HabitWeekDisplay habitStreakCount={habitStreakCount} loadHabits={loadHabits} updateHabitDay={updateHabitDay} setHabits={setHabits} habits={habits} dates={dates} streakCounter={streakCounter}/>
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
