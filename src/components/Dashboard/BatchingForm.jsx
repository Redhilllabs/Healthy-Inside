import { useState, useEffect } from "react";
import { SearchBatchingImportAndexport } from "../../utils/ApiCall";
function BatchingForm({ date }) {
  const [data, setData] = useState([]);


  useEffect(()=>{
if(date){
  fetchData()
}
  },[date])

  const fetchData = async () => {
    try {

      let bodyContent = JSON.stringify({
        "Date":date
      });

const response = await SearchBatchingImportAndexport(bodyContent)

      
      if(response.status === 500){
alert("date not present ")
      }
      else{
        setData(response.data);
      }

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
