import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import { AreaStoreProvider } from './context/areaStoreContext.tsx';
import './index.css';
import { ConvertData } from './util/convertData.ts';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineElement,
  PointElement,
);

const root = ReactDOM.createRoot(document.getElementById('root')!);
const convertData = new ConvertData();
root.render(
  <AreaStoreProvider convertData={convertData}>
    <App />
  </AreaStoreProvider>,
);
