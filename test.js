// Source: https://medium.com/@quynh.totuan/how-to-get-the-current-week-in-javascript-9e64d45a9a08
// Getting days of the week leading up to the date the user wants
let curr = new Date;
let week = [];

for (let i=1; i<=7; i++) {
  let first = curr.getDate() - curr.getDay() + i;
  let day = new Date(curr.setDate(first)).toLocaleDateString(); 
  week.push(day); 
}

console.log(week); 