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

    function handleAddHabit(e) {
        const name = habitNameRef.current.value;
        if (name === '') return;
        setHabits(prevHabits => {
            return [...prevHabits, {name: name, dates_accomp: []}]
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
