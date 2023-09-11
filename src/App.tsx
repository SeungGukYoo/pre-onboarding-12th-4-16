import { ChartData, ChartOptions } from 'chart.js';

import { Chart } from 'react-chartjs-2';
import useChartData from './hook/useChartData';

function App() {
  const { makeChart, labels, printTooltip } = useChartData();

  const barDataSets = makeChart('bar');
  const areaDataSets = makeChart('line');
  // const barOptions = makeOption(barDataSets.yAxisID, 'bar');
  // const areaOptions = makeOption(areaDataSets.yAxisID, 'line');
  // const data = {
  //   type: 'bar',
  //   data: barDataSets,
  //   // datasets: [],
  // };
  // const data: DataSetsStroctur = {
  //   labels: labels,
  //   datasets: [barDataSets],
  //   // datasets: [],
  // };

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
      },
      {
        type: 'line',
        label: areaDataSets.label,
        data: areaDataSets.data as number[],
        backgroundColor: areaDataSets.backgroundColor,
        borderColor: areaDataSets.borderColor,
        borderWidth: areaDataSets.borderWidth,
        yAxisID: areaDataSets.yAxisID,
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
    // scales: {
    //   barOptions,
    //   areaOptions,
    // },
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

  // const onClick = event => {
  //   console.log(getElementAtEvent(chartRef.current, event));
  // };

  return (
    <>
      <h1 className="text-red-400">react start</h1>

      <div className="max-w-[1024px]">
        <Chart type="bar" data={datas} options={options} />
      </div>
    </>
  );
}

export default App;
