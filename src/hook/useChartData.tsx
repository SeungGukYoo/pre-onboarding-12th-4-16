import { IColorDatas, IbarDefaultChart, IlineDefaultChart, makeDataSets } from '../..';
import { useAreaData } from '../context/areaStoreContext';

const noneFilteringBarColor = 'rgba(255, 99, 132, 0.2)';
const focusFilteringBarColor = 'rgba(255, 99, 132, 1)';
const noneFilteringLineColor = 'rgba(75, 192, 192, 0.7)';
const focusFilteringLineColor = 'rgba(0, 0, 0, 0.7)';
const lineDefaultChart: IlineDefaultChart = {
  type: 'line',
  label: 'AREA Value',
  data: [],
  backgroundColor: [noneFilteringLineColor],
  borderWidth: 1,
  yAxisID: 'lineValue',
  pointStyle: 'circle',
  pointBackgroundColor: noneFilteringLineColor,
  pointBorderColor: [],
  order: 1,
  fill: true,
};
const barDefaultChart: IbarDefaultChart = {
  type: 'bar',
  label: 'BAR Value',
  data: [],
  backgroundColor: [],
  borderWidth: 1,
  yAxisID: 'areaValue',
  order: 2,
};

function useChartData() {
  const { areaData, colorDatas, changeColor, currentFocusLocation } = useAreaData();

  const labels = areaData?.labels;
  const Location = [...new Set(areaData?.id)];

  const switchFnc = (type: string) => {
    switch (type) {
      case 'bar': {
        const defaultDataset = barDefaultChart;
        defaultDataset.data = areaData?.bar;
        defaultDataset.backgroundColor = colorDatas.barColor;
        return defaultDataset;
      }
      case 'line': {
        const defaultDataset = lineDefaultChart;
        defaultDataset.data = areaData?.area;
        defaultDataset.backgroundColor = colorDatas.lineColor;
        defaultDataset.pointBorderColor = colorDatas.borderColor;
        return defaultDataset;
      }
      default:
        throw new Error('지원하지 않은 차트입니다.');
    }
  };

  const makeChartDataSets: makeDataSets = (types: string[]) => {
    const results = types.map(type => {
      const result = switchFnc(type);
      return result;
    });
    return results;
  };

  const printTooltip = (index: number, type: 'bar' | 'line') => {
    const message = `location: ${areaData?.id[index]} Value: ${
      type === 'bar' ? areaData?.bar[index] : areaData?.area[index]
    }`;
    return message;
  };

  const getClickIndex = (index: number) => {
    if (!index) return;
    filtering(areaData.id[index]);
  };

  const filtering = (areaName: string) => {
    const prevAreaData: IColorDatas = Object.assign(colorDatas);

    if (currentFocusLocation === areaName) {
      labels.forEach((_, index) => {
        prevAreaData.barColor[index] = noneFilteringBarColor;
        prevAreaData.borderColor[index] = noneFilteringLineColor;
      });
      areaName = 'none';
    } else {
      areaData.id.forEach((name, index) => {
        if (name === areaName) {
          prevAreaData.barColor[index] = focusFilteringBarColor;
          prevAreaData.borderColor[index] = focusFilteringLineColor;
        } else {
          prevAreaData.barColor[index] = noneFilteringBarColor;
          prevAreaData.borderColor[index] = noneFilteringLineColor;
        }
      });
    }
    changeColor && changeColor(areaName, prevAreaData);
  };

  return {
    labels,
    printTooltip,
    Location,
    filtering,
    getClickIndex,
    makeChartDataSets,
    currentFocusLocation,
  };
}

export default useChartData;
