  // function to get streak for each habit
  import React from 'react'; 
  
  const habitStreakCount = function(datesAccomp) {
    console.log(datesAccomp);
    let streakCount = 0; 
    let cmpStreaks = []; 
    for (let i=0; i<=datesAccomp.length; i++) {
      console.log(datesAccomp[i]); 
      let todaysDate = new Date(datesAccomp[i]); 
      let result = todaysDate.setDate(todaysDate.getDate()-1); 
      let yesterday = new Date(result); 
      if (datesAccomp.includes(yesterday.toLocaleDateString())) {
          streakCount++; 
      } else {
          // add streakCount to array to get max streak
          cmpStreaks.push(streakCount); 
          streakCount = 1; 
      }; 
    }; 
    const finalStreak = Math.max(...cmpStreaks); 
    return finalStreak; 
}; 

export default habitStreakCount; 