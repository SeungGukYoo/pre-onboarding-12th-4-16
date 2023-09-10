import { ChartData, CoreChartOptions, ElementChartOptions } from 'chart.js';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Chart, Line } from 'react-chartjs-2';
import { useAreaData } from './context/areaStoreContext';

function App() {
  const chartRef = useRef(null);

  const { areaDate } = useAreaData();
  const [Labels, setLabels] = useState([]);
  const [BarDatas, setBarDatas] = useState([]);
  const [AreaDatas, setAreaDatas] = useState([]);
  const [IdDatas, setIdDatas] = useState([]);
  useEffect(() => {
    const label = [];
    const barData = [];
    const areaData = [];
    const IdData = [];
    for (const area in areaDate) {
      label.push(area.split(' ')[1]);
      barData.push(areaDate[area].value_bar);
      areaData.push(areaDate[area].value_area);
      IdData.push(areaDate[area].id);
    }
    setLabels(label);
    setBarDatas(barData);
    setAreaDatas(areaData);
    setIdDatas(IdData);
  }, [areaDate]);

  const data = {
    labels: Labels,
    datasets: [
      {
        label: 'BAR value',
        type: 'bar' as const,
        data: BarDatas,
        borderWidth: 1,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        yAxisID: 'y1',
      },
      {
        label: 'AREA value',
        type: 'line' as const,
        data: AreaDatas,
        borderWidth: 1,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: true,
        yAxisID: 'y2',
      },
    ],
  };
  const options = {
    scales: {
      y1: {
        beginAtZero: true,
        position: 'left',
        min: 0,
        max: 20000,
      },
      y2: {
        beginAtZero: true,
        position: 'right',
        min: 0,
        max: 200,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: context => {
            const title = IdDatas[context[0].dataIndex];
            return title;
          },
        },
      },
    },
  };

  return (
    <>
      <h1 className="text-red-400">react start</h1>

      <div className="max-w-[1024px]">
        <Chart type="bar" ref={chartRef} data={data} options={options} />
      </div>
    </>
  );
}

export default App;
