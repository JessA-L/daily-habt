import React from 'react';
import DateDisplay from './DateDisplay';
import HabitWeek from './HabitWeek';

function HabitWeekDisplay({toggleHabitDay, setHabits, habits, dates}){
    return (
        <div id="grid">
            <DateDisplay setHabits = {setHabits} dates = {dates} />
            <div id="habit-week-display">
                
                {habits.map((habit, i) =>
                    <HabitWeek 
                        toggleHabitDay = {toggleHabitDay}
                        key = {i}
                        habit = {habit}
                        dates = {dates}
                    />)}
            </div>
        </div>
    )
}

export default HabitWeekDisplay;