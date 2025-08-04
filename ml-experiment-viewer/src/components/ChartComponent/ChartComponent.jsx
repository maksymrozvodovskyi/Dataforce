import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ chartData, chartOptions }) => {
  if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
    return <p>Please select the experiments to see the graph.</p>;
  }

  return (
    <div className="chart-container" style={{ marginTop: "20px" }}>
      <Line
        data={chartData}
        options={chartOptions}
        height={1000}
        width={1500}
      />
    </div>
  );
};

export default ChartComponent;
