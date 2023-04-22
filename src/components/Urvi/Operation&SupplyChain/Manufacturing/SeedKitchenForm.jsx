import  React,{ useState, useEffect, useRef, memo } from "react";
import { SearchSeedImportAndexport } from "../../../../utils/ApiCall";
import Message from "../../../../utils/Message";
import ReactToPrint from "react-to-print";
import load2 from '../../../../images/load2.gif'

const SeedKitchenForm = ({ date }) => {
  const [Seeddata, setData] = useState([]);
  const containerRef = useRef(null);
  const table1Ref = useRef(null);
  const table2Ref = useRef(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        let bodyContent = JSON.stringify({
          Date: date,
        });

        
        const response = await SearchSeedImportAndexport(bodyContent);

        if(response.status === 500) {
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
      <center>
      {isLoading ?<><img src={load2} alt="" srcset="" /></>:<></>}
      </center>
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
      <React.Fragment key={item.id}>
        {item.importSupply.map((supply, index) => (
          <tr key={index}>
            {index === 0 && <td rowSpan={item.importSupply.length}>{item.rootItem}</td>}
            <td> {supply.particulars} {(supply.particulars).replace(/\d+/g,(match) => (Math.floor(supply.quantity) === 3 ? "10" : "20"))}</td>
            <td>{supply.quantity}</td>
            <td>{supply.unit}</td>
            {index === 0 && item.exportSupply.length > 0 && <td rowSpan={item.importSupply.length}>{item.exportSupply[0].particulars}</td>}
            {index === 0 && item.exportSupply.length > 0 && <td rowSpan={item.importSupply.length}>{item.exportSupply[0].quantity}</td>}
            {index === 0 && item.exportSupply.length > 0 && <td rowSpan={item.importSupply.length}>{item.exportSupply[0].unit}</td>}
          </tr>
        ))}
        {item.exportSupply.slice(1).map((supply, index) => (
          <tr key={index}>
            {index === 0 && item.importSupply.length === 0 && <td rowSpan={item.exportSupply.length}>{item.rootItem}</td>}
            {index === 0 && item.importSupply.length > 0 && <td rowSpan={item.importSupply.length}></td>}
            {index === 0 && <td>{supply.particulars}</td>}
            <td>{supply.quantity}</td>
            <td>{supply.unit}</td>
          </tr>
        ))}
      </React.Fragment>
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

export default memo(SeedKitchenForm);
