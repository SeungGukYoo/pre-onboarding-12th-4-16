import { ChartData, ChartOptions } from 'chart.js';
import { useRef } from 'react';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import useChartData from './hook/useChartData';

function App() {
  const { labels, printTooltip, Location, filtering, getClickIndex, makeChartDataSets } =
    useChartData();
  const chartRef = useRef(null);
  const makeDataSets = makeChartDataSets(['bar', 'line']).map(dataset => Object.assign(dataset));

  const datas: ChartData<'bar' | 'line', number[], unknown> = {
    labels: labels,
    datasets: makeDataSets,
  };
  const options: ChartOptions<'bar' | 'line'> = {
    scales: {
      lineValue: {
        min: 0,
        max: 200,
        position: 'right',
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: context => {
            if (!context[0].dataset.type) return '';
            const title = printTooltip(context[0].dataIndex, context[0].dataset.type);
            return title;
          },
        },
      },
    },
  };
  const filterDataClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;
    const clickDataIndex = getElementAtEvent(chartRef.current, e)[0]?.index;
    getClickIndex(clickDataIndex);
  };
  return (
    <>
      <h1 className="text-red-400">react start</h1>
      {Location.map(areaName => {
        return (
          <button
            className="border mx-2 px-4 py-2"
            key={areaName}
            onClick={() => filtering(areaName)}
          >
            {areaName}
          </button>
        );
      })}
      <div className="max-w-[1024px]">
        <Chart type="bar" data={datas} options={options} ref={chartRef} onClick={filterDataClick} />
      </div>
    </>
  );
}

export default App;
