const reformatDateObjectToHTMLInputDateTypeString = (myDate) => {
    // reformat so that <input type='Date'> can be set with default value of this new format
    let reformattedDate = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()+1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
    return reformattedDate;
}

const reformatDateStringToHTMLInputDateTypeString = (date) => {
    // reformat so that <input type='Date'> can be set with default value of this new format
    let myDate = new Date(date);
    let reformattedDate = `${String(myDate.getFullYear()).padStart(4, '0')}-${String(myDate.getMonth()+1).padStart(2, '0')}-${String(myDate.getDate()).padStart(2, '0')}`;
    return reformattedDate;
}

const calculateNetSalary = (grossMonthlySalary, workedHours) => {
    let hourlyRate = grossMonthlySalary / 22 / 8;
    return workedHours * hourlyRate;
}

export {
    reformatDateObjectToHTMLInputDateTypeString,
    reformatDateStringToHTMLInputDateTypeString,
    calculateNetSalary
}