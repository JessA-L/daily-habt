import React from 'react';
import HabitDay from './HabitDay';

function HabitWeek({updateHabitDay, habit, dates}) {
    // const habitDays = [];
    // for (const date of dates) {
    //     habitDays.push(<HabitDay date={date}/>)
    // }
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
            
        </div>
    )
}

export default HabitWeek;