import React, { useState, useRef, useEffect } from 'react';
import Date from './Date';

function DateDisplay({setHabits, dates}) {
    const dateArray = [];
    const habitNameRef = useRef()


    for (let i=0; i<dates.length; i++){
        dateArray.push(<Date key = {dates[i]} date={dates[i]} 
                                    leftButton={(i===0)} 
                                    rightButton={(i===(dates.length-1))}/>)
    }

    const handleAddHabit = async function(e) {
        const name = habitNameRef.current.value;
        if (name === '') return;
        const newHabit = {name: name, dates_accomp: []}
        const response = await fetch('/habits', {
            method: 'post',
            body: JSON.stringify(newHabit),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.status === 201){
            alert("Successfully added the habit!");
        } else {
            alert(`Failed to add habit, status code = ${response.status}`);
        }
        setHabits(prevHabits => {
            return [...prevHabits, newHabit]
        })
        habitNameRef.current.value = null;
    }

    return (
        <div className="top-bar">
            <div id="add-habit-form">
                <input ref={habitNameRef} type="text" />
                <button id="add-habit" onClick={handleAddHabit}>Add Habit</button>
            </div>
            <div className="date-display">
                
                {dateArray}
                
            </div>
        </div>
    )
}

export default DateDisplay;
