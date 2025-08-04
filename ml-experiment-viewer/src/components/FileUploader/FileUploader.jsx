function FileUploader({ onFileSelect }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    onFileSelect(file);
  };
  return (
    <div>
      <h2>Download CSV file</h2>
      <input type="file" accept=".csv" onChange={handleFileChange}></input>
    </div>
  );
}

export default FileUploader;
