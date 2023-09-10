import { ChartData } from 'chart.js';
import { Bar } from 'react-chartjs-2';

function App() {
  const data: ChartData<'bar'> = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
      <h1 className="text-red-400">react start</h1>

      <div className=" max-w-[1024px]">
        <Bar data={data} />
      </div>
    </>
  );
}

export default App;
