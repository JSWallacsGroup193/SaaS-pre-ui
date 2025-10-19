export function generateShareText(entry, technician) {
  const date = new Date(entry.timestamp).toLocaleString()
  const body = []
  body.push(`HVAC Tool Result`)
  body.push(`Technician: ${technician}`)
  body.push(`Type: ${entry.type}`)
  body.push(`Date: ${date}`)
  body.push('')
  body.push('Inputs:')
  for (const [key, val] of Object.entries(entry.inputs)) {
    body.push(`- ${key}: ${val}`)
  }
  body.push('')
  body.push('Results:')
  for (const [key, val] of Object.entries(entry.result)) {
    body.push(`- ${key}: ${val}`)
  }
  return body.join('\n')
}

export function mailtoShare(entry, technician) {
  const text = generateShareText(entry, technician)
  const subject = encodeURIComponent(`HVAC Tool Report: ${entry.type}`)
  const body = encodeURIComponent(text)
  window.location.href = `mailto:?subject=${subject}&body=${body}`
}
