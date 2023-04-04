import { useState, useEffect } from "react";

function BatchingForm({ date }) {
  const [data, setData] = useState([{
    id: 1,
    rootItem: "Jau Pulao",
    importSupply: [
      { particulars: "Broken Wheat (दलिया/Dalia)", quantity: 400 },
      { particulars: "Common Salt (सादा नमक/Saada Namak)", quantity: 7 },
      { particulars: "Coriander Powder (धनिया पाउडर/Dhaniya Powder)", quantity: 20 },
      { particulars: "Black Pepper Powder (काली मिर्च पाउडर/Kali Mirch Powder)", quantity: 2 },
      { particulars: "Turmeric Powder (हल्दी पाउडर/Haldi Powder)", quantity: 6.666666667 },
      { particulars: "Cumin Seeds (जीरा/Jeera)", quantity: 10 }
    ],
    exportSupply: [{ particulars: "JP 10 U (M)", quantity: 1 }],
    headedFor: "Master"
  }
]);

  useEffect(() => {
    if (date) {
      fetchData();
    }
  }, [date]);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://example.com/api/batching?date=${date}`);
      const data = await response.json();
      setData(    {
        id: 1,
        rootItem: "Jau Pulao",
        importSupply: [
          { particulars: "Broken Wheat (दलिया/Dalia)", quantity: 400 },
          { particulars: "Common Salt (सादा नमक/Saada Namak)", quantity: 7 },
          { particulars: "Coriander Powder (धनिया पाउडर/Dhaniya Powder)", quantity: 20 },
          { particulars: "Black Pepper Powder (काली मिर्च पाउडर/Kali Mirch Powder)", quantity: 2 },
          { particulars: "Turmeric Powder (हल्दी पाउडर/Haldi Powder)", quantity: 6.666666667 },
          { particulars: "Cumin Seeds (जीरा/Jeera)", quantity: 10 }
        ],
        exportSupply: [],
        headedFor: "JP 10 U (M)	1	Master"
      }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Batching Form</h2>

      {date && (
        <div className="table-container">
  <h2> Kitchen</h2>
  <br />
  <table className="recipe_table">
    <thead>
      <tr>
        <th>Root Item</th>
        <th>Import supply</th>
        <th>Export supply</th>
        <th>Headed For</th>
      </tr>
    </thead>
    <tbody>
      {data.map((item) => (
        <tr key={item.id}>
          <td>{item.rootItem}</td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {item.importSupply.map((supply, index) => (
                  <tr key={index}>
                      <>
                        <td>{supply.particulars}</td>
                        <td>{supply.quantity}</td>
                      </>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {item.exportSupply.map((supply, index) => (
                  <tr key={index}>
                      <>
                        <td>{supply.particulars}</td>
                        <td>{supply.quantity}</td>
                      </>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
          <td>{item.headedFor}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      )}
    </div>
  );
}

export default BatchingForm;
