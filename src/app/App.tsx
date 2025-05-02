import { VALID_CODES } from '@/constants';
import Sidebar from '@/shared/components/Sidebar';
import { AppRoutes } from './router';

export default function App() {
  return (
    <div className="app">
      <Sidebar codes={VALID_CODES} />
      <AppRoutes />
    </div>
  );
}
