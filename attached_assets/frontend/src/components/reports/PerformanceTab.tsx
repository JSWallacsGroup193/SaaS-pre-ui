import { useEffect, useState } from 'react';
import { useReportStore } from '../../stores/useReportStore';

export function PerformanceTab() {
  const { filters } = useReportStore();
  const [data, setData] = useState({});

  useEffect(() => {
    const q = new URLSearchParams(filters).toString();
    fetch('/api/v1/reports/performance?' + q)
      .then(res => res.json())
      .then(setData);
  }, [filters]);

  return (
    <div className="space-y-2">
      <div>Completion Rate: {data.completionRate?.toFixed(2)}%</div>
      <div>Average Response Time: {data.avgResponseTime?.toFixed(2)} minutes</div>
      <div>Overdue Jobs: {data.overdueJobs}</div>
    </div>
  );
}