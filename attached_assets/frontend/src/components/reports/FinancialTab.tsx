import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useReportStore } from '../../stores/useReportStore';
import * as XLSX from 'xlsx';

export function FinancialTab() {
  const { filters } = useReportStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = new URLSearchParams(filters).toString();
    fetch('/api/v1/reports/financial?' + q)
      .then(res => res.json())
      .then(setData);
  }, [filters]);

  const exportExcel = () => {
    const sheet = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, 'Financial');
    XLSX.writeFile(wb, 'financial_report.xlsx');
  };

  return (
    <div>
      <button onClick={exportExcel} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">Export Excel</button>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="technicianId" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="_sum.revenue" fill="#8884d8" />
          <Bar dataKey="_sum.cost" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}