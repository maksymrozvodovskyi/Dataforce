ML Experiment Viewer
This is a web application designed to visualize data from machine learning experiments stored in a CSV file. The app allows users to upload a file from their local machine, view a list of available experiments, and display their metrics in dynamic line charts.

Live Demo: [INSERT YOUR DEPLOYED APP LINK HERE]

Key Features:
File Upload: Enables users to upload a CSV file for analysis.

Data Parsing: Efficiently processes CSV data, extracting unique experiments and their metrics.

Experiment Selection: Displays a list of all experiments, allowing users to select one or more for comparison.

Dynamic Visualization: Automatically generates line charts for all tracked metrics, enabling a quick comparison of selected experiment results.

Technologies Used:
React: The core library for building the user interface.

Vite: A fast build tool for the project.

PapaParse: A library for easy and fast parsing of CSV files.

Chart.js / react-chartjs-2: A library for creating interactive and responsive charts.

CSS: For styling components and ensuring a pleasant user experience.

How to Run the Project Locally:
Clone the repository:
git clone [YOUR_REPO_URL]

Navigate to the project directory:
cd [FOLDER_NAME]

Install dependencies:
npm install

Run the application in development mode:
npm run dev

The application will be available at http://localhost:5173.
