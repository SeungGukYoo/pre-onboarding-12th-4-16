import { ChartData, ChartOptions } from 'chart.js';
import { useRef } from 'react';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import useChartData from './hook/useChartData';

function App() {
  const {
    labels,
    printTooltip,
    Location,
    filtering,
    getClickIndex,
    makeChartDataSets,
    currentFocusLocation,
  } = useChartData();
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
    responsive: true,
    maintainAspectRatio: false,
  };
  const filterDataClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!chartRef.current) return;
    const clickDataIndex = getElementAtEvent(chartRef.current, e)[0]?.index;
    getClickIndex(clickDataIndex);
  };

  return (
    <div className="  mx-auto mt-10 lg:w-[1024px] md:w-[720px] sm:w-[480px]">
      <h1 className=" text-center text-4xl mb-5">서울 지역 차트</h1>
      <div className=" flex items-center justify-center mb-5">
        {Location.map(areaName => {
          return (
            <button
              className={`border mx-2 px-4 py-2  ${
                currentFocusLocation === areaName && 'bg-gray-300/50'
              }`}
              key={areaName}
              onClick={() => filtering(areaName)}
            >
              {areaName}
            </button>
          );
        })}
      </div>
      <div className="mx-auto ">
        <Chart
          type="bar"
          data={datas}
          options={options}
          ref={chartRef}
          onClick={filterDataClick}
          style={{ height: '50vh', width: '100%' }}
        />
      </div>
    </div>
  );
}

export default App;
