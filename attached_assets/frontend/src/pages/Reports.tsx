import { useReportStore } from '../stores/useReportStore';
import { FinancialTab } from '../components/reports/FinancialTab';
import { PerformanceTab } from '../components/reports/PerformanceTab';
import { CustomTab } from '../components/reports/CustomTab';

export function Reports() {
  const { tab, setTab } = useReportStore();

  return (
    <div className="p-4 space-y-4">
      <div className="flex space-x-4">
        {['Financial', 'Performance', 'Custom'].map((t) => (
          <button
            key={t}
            className={\`px-4 py-2 border rounded \${tab === t ? 'bg-blue-500 text-white' : 'bg-gray-100'}\`}
            onClick={() => setTab(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {tab === 'Financial' && <FinancialTab />}
      {tab === 'Performance' && <PerformanceTab />}
      {tab === 'Custom' && <CustomTab />}
    </div>
  );
}