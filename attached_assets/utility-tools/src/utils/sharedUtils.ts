export function calculateDewPoint(tempF: number, rh: number): number {
  const tempC = (tempF - 32) * (5 / 9)
  const b = 17.62
  const c = 243.12
  const gamma = Math.log(rh / 100) + (b * tempC) / (c + tempC)
  const dewPointC = (c * gamma) / (b - gamma)
  return (dewPointC * 9) / 5 + 32
}

export function calculateWetBulb(tempF: number, rh: number): number {
  const tempC = (tempF - 32) * (5 / 9)
  const rhFrac = rh / 100
  const wetBulbC = tempC * Math.atan(0.151977 * Math.sqrt(rh + 8.313659)) +
    Math.atan(tempC + rh) - Math.atan(rh - 1.676331) +
    0.00391838 * Math.pow(rh, 1.5) * Math.atan(0.023101 * rh) -
    4.686035
  return (wetBulbC * 9) / 5 + 32
}

export function convertUnits(value: number, from: string, to: string): number {
  const conversions: Record<string, number> = {
    'btu-kwh': 0.000293071,
    'kwh-btu': 3412.14,
    'cfm-lps': 0.471947,
    'lps-cfm': 2.11888,
    'psi-pa': 6894.76,
    'pa-psi': 0.000145038,
    'f-c': (value - 32) * (5 / 9),
    'c-f': (value * 9) / 5 + 32,
  }
  const key = `${from}-${to}`
  return conversions[key] ?? value
}
