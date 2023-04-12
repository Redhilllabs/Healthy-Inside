import { useState, useEffect, useRef, memo } from "react";
import { SearchBatchingImportAndexport } from "../../../../utils/ApiCall";
import Message from "../../../../utils/Message";
import load2 from '../../../../images/load2.gif'
import ReactToPrint from "react-to-print";


function BatchingForm({ date, setSelectedDate }) {
  const [Seeddata, setData] = useState([]);
  const containerRef = useRef(null);
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        let bodyContent = JSON.stringify({
          Date: date,
        });

        const response = await SearchBatchingImportAndexport(bodyContent);

        if (response.status === 500) {
          setResponse({ message: "Date not present", status: "error" });
          setIsLoading(false)
        } else {
          setData(response);
          setResponse({
            message: "Data loaded successfully",
            status: "success",
          });
          setIsLoading(false)
        }
      } catch (error) {
        setResponse({ message: "Error loading data", status: "error" });
      }
    };

    if (date) {
      fetchData();
    }
  }, [date]);

  return (
    <div>
      <Message response={response} />
      <br />
      <br />
      <center>
      {isLoading ?<><img src={load2} alt="" srcset="" /></>:<></>}
      </center>
     

      {date && (
        <div className="table-container" id="yourrecipetale">
          <div id="Tabels_container" ref={containerRef}>
            <table className="recipe_table" id="batchtable1" ref={table1Ref}>
              <thead>
                <tr>
                  <th>Root Item</th>
                  <th>Import supply
                  <thead>
              <tr>
                <th>Particulars</th>
                <th>Quantity</th>
              </tr>
            </thead></th>
                  <th>Export supply
                  <thead>
              <tr>
                <th>Particulars</th>
                <th>Quantity</th>
              </tr>
            </thead></th>
                  {/* <th>Headed For</th> */}
                </tr>
              </thead>
              <tbody>
  {(Seeddata.data || [])
    .concat(Seeddata.ExtrabatchingUser || [])
    .map((item) => (
      <tr key={item.id}>
        <td>{item.rootItem}</td>
        <td>
          <table className="recipe_table">
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
          <table className="recipe_table">
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
        {/* <td>{item.headedFor}</td> */}
      </tr>
    ))}
</tbody>

            </table>

            <div id="batchtable3">
              {" "}
              
            </div>

            <table className="recipe_table" id="batchtable2" ref={table2Ref}>
              <thead>
                <tr>
                  <th>Particulars</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {(Seeddata.data || [])
                  .concat(Seeddata.ExtrabatchingUser || [])
                  .reduce((accumulator, item) => {
                    item.importSupply.forEach((supply) => {
                      const index = accumulator.findIndex(
                        (obj) => obj.particulars === supply.particulars
                      );
                      if (index !== -1) {
                        accumulator[index].quantity += supply.quantity;
                      } else {
                        accumulator.push(supply);
                      }
                    });
                    return accumulator;
                  }, [])
                  .map((supply, index) => (
                    <tr key={index}>
                      <td>{supply.particulars}</td>
                      <td>{supply.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <br />
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
