import React from 'react';
import HabitWeek from './HabitWeek';

function Date({date}) {
    return (
        <div className="date">
            <p id={`date-component-${date}`}>
                {date}
            </p>
        </div>
    )
}

export default Date;