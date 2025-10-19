import jsPDF from 'jspdf'

export function exportToPDF(entry) {
  const doc = new jsPDF()
  doc.setFontSize(14)
  doc.text('Utility Tool Result', 20, 20)
  doc.setFontSize(11)

  doc.text(`Type: ${entry.type}`, 20, 35)
  doc.text(`Date: ${new Date(entry.timestamp).toLocaleString()}`, 20, 42)

  doc.text('Inputs:', 20, 55)
  const inputs = Object.entries(entry.inputs)
  inputs.forEach(([key, value], i) => {
    doc.text(`• ${key}: ${value}`, 25, 65 + i * 7)
  })

  const y = 65 + inputs.length * 7 + 10
  doc.text('Results:', 20, y)
  Object.entries(entry.result).forEach(([key, value], i) => {
    doc.text(`• ${key}: ${value}`, 25, y + 10 + i * 7)
  })

  doc.save(`${entry.type}_utility_result.pdf`)
}
