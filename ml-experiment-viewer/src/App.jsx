import { useState, useMemo } from "react";
import Papa from "papaparse";
import FileUploader from "./components/FileUploader/FileUploader";
import ExperimentList from "./components/ExperimentList/ExperimentList";
import ChartComponent from "./components/ChartComponent/ChartComponent";
import "./App.css";

const colors = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 206, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(201, 203, 207)",
];

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExperiments, setSelectedExperiments] = useState([]);

  const uniqueExperiments = useMemo(() => {
    if (!data) return [];
    const experimentIds = data.map((row) => row.experiment_id);
    return [...new Set(experimentIds)];
  }, [data]);

  const chartData = useMemo(() => {
    if (!data || selectedExperiments.length === 0) {
      return { datasets: [] };
    }

    const uniqueMetricNames = [...new Set(data.map((row) => row.metric_name))];
    const datasets = [];
    let colorIndex = 0;

    selectedExperiments.forEach((expId) => {
      uniqueMetricNames.forEach((metricName) => {
        const experimentMetricData = data.filter(
          (row) => row.experiment_id === expId && row.metric_name === metricName
        );

        datasets.push({
          label: `${expId} - ${metricName}`,
          data: experimentMetricData.map((row) => ({
            x: row.step,
            y: row.value,
          })),
          borderColor: colors[colorIndex % colors.length],
          backgroundColor: colors[colorIndex % colors.length] + "80",
          tension: 0.1,
          pointRadius: 0,
        });
        colorIndex++;
      });
    });

    return { datasets };
  }, [data, selectedExperiments]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    scales: {
      x: {
        title: { display: true, text: "Step" },
        type: "linear",
      },
      y: {
        title: { display: true, text: "Metric Value" },
      },
    },
    plugins: {
      decimation: {
        enabled: true,
        algorithm: "min-max",
        samples: 1000,
      },
      legend: { position: "top" },
      title: { display: true, text: "Experimental metrics" },
    },
  };

  const handleFileSelect = (file) => {
    if (file) {
      setLoading(true);
      setError(null);
      setData(null);
      setSelectedExperiments([]);

      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          const parsedData = results.data.filter((row) =>
            Object.values(row).some((value) => value !== null && value !== "")
          );
          setData(parsedData);
          setLoading(false);
        },
        error: (err) => {
          setError("An error occurred while processing the file.");
          setLoading(false);
        },
      });
    }
  };

  const handleExperimentSelect = (experimentName) => {
    setSelectedExperiments((prevSelected) => {
      if (prevSelected.includes(experimentName)) {
        return prevSelected.filter((name) => name !== experimentName);
      } else {
        return [...prevSelected, experimentName];
      }
    });
  };

  return (
    <div className="App">
      <h1>Task Frontend</h1>
      <FileUploader onFileSelect={handleFileSelect} />
      {loading && <p>Loading and processing...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {uniqueExperiments.length > 0 && (
        <ExperimentList
          experiments={uniqueExperiments}
          selectedExperiments={selectedExperiments}
          onSelect={handleExperimentSelect}
        />
      )}

      {selectedExperiments.length > 0 && (
        <ChartComponent chartData={chartData} chartOptions={chartOptions} />
      )}
    </div>
  );
}

export default App;
