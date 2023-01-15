import React from 'react';
import DateDisplay from './DateDisplay';
import HabitWeek from './HabitWeek';

function HabitWeekDisplay({habitStreakCount, onDeleteHabit, loadHabits, updateHabitDay, setHabits, habits, dates, streakCounter}){
    return (
        <div id="grid">
            <DateDisplay loadHabits = {loadHabits} setHabits = {setHabits} dates = {dates} />
            <div id="habit-week-display">
                
                {habits.map((habit, i) =>
                    <HabitWeek 
                        index = {i}
                        habitStreakCount={habitStreakCount}
                        loadHabits = {loadHabits}
                        updateHabitDay = {updateHabitDay}
                        key = {i}
                        habit = {habit}
                        dates = {dates}
                        streakCounter={streakCounter[i]}
                    />)}
            </div>
        </div>
    )
}

export default HabitWeekDisplay;