import React, { useState, useRef, useEffect } from 'react';
import HabitDay from './HabitDay';

function HabitWeek({loadHabits, updateHabitDay, habit, dates}) {
    // const habitDays = [];
    // for (const date of dates) {
    //     habitDays.push(<HabitDay date={date}/>)
    // }
    const handleDelete = async function(e) {
        console.log(habit._id)
        const response = await fetch(`/habits/${habit._id}`, {method: 'DELETE'});
        if (response.status === 204) {
            const getResponse = await fetch('/habits');
            const newHabits = await getResponse.json();
            loadHabits();
        } else {
            console.error(`Failed to delete exercise with _id = ${habit._id}, status code = ${response.status}`)
        }
    }
    return (
        <div className="habit-week">
            <p className="habit-week-title">{habit.name}</p>
            
            {dates.map((date, i) => 
                <HabitDay 
                    updateHabitDay = {updateHabitDay}
                    date={date} 
                    habit={habit}
                    completed={habit.dates_accomp.includes(date)} 
                    key={i}/>)}

            <button className="deleteButton" onClick={handleDelete}>Delete habit</button>
            
        </div>
    )
}

export default HabitWeek;