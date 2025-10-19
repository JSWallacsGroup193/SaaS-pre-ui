export function generateWorkOrderNote(entry, technician) {
  const time = new Date(entry.timestamp).toLocaleString()
  let note = `HVAC Tool Result\n`
  note += `Technician: ${technician}\n`
  note += `Type: ${entry.type}\n`
  note += `Date: ${time}\n\nInputs:\n`
  for (const [key, val] of Object.entries(entry.inputs)) {
    note += `- ${key}: ${val}\n`
  }
  note += `\nResults:\n`
  for (const [key, val] of Object.entries(entry.result)) {
    note += `- ${key}: ${val}\n`
  }
  return note
}
