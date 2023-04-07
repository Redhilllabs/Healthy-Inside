import { useState, useEffect, useRef ,memo} from "react";
import { SearchBatchingImportAndexport } from "../../utils/ApiCall";
import ReactToPrint from 'react-to-print';
import { isEqual } from "lodash";

function BatchingForm ({ date ,setSelectedDate}) {
  const [Seeddata, setData] = useState([]);
  const containerRef = useRef(null);
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let bodyContent = JSON.stringify({
          "Date": date
        });
        
        const response = await SearchBatchingImportAndexport(bodyContent);
        
        if (response.status === 500) {
          alert("date not present ");
        } else {
          setData(response);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (date) {
      fetchData();
    }
  }, [date]);
  

  return (
    <div>
    <br />
      {date && (
        <div className="table-container"  id='yourrecipetale'>
        <div id="Tabels_container" ref={containerRef} >
    
        <table className="recipe_table"  id="batchtable1" ref={table1Ref}>
  <thead>
    <tr>
      <th>Root Item</th>
      <th>Import supply</th>
      <th>Export supply</th>
      <th>Headed For</th>
    </tr>
  </thead>
  <tbody>
  {(Seeddata.data || []).concat(Seeddata.ExtrabatchingUser || []).map((item) => (
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
                  <td>{supply.particulars}</td>
                  <td>{supply.quantity}</td>
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
                  <td>{supply.particulars}</td>
                  <td>{supply.quantity}</td>
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

<table className="recipe_table" id="batchtable2" ref={table2Ref}>
  <thead>
    <tr>
      <th>Particulars</th>
      <th>Quantity</th>
    </tr>
  </thead>
  <tbody>
    {(Seeddata.data || []).concat(Seeddata.ExtrabatchingUser || []).reduce((accumulator, item) => {
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
      </tr>
    ))}
  </tbody>
</table>



</div>
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
}

export default memo(BatchingForm);
