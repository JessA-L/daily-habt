

const previousWeek = function(prevDate) {
    let [month, day, year] = prevDate.split("/");
    let newDate = new Date(year, month-1, day);
    const newDateArray = [];
    for (i=0; i < 7; i++) {
        newDate.setDate(newDate.getDate() - 1);
        newDateArray.unshift(newDate.toLocaleDateString());
    }
    return newDateArray
}

export default previousWeek;