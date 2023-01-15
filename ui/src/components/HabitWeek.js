import React, { useState, useRef, useEffect } from 'react';
import HabitDay from './HabitDay';

function HabitWeek({loadHabits, updateHabitDay, habit, dates, streakCounter}) {
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
            console.error(`Failed to delete habit with _id = ${habit._id}, status code = ${response.status}`)
        }
    };

    return (
        <div className="habit-week">
            <p className="habit-week-title">{habit.name}</p>
            
            {dates.map((date, i) => 
                <HabitDay 
                    updateHabitDay = {updateHabitDay}
                    date={date} 
                    habit={habit}
                    completed={habit.dates_accomp.includes(date)}
                    key={i}
                    
                    />
                )}
            <button className="deleteButton" onClick={handleDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>            
            </button>
            <div id='streakCounter'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-fire" viewBox="0 0 16 16">
                    <path d="M8 16c3.314 0 6-2 6-5.5 0-1.5-.5-4-2.5-6 .25 1.5-1.25 2-1.25 2C11 4 9 .5 6 0c.357 2 .5 4-2 6-1.25 1-2 2.729-2 4.5C2 14 4.686 16 8 16Zm0-1c-1.657 0-3-1-3-2.75 0-.75.25-2 1.25-3C6.125 10 7 10.5 7 10.5c-.375-1.25.5-3.25 2-3.5-.179 1-.25 2 1 3 .625.5 1 1.364 1 2.25C11 14 9.657 15 8 15Z"/>
                </svg>
                {streakCounter}
            </div>
        </div>
    )
}

export default HabitWeek;