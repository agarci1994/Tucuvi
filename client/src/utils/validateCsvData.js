import validateCsvRow from '../utils/validateCsvRow'

const validateCsvData = rows => {
    const dataRows = rows.slice(1, rows.length)
    for (let i = 0; i < dataRows.length; i++) {
        let row = dataRows[i].filter(elm => elm)
        const rowError = validateCsvRow(row)
        if (rowError) {
            return `${rowError} on row ${i + 1}`
        }
    }
    return dataRows.map(elm => elm.filter(elm => elm))
}

export default validateCsvData