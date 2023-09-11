import { useAreaData } from '../context/areaStoreContext';

function useChartData() {
  const { areaData, changeColor, currentFocusLocation } = useAreaData();
  const labels = areaData?.labels;

  const makeChart = (type: 'bar' | 'line') => {
    const defaultChart = {
      label: 'BAR VALUE',
      data: areaData?.bar,
      borderWidth: 1,
      backgroundColor: areaData?.barColor,
      borderColor: 'rgba(255, 99, 132, 1)',
      yAxisID: 'barValue',
    };

    if (type === 'line') {
      defaultChart.label = 'AREA VALUE';
      defaultChart.data = areaData?.area;
      defaultChart.borderWidth = 1;

      defaultChart.backgroundColor = ['rgba(75, 192, 192, 0.7)'];
      defaultChart.borderColor = 'rgba(75, 192, 192, 1)';
      defaultChart.yAxisID = 'areaValue';
    }

    return defaultChart;
  };

  const printTooltip = (index: number, type: 'bar' | 'line') => {
    const message = `location: ${areaData?.id[index]} Value: ${
      type === 'bar' ? areaData?.bar[index] : areaData?.area[index]
    }`;
    return message;
  };

  const Location = [...new Set(areaData?.id)];

  const getClickIndex = (index: number) => {
    if (!index) return;
    filtering(areaData.id[index]);
  };
  const filtering = (areaName: string) => {
    if (currentFocusLocation === areaName) {
      const newAnswer = areaData?.id.map((data, index) => {
        areaData.barColor[index] = 'rgba(255, 99, 132, 0.2)';
        return data;
      });
      if (newAnswer && changeColor) changeColor(areaName, newAnswer);
    } else {
      const newAnswer = areaData?.id.map((data, index) => {
        if (data === areaName) {
          areaData.barColor[index] = 'rgba(255, 99, 132, 1)';
        } else {
          areaData.barColor[index] = 'rgba(255, 99, 132, 0.2)';
        }
        return data;
      });
      if (newAnswer && changeColor) changeColor(areaName, newAnswer);
    }
  };

  return { labels, printTooltip, makeChart, Location, filtering, getClickIndex };
}

export default useChartData;
