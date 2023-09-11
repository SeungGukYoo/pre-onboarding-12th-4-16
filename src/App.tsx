import { ChartData, ChartOptions } from 'chart.js';
import { useRef } from 'react';
import { Chart, getElementAtEvent } from 'react-chartjs-2';
import useChartData from './hook/useChartData';

function App() {
  const { makeChart, labels, printTooltip, Location, filtering, getClickIndex } = useChartData();
  const chartRef = useRef(null);
  const barDataSets = makeChart('bar');
  const areaDataSets = makeChart('line');

  const datas: ChartData<'bar' | 'line', number[], unknown> = {
    labels: labels,
    datasets: [
      {
        type: 'bar',
        label: barDataSets.label,
        data: barDataSets.data as number[],
        backgroundColor: barDataSets.backgroundColor,
        borderColor: barDataSets.borderColor,
        borderWidth: barDataSets.borderWidth,
        yAxisID: barDataSets.yAxisID,
        order: 2,
      },
      {
        type: 'line',
        label: areaDataSets.label,
        data: areaDataSets.data as number[],
        backgroundColor: areaDataSets.backgroundColor,
        borderColor: areaDataSets.borderColor,
        borderWidth: areaDataSets.borderWidth,
        yAxisID: areaDataSets.yAxisID,
        pointStyle: false,
        order: 1,
        fill: true,
      },
    ],
  };
  const options: ChartOptions<'bar' | 'line'> = {
    scales: {
      areaValue: {
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
    if (chartRef.current) {
      const clickDataIndex = getElementAtEvent(chartRef.current, e)[0].index;
      getClickIndex(clickDataIndex);
    }
  };
  return (
    <>
      <h1 className="text-red-400">react start</h1>
      {Location.map((areaName, idx) => {
        return (
          <button className="border mx-2 px-4 py-2" key={idx} onClick={() => filtering(areaName)}>
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
