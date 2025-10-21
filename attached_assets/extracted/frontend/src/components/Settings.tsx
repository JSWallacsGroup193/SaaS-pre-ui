import { useEffect, useState } from 'react';

export function Settings() {
  const [prefs, setPrefs] = useState({ email: true, sms: true, inApp: true });

  useEffect(() => {
    fetch('/api/v1/users/me/prefs').then(res => res.json()).then(setPrefs);
  }, []);

  const updatePref = (key: string) => {
    fetch('/api/v1/users/me/prefs', {
      method: 'PUT',
      body: JSON.stringify({ ...prefs, [key]: !prefs[key] }),
      headers: { 'Content-Type': 'application/json' }
    }).then(() => setPrefs(p => ({ ...p, [key]: !p[key] })));
  };

  return (
    <div className="space-y-2">
      {['email', 'sms', 'inApp'].map((type) => (
        <label key={type} className="flex items-center space-x-2">
          <input type="checkbox" checked={prefs[type]} onChange={() => updatePref(type)} />
          <span className="capitalize">{type} Notifications</span>
        </label>
      ))}
    </div>
  );
}