import React, { useState } from "react";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import "./account.css";

const Account = () => {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState([
    {
      id: 1,
      date: "2022-02-01",
      items: [
        { id: 1, name: "Item 1", price: 10.0 },
        { id: 2, name: "Item 2", price: 20.0 },
      ],
    },
    {
      id: 2,
      date: "2022-02-03",
      items: [
        { id: 3, name: "Item 3", price: 30.0 },
        { id: 4, name: "Item 4", price: 40.0 },
      ],
    },
  ]);
  const [address, setadress] = useState(null);

  const Addaddress = () => {};

  return (
    <div className="Accountcontainer">
      <div className="account">
        <h1>Account</h1>
        <div className="account-info">
          <div className="account-section">
            <h2>Name</h2>
            <p>{user.name}</p>
          </div>
          <div className="account-section">
            <h2>Email</h2>
            <p>{user.email}</p>
          </div>
          <div className="account-section">
            <h2>Selling Price</h2>
            <h5>{user.sellingPrice}</h5>
          </div>
          <div className="account-section">
            <h2>Team</h2>
            <p>{user.team}</p>
          </div>
          <div className="account-section">
            <h2>Address</h2>
            <p>
              {user?.Address ? (
                <div
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    borderRadius: "5px",
                  }}
                >
                  <p style={{ marginBottom: "5px" }}>
                    {user.Address.addressLine1}{" "}
                  </p>
                  <p style={{ marginBottom: "5px" }}>
                    {user.Address.addressLine2}
                  </p>
                  <p style={{ marginBottom: "5px" }}>
                    {user.Address.city} {user.Address.state} {user.Address.zip}
                  </p>
                </div>
              ) : (
                <button onClick={Addaddress()}> Add Address </button>
              )}
            </p>
          </div>
          <div className="account-section">
            <h2>My Orders</h2>
            <div className="orders">
              {orders.map((order) => (
                <div key={order.id} className="order">
                  <div className="order-header">
                    <div>Order #{order.id}</div>
                    <div>{order.date}</div>
                  </div>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item">
                        <div>{item.name}</div>
                        <div>{item.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
