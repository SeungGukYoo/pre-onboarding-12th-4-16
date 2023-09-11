import { useAreaData } from '../context/areaStoreContext';

function useChartData() {
  const areaData = useAreaData()?.areaData;

  const labels = areaData?.labels;

  const makeChart = (type: 'bar' | 'line') => {
    const defaultChart = {
      label: 'BAR VALUE',
      data: areaData?.bar,
      borderWidth: 1,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      yAxisID: 'barValue',
    };

    if (type === 'line') {
      defaultChart.label = 'AREA VALUE';
      defaultChart.data = areaData?.area;
      defaultChart.borderWidth = 3;
      defaultChart.backgroundColor = 'rgba(75, 192, 192, 0.5)';
      defaultChart.borderColor = 'rgba(75, 192, 192, 1)';
      defaultChart.yAxisID = 'areaValue';
    }

    return defaultChart;
  };
  // const makeOption = (id: string, type: 'bar' | 'line') => {
  // const scales: OptionType = {
  //   id: '',
  // };
  // if (type === 'bar') {
  //   scales[id] = {};
  //   scales[id].max = 20000;
  //   scales[id].position = 'left';
  // } else {
  //   scales[id] = {};
  //   scales[id].max = 200;
  //   scales[id].position = 'right';
  // }
  // scales[id].min = 0;
  // scales[id].beginAtZero = true;
  // return scales;
  // };

  const printTooltip = (index: number, type: 'bar' | 'line') => {
    const message = `location: ${areaData?.id[index]} Value: ${
      type === 'bar' ? areaData?.bar[index] : areaData?.area[index]
    }`;
    return message;
  };
  return { labels, printTooltip, makeChart };
}

export default useChartData;
