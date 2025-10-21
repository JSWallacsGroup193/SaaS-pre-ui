import { useEffect, useState } from 'react';
import { useReportStore } from '../../stores/useReportStore';
import * as XLSX from 'xlsx';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { CustomPDF } from './CustomPDF';

export function CustomTab() {
  const { filters, setFilter } = useReportStore();
  const [data, setData] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetch('/api/v1/reports/custom?' + new URLSearchParams(filters)).then(res => res.json()).then(setData);
  }, [filters]);

  useEffect(() => {
    fetch('/api/v1/meta/technicians').then(res => res.json()).then(setTechnicians);
    fetch('/api/v1/meta/customers').then(res => res.json()).then(setCustomers);
  }, []);

  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Custom');
    XLSX.writeFile(wb, 'custom_report.xlsx');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label>Date From</label>
          <input type="date" onChange={(e) => setFilter('from', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label>Date To</label>
          <input type="date" onChange={(e) => setFilter('to', e.target.value)} className="w-full border rounded px-2 py-1" />
        </div>
        <div>
          <label>Technician</label>
          <select onChange={(e) => setFilter('technicianId', e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="">All</option>
            {technicians.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>
        <div>
          <label>Customer</label>
          <select onChange={(e) => setFilter('customerId', e.target.value)} className="w-full border rounded px-2 py-1">
            <option value="">All</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
      </div>

      <button onClick={exportExcel} className="px-4 py-2 bg-green-500 text-white rounded">Export to Excel</button>

      <PDFDownloadLink
        document={<CustomPDF data={data} />}
        fileName="custom_report.pdf"
        className="ml-4 px-4 py-2 bg-red-500 text-white rounded inline-block"
      >
        {({ loading }) => loading ? 'Preparing PDF...' : 'Export to PDF'}
      </PDFDownloadLink>

      <div className="overflow-x-auto">
        <table className="min-w-full border mt-4 text-sm">
          <thead>
            <tr className="bg-gray-100">
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="border px-2 py-1">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value, i) => (
                  <td key={i} className="border px-2 py-1">{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}