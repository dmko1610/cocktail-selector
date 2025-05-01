import Sidebar from '../shared/components/Sidebar';
import { AppRoutes } from './router';

const codes = ['margarita', 'mojito', 'a1', 'kir'];

export default function App() {
  return (
    <div className="app">
      <Sidebar codes={codes} />
      <AppRoutes />
    </div>
  );
}
