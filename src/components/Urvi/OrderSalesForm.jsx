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
    let bodyContent = JSON.stringify({
      Date: startDate,
    });
  
    const response = await SearchOrder(bodyContent);
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
          <th>Address</th>
          <th>Subscribed On</th>
          <th>Valid From</th>
          <th>Valid Till</th>
          <th>GrandTotal</th>
          <th>Quantity</th>
          <th>Contact</th>
        </tr>
      </thead>
      <tbody>
      {data?.Orders && Object.keys(data.Orders).map((userId) => {
  const userOrders = data.Orders[userId];
  return userOrders.map((order, index) => (
    <tr key={`${userId}-${index}`}>
      {index === 0 && <td rowSpan={userOrders.length}>{userId}</td>}
      <td>
  {order?.Address?.addressLine1}
  {order?.Address?.addressLine2 && `, ${order.Address.addressLine2}`}
  {order?.Address?.city && `, ${order.Address.city}`}
  {order?.Address?.state && `, ${order.Address.state}`}
  {order?.Address?.zip && `, ${order.Address.zip}`}
</td>

      <td>{order?.SubcribedOn}</td>
      
      <td>{order?.ValidTill}</td>
      <td>{order?.ValidFrom}</td>
      <td>{order?.GrandTotal}</td>
      <td>{order?.quantity}</td>
      <td>{order?.contact}</td>
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
