import { useState, useEffect, useRef } from "react";
import {  SearchSeedImportAndexport} from "../../utils/ApiCall";
import ReactToPrint from 'react-to-print';

const SeedKitchenForm = ({ date }) => {
  const [data, setData] = useState([]);
  const containerRef = useRef(null);
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  
  useEffect(()=>{
if(date){
  fetchData()
}
  },[date])

  const fetchData = async () => {
    try {

      let bodyContent = JSON.stringify({
        "Date": date
      });

const response = await SearchSeedImportAndexport(bodyContent)
console.log(response)
      
      if(response.status === 500){
alert("date not present ")
      }
      else{
      setData(response);
    }



    } catch (error) {
      console.log(error);
    }
  };

  return (
<div>
<br />

      {date && (
        <div id="Tabels_container" ref={containerRef}>
        <table className="recipe_table"  ref={table1Ref}>
  <thead>
    <tr>
      <th>Root Item</th>
      <th>Import supply</th>
      <th>Export supply</th>
      <th>Headed For</th>
    </tr>
  </thead>
  <tbody>
  {(data.data || []).concat(data.ExtrabatchingUser || []).map((item) => (
      <tr key={item.id}>
        <td>{item.rootItem}</td>
        <td>
          <table>
            <thead>
              <tr>
                <th>Particulars</th>
                <th>Quantity</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
              {item.importSupply.map((supply, index) => (
                <tr key={index}>
                  <td>{supply.particulars}</td>
                  <td>{supply.quantity}</td>
                  <td>{supply.unit}</td>
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
                <th>Unit</th>

              </tr>
            </thead>
            <tbody>
              {item.exportSupply.map((supply, index) => (
                <tr key={index}>
                  <td>{supply.particulars}</td>
                  <td>{supply.quantity}</td>
                  <td>{supply.unit}</td>
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
<hr />
<table className="recipe_table" ref={table2Ref}>
  <thead>
    <tr>
      <th>Particulars</th>
      <th>Quantity</th>
      <th>Unit</th>
    </tr>
  </thead>
  <tbody>
    {(data.data || []).concat(data.ExtrabatchingUser || []).reduce((accumulator, item) => {
      item.importSupply.forEach((supply) => {
        const index = accumulator.findIndex((obj) => obj.particulars === supply.particulars);
        if (index !== -1) {
          accumulator[index].quantity += supply.quantity;
        } else {
          accumulator.push(supply);
        }
      });
      return accumulator;
    }, []).map((supply, index) => (
      <tr key={index}>
        <td>{supply.particulars}</td>
        <td>{supply.quantity}</td>
        <td>{supply.unit}</td>
      </tr>
    ))}
  </tbody>
</table>

<div>
<ReactToPrint
        trigger={() => <button>Print</button>}
        content={() => containerRef.current}
      />
</div>
</div>

      )}
    </div>
  );
};

export default SeedKitchenForm;
