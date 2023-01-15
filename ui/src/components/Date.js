import React, { useState, useRef, useEffect } from 'react';
import HabitWeek from './HabitWeek';

function Date({date, leftButton, rightButton}) {

    if (leftButton) {
        return (
            <div className="date">
                <i className="arrow left"></i>
                <p id={`date-component-${date}`}>
                    {date}
                </p>
            </div>
        )
    }
    if (rightButton) {
        return (
            <div className="date">
                <p id={`date-component-${date}`}>
                    {date}
                </p>
                <i className="arrow right"></i>
            </div>

        )
    }
    return (
        <div className="date">
            {leftButton}
            <p id={`date-component-${date}`}>
                {date}
            </p>
        </div>
    )
}

export default Date;