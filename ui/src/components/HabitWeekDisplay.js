import React from 'react';
import DateDisplay from './DateDisplay';
import HabitWeek from './HabitWeek';

function HabitWeekDisplay({onDeleteHabit, loadHabits, updateHabitDay, setHabits, habits, dates, streakCounter}){
    return (
        <div id="grid">
            <DateDisplay loadHabits = {loadHabits} setHabits = {setHabits} dates = {dates} />
            <div id="habit-week-display">
                
                {habits.map((habit, i) =>
                    <HabitWeek 
                        loadHabits = {loadHabits}
                        updateHabitDay = {updateHabitDay}
                        key = {i}
                        habit = {habit}
                        dates = {dates}
                        streakCounter={streakCounter}
                    />)}
            </div>
        </div>
    )
}

export default HabitWeekDisplay;