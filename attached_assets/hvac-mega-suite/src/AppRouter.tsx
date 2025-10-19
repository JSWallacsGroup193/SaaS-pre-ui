import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import CalculatorDashboard from './components/CalculatorDashboard'
import HVACToolLauncher from './launcher/HVACToolLauncher'
import TechnicianHistory from './components/TechnicianHistory'

// Tool placeholders for routing targets
import DewPointConverter from './components/DewPointConverter'
import TonnageCalculator from './components/TonnageCalculator'
import UnitConverter from './components/UnitConverter'
import ManualJLite from './components/ManualJLite'

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HVACToolLauncher />} />
        <Route path="/tools/utility/dewpoint" element={<DewPointConverter />} />
        <Route path="/tools/utility/tonnage" element={<TonnageCalculator />} />
        <Route path="/tools/utility/unit" element={<UnitConverter />} />
        <Route path="/tools/utility/manualj" element={<ManualJLite />} />
        <Route path="/tools/utility/dashboard" element={<CalculatorDashboard />} />
        <Route path="/tools/history" element={<TechnicianHistory />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}
