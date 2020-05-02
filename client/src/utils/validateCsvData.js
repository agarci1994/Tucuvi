import validateCsvRow from '../utils/validateCsvRow'

const validateCsvData = rows => {
    const dataRows = rows.slice(1, rows.length)
    for (let i = 0; i < dataRows.length; i++) {
        const rowError = validateCsvRow(dataRows[i])
        if (rowError) {
            return `${rowError} on row ${i + 1}`
        }
    }
    return;
}

export default validateCsvData