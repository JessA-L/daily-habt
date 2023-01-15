import React from 'react';
import HabitWeek from './HabitWeek';

function HabitDay({updateHabitDay, date, habit, completed, streakCounter}) {

    function handleHabitClick() {
        console.log(habit.name, date)
        updateHabitDay(habit._id, date);
    };

    return (
        <div className="habit-day" >
            <label className="container">
                <input 
                    type="checkbox" 
                    id={`${habit.name}:${date}`} 
                    checked={completed}
                    onChange={handleHabitClick}
                    streakCounter={streakCounter}
                    />
                <span className="checkmark"></span>
                <div id='streakCounter'>{streakCounter}</div>
            </label>
        </div>
    )
}

export default HabitDay;