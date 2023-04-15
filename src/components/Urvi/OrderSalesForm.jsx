import React, { useState } from "react";
import {SearchOrder } from "../../utils/ApiCall";
import Message from "../../utils/Message";

const OrderSalesForm = () => {
  const [startDate, setStartDate] = useState("");
  const [data, setdata] = useState("");
  const [Table, setShowTable] = useState(false);
  const [response, setResponse] = useState(null);
  const [rows,setRows] = useState("");

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
    setShowTable(false)
  };
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(startDate);
    let bodyContent = JSON.stringify({
      Date: startDate,
    });
  
    const response = await SearchOrder(bodyContent);
    console.log(response)
    if (response.status === 404) {
      setResponse({ message: "Date is Not Present", status: "error" });
      return;
    } else {
      setResponse({
        message: "Data loaded successfully",
        status: "success",
      });
      setdata(response.Item);
      setShowTable(true);
      setRows(rows);
    }
  };
  

  return (
    <>
    <Message response={response} />
      <div className="formcontains">
        <h1>Orders</h1>
        <form
          action=""
          className="form"
          name="inventory-purchase-log"
          id="inventory-purchase-log"
          method="post"
          onSubmit={handleSubmit}
        >
          <div className="option_container">
            <label htmlFor="start-date-input">Select Date:</label>
            <input
              type="date"
              id="start-date-input"
              value={startDate}
              onChange={handleStartDateChange}
              required
            />
          </div>

          <div className="button-container">
            <input
              id="addmoreingredients"
              value={"View Orders"}
              type="submit"
              name="submit"
            ></input>
          </div>
        </form>
      </div>

      {Table && (
  <div className="table-container" id="yourrecipetale">
    <h2>Your Orders</h2>
    <br />
    <table className="recipe_table">
      <thead>
        <tr>
          <th>User ID</th>
          <th>Date Added</th>
          <th>Food ID</th>
          <th>Food Name</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
      {data?.Orders && Object.keys(data.Orders).map((userId) => {
  const userOrders = data.Orders[userId];
  return userOrders.map((order, index) => (
    <tr key={`${userId}-${index}`}>
      {index === 0 && <td rowSpan={userOrders.length}>{userId}</td>}
      <td>{order.dateAdded}</td>
      <td>{order.foodID}</td>
      <td>{order.foodName}</td>
      <td>{order.price}</td>
      <td>{order.qty}</td>
    </tr>
  ));
})}


      </tbody>
    </table>
  </div>
)}


    </>
  );
};

export default OrderSalesForm;
