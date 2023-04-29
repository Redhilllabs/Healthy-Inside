import React, { useState } from 'react'
import load2 from "../../../images/load2.gif";
import {AddToCustomer} from "../../../utils/ApiCall"
import Message from "../../../utils/Message";
const Customer = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [specificInstruction, setSpecificInstruction] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [showTable, setShowTable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);

  const handleTable = (event) => {
    event.preventDefault()
    console.log(`Name: ${name}, Email: ${email}, Specific Instruction: ${specificInstruction}, Phone Number: ${phoneNumber}, Address: ${address}`)
    console.log(typeof(phoneNumber))
    setShowTable(true)  ;
}
const handlesubmit = async ()=>{
    console.log("came here")
    let bodyContent = JSON.stringify({
        "phoneNumber":Number(phoneNumber),
        "name":name ,
        "email":email ,
        "address":address ,
        "instruction":specificInstruction
      });
      const res = await AddToCustomer(bodyContent)
      if (res.status === 404) {
        setResponse({ message: "Customer already Exists", status: "error" });
        return;
      } else {
        setResponse({
          message: "Data  successfully Saved",
          status: "success",
        });
        setEmail('')
    setName('')
    setSpecificInstruction('')
    setPhoneNumber('')
    setAddress('')
    setShowTable(false)
      }
}
const handlecancel = async () => {
    setEmail('')
    setName('')
    setSpecificInstruction('')
    setPhoneNumber('')
    setAddress('')
    setShowTable(false)

}

  return (
    <>
    <Message response={response} />
        <div className="formcontains">
        <form  class="form" id="recipe-designing" onSubmit={handleTable}>
      <label>
        Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
      </label>
      <br />
      <label>
        Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)}  required/>
      </label>
      <br />
      <label>
        Specific Instruction:
        <textarea value={specificInstruction} onChange={(event) => setSpecificInstruction(event.target.value)} required />
      </label>
      <br />
      <label>
        Phone Number:
        <input type="number" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} required />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={(event) => setAddress(event.target.value)} required />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
        </div>
        <br />
      <div id="Tabels_container">
        {showTable && (
          <div className="table-container" id="yourrecipetale">
            
            <table className="recipe_table">              
              <thead>
              <tr>
              <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Instructions</th>
              </tr>
                
              </thead>
              <tbody>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phoneNumber}</td>
                <td>{address}</td>
                <td>{specificInstruction}</td>
              </tbody>
            </table>
            <div>
            <div id="tabel_controllers">
          <div id="recipebutton_close" onClick={handlecancel}>
            cancel
          </div>
          <div id="recipebutton_save" onClick={isLoading ? null : handlesubmit}>
            {isLoading ? (
              <>
                <button disabled>Submit</button>
                <img
                  src={load2}
                  alt=""
                  srcset=""
                  style={{ width: "30px", height: "30px" }}
                />
              </>
            ) : (
              <>Submit</>
            )}
          </div>
        </div>
            </div>
          </div>
        )}

        {/* {MaterialListTable && (
          <div className="table-container" id="showtablermi">
            <h2>Item Profile</h2>
            <br />
            <table className="recipe_table">
              <thead>
                <tr>Name</tr>
                <tr>Email</tr>
                <tr>Phone Number</tr>
                <tr>Address</tr>
                <tr>Instructions</tr>
              </thead>
              <tbody>
                <tr></tr>
              </tbody>
            </table>
          </div>
        )} */}
      </div>
    </>
    
  )
}

export default Customer
