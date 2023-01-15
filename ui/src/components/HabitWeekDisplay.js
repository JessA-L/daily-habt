import React from 'react';
import DateDisplay from './DateDisplay';
import HabitWeek from './HabitWeek';

function HabitWeekDisplay({loadHabits, updateHabitDay, setHabits, habits, dates}){
    return (
        <div id="grid">
            <DateDisplay loadHabits = {loadHabits} setHabits = {setHabits} dates = {dates} />
            <div id="habit-week-display">
                
                {habits.map((habit, i) =>
                    <HabitWeek 
                        updateHabitDay = {updateHabitDay}
                        key = {i}
                        habit = {habit}
                        dates = {dates}
                    />)}
            </div>
        </div>
    )
}

export default HabitWeekDisplay;