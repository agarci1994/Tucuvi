
const validateCsvRow = row => {
    if (!row[0]) {
        return "invalid name"
    } else if (!Number.isInteger(Number(row[1]))) {
        return "invalid roll number"
    } else if (32 === row[0]) {
        return "invalid date of birth"
    }
    return;
}

export default validateCsvRow