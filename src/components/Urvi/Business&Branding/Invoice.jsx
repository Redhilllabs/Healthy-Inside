import React, { useState } from 'react';
import logo from "../../../images/logo.png";
import {SearchCustomer} from '../../../utils/ApiCall';
import Message from "../../../utils/Message";

const Invoice = () => {
const [phoneNumber,setPhoneNumber] = useState(0);
const [showForm,setshowForm] = useState(false);
const [showTable,setshowTable] = useState(false);
const [quantity, setQuantity] = useState("");
const [price, setPrice] = useState("");
const [startDate, setStartDate] = useState("");
const [endDate, setEndDate] = useState("");
const [subscription, setSubscription] = useState("");
const [response, setResponse] = useState(null);
const [data,setdata] = useState({})

const handleSubmit = (event) => {
  event.preventDefault();
  setshowTable(true)
  // Your logic to handle the form submission here
};
const handelForm = async(e)=>{
  e.preventDefault();
  
  let bodyContent = JSON.stringify({
    "Number": phoneNumber
  });
  const res = await SearchCustomer(bodyContent)
  setdata(res.Item)
  console.log(res.Item)
  if (res.status === 404) {
    setResponse({ message: "Number Not Present", status: "error" });
    return;
  } else {
    setResponse({
      message: "Data  successfully Loaded",
      status: "success",
    });
    setshowForm(true);
  }
}
  return (
    <>
      <Message response={response} />
      <div className="formcontains">
      <form  class="form" id="recipe-designing" onSubmit={handelForm}>
      <div>
      <label>
        Phone Number:
        <input type="number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required />
      </label>
      </div>
     
      
        <input type="submit" value={"Check Customer"} />
      
      </form>
<br />
      {showForm?<div className="formcontains">
      <form  class="form" id="recipe-designing" onSubmit={handleSubmit}>
      <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={(event) => setQuantity(event.target.value)}
          required
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
          required
        />

        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          name="startDate"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
          required
        />

        <label htmlFor="endDate">End Date:</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
          required
        />

        <label htmlFor="subscription">Subscription:</label>
        <input
          id="subscription"
          name="subscription"
          value={subscription}
          onChange={(event) => setSubscription(event.target.value)}
          required
          type='text'
        />


        <button type="submit">Generate Invoice</button>
      </form>
      </div>:<></>}
      <br />
      <div id="Tabels_container">
  {showTable && (
    <div className="table-container" id="yourrecipetale">
      <div className="invoice-header">
        
        <h1 style={{display:"flex",justifyContent:'center',alignItems:'center'}}><img src={logo} style={{width:"80px", height:"80px"}} alt="Your Company Logo" />INVOICE</h1>
      </div>
      <table className="recipe_table">
        <thead>
          <tr>
            <th>Phone Number</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Subscription</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{phoneNumber}</td>
            <td>{data?.name}</td>
            <td>{quantity}</td>
            <td>{price}</td>
            <td>{startDate}</td>
            <td>{endDate}</td>
            <td>{subscription}</td>
          </tr>
        </tbody>

      </table>
    </div>
  )}
</div>


      </div>
    </>
  )
}

export default Invoice
