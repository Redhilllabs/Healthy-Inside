import React, { useState, useEffect } from 'react';

const SeedKitchenForm = (props) => {
  const [importData, setImportData] = useState([]);
  const [exportData, setExportData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const importResponse = await fetch(`https://example.com/api/import?date=${props.date}`);
      const importJson = await importResponse.json();
      setImportData(importJson.data);

      const exportResponse = await fetch(`https://example.com/api/export?date=${props.date}`);
      const exportJson = await exportResponse.json();
      setExportData(exportJson.data);
    };

    fetchData();
  }, [props.date]);

  return (
    <div>
      <div className="table-container">
        <h2>Seed Kitchen</h2>
        <br />
        <table className="recipe_table">
          <thead>
            <tr>
              <th>Import</th>
              <th>Export</th>
            </tr>
          </thead>
          <tbody>
            {importData.map((row, index) => (
              <tr key={`import-row-${index}`}>
                <td>{row.value1}</td>
                <td>{row.value2}</td>
              </tr>
            ))}
            {exportData.map((row, index) => (
              <tr key={`export-row-${index}`}>
                <td>{row.value1}</td>
                <td>{row.value2}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div id="tabel_controllers">
          <div id="recipebutton_close" onClick={() => props.setShowTable(false)}>
            cancel
          </div>
          <div id="recipebutton_save" onClick={() => alert("not saving into database")}>Submit</div>
        </div>
      </div>
    </div>
  );
};

export default SeedKitchenForm;
