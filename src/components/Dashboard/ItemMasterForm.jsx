import React, { useState, useEffect } from "react";
import { getitemlist } from "../../utils/ApiCall";

const ItemMasterForm = () => {
  const [ItemName, setItemName] = useState("");
  const [table, settable] = useState(false);
  const [ AlltableItem ,setAlltableItem] = useState(false);
  const [data, setData] = useState([]);


  const handleItemNameChange = (e) => {
    setItemName(e.target.value);
  };

  const handeladdmore = () => {
    if (ItemName) {
        settable(true);
        setAlltableItem(false)
    } else {
      alert("choose Item Name");
    }
  };
  const handelAllItems = ()=>{
    setAlltableItem(true)
    settable(false)
    setItemName("");
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await getitemlist();
      setData(response);
    //   console.log(response);
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="formcontains">
        <form class="form" id="recipe-designing">
          <div>
            <label for="Receipe Name">Item Name</label>
            <select
              name=""
              id=""
              value={ItemName}
              onChange={handleItemNameChange}
            >
              <option value="">Select Option</option>
              {data &&
                data.data &&
                data.data.map((item, index) => (
                  <option key={index} value={item.ItemName}>
                    {item.ItemName}
                  </option>
                ))}
            </select>
          </div>

          <div id="addmoreingredients" onClick={handeladdmore}>
            View Profile
          </div>
          {"  "}
          <div id="addmoreingredients" onClick={handelAllItems}>
           All Items
          </div>
        </form>
      </div>

      {table && (
        <div className="table-container" id="yourrecipetale">
          {/* <h2>Item Master</h2>
          <br /> */}
          <table className="recipe_table">
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Constituent Recipes</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item, index) => (
          <React.Fragment key={index}>
          {item.ItemName === ItemName && (
            <>
          

            {item.ItemList.map((subItem, subIndex) => (
              <tr key={subIndex}>
              {subIndex === 0 && (
                  <td rowSpan={item.ItemList.length}>{item.ItemName}</td>
                )}
                <td>{subItem.Constituent_Recipe}</td>
                <td>{subItem.unit}</td>
                {subIndex === 0 && (
                  <td rowSpan={item.ItemList.length}></td>
                )}
              </tr>
            ))}
            
            </> )}

          </React.Fragment>
        ))}
      </tbody>
    </table>

          <div id="tabel_controllers">
            <div id="recipebutton_close" onClick={() => settable(false)}>
              cancel
            </div>
            <div
              id="recipebutton_save"
              onClick={(e) => alert("Not Sving To Db")}
            >
              Submit
            </div>
          </div>
        </div>
      )}

      {AlltableItem && (
        <div className="table-container" id="yourrecipetale">
          <h2>Item Master</h2>
          <br />
          <table className="recipe_table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Constituent Recipes</th>
          <th>Unit</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.data.map((item, index) => (
          <React.Fragment key={index}>
            
            {item.ItemList.map((subItem, subIndex) => (
              <tr key={subIndex}>
              {subIndex === 0 && (
                  <td rowSpan={item.ItemList.length}>{item.ItemName}</td>
                )}
                <td>{subItem.Constituent_Recipe}</td>
                <td>{subItem.unit}</td>
                {subIndex === 0 && (
                  <td rowSpan={item.ItemList.length}></td>
                )}
              </tr>
            ))}
          </React.Fragment>
        ))}
      </tbody>
    </table>

          <div id="tabel_controllers">
            <div id="recipebutton_close" onClick={() => setAlltableItem(false)}>
              cancel
            </div>
            <div
              id="recipebutton_save"
              onClick={(e) => alert("Not Sving To Db")}
            >
              Submit
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default ItemMasterForm;
