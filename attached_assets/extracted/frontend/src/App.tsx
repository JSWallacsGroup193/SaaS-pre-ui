import { useEffect } from 'react';
import { TopBar } from './layout/TopBar';
import { Settings } from './components/Settings';
import { useNotificationStore } from './stores/useNotificationStore';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const fetch = useNotificationStore(state => state.fetch);

  useEffect(() => { fetch(); }, [fetch]);

  return (
    <div className="font-sans">
      <TopBar />
      <main className="p-4">
        <h2 className="text-lg font-semibold mb-2">Settings</h2>
        <Settings />
      </main>
      <Toaster />
    </div>
  );
}

export default App;