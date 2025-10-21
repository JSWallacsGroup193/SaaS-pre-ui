import { Notifications } from '../components/Notifications';

export function TopBar() {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 shadow">
      <h1 className="text-xl font-bold">OpsNex</h1>
      <Notifications />
    </div>
  );
}