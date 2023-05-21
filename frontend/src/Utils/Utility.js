const reformatDateObjectToHTMLInputDateTypeString = (myDate) => {
    // reformat so that <input type='Date'> can be set with default value of this new format
    let reformattedDate = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()+1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
    console.log('from date: ', myDate.toString(), " to date: ", reformattedDate);
    return reformattedDate;
}

const reformatDateStringToHTMLInputDateTypeString = (date) => {
    // reformat so that <input type='Date'> can be set with default value of this new format
    let myDate = new Date(date);
    let reformattedDate = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()+1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
    console.log('from date: ', date, " to date: ", reformattedDate);
    return reformattedDate;
}

export {
    reformatDateObjectToHTMLInputDateTypeString,
    reformatDateStringToHTMLInputDateTypeString
}