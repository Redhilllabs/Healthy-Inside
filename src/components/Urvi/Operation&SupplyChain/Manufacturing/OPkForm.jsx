import { useState, useEffect, useRef, memo } from "react";
import { SearchOPKImportAndexport } from "../../../../utils/ApiCall";
import Message from "../../../../utils/Message";
import ReactToPrint from "react-to-print";

const OPKForm = ({ date }) => {
  const [Seeddata, setData] = useState([]);
  const containerRef = useRef(null);
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let bodyContent = JSON.stringify({
          Date: date,
        });

        const response = await SearchOPKImportAndexport(bodyContent);
        console.log(response);
        if(response.status === 500) {
          setResponse({ message: "Date not present", status: "error" });
        } else {
          setData(response);
          setResponse({
            message: "Data loaded successfully",
            status: "success",
          });
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
      {date && (
        <div className="table-container" id="yourrecipetale">
          <div id="Tabels_container" ref={containerRef}>
            <table className="recipe_table" id="batchtable1" ref={table1Ref}>
            <thead>
  <tr>
    <th rowspan="3">Root Item</th>
    <th colspan="3">Import supply</th>
    <th colspan="3">Export supply</th>
    {/* <th>Headed For</th> */}
  </tr>
  <tr>
    {/* <th></th> */}
    <th>Particulars</th>
    <th>Quantity</th>
    <th>Metrics</th>
    <th>Particulars</th>
    <th>Quantity</th>
    <th>Metrics</th>
    {/* <th></th> */}
  </tr>
</thead>
              <tbody>
  {(Seeddata.data || [])
    .concat(Seeddata.ExtrabatchingUser || [])
    .map((item) => (
      <tr key={item.id}>
        <td>{item.rootItem}</td>
        <td colSpan="3">
          <table className="recipe_table">
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
        <td colSpan="3">
          <table className="recipe_table">
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
                  <th>Unit</th>
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
                      <td>{supply.unit}</td>
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
};

export default memo(OPKForm);
