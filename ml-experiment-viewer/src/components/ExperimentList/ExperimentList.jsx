import React from "react";

function ExperimentList({ experiments, selectedExperiments, onSelect }) {
  if (!experiments || experiments.length === 0) {
    return <p>There are no experiments to display.</p>;
  }
  return (
    <div className="experiments-list">
      <h3>Select experiments to compare</h3>
      <ul>
        {experiments.map((experiment) => (
          <li key={experiment}>
            <label>
              <input
                type="checkbox"
                checked={selectedExperiments.includes(experiment)}
                onChange={() => onSelect(experiment)}
              />
              {experiment}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default ExperimentList;
