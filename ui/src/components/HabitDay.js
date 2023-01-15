import React from 'react';
import HabitWeek from './HabitWeek';

function HabitDay({index, habitStreakCount, updateHabitDay, date, habit, completed, streakCounter}) {

    function handleHabitClick() {
        
        updateHabitDay(habit._id, date);
        // habitStreakCount(habit._id);
    };

    return (
        <div className="habit-day" >
            <label className="container">
                <input 
                    type="checkbox" 
                    id={`${habit.name}:${date}`} 
                    checked={completed}
                    onChange={handleHabitClick}
        
                    />
                <span className="checkmark"></span>
                {/* <div id='streakCounter'>{streakCounter}</div> */}
            </label>
        </div>
    )
}

export default HabitDay;