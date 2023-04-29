import React from 'react'

const Invoice = () => {
  const invoiceStyle = {
    border: '1px solid black',
    padding: '10px',
    borderRadius: '5px',
    width: '400px',
    margin: '20px auto'
  }

  const itemStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '5px'
  }

  return (
    <div style={invoiceStyle}>
      <h2>Invoice</h2>
      <p>Date: 29th April, 2023</p>
      <div style={itemStyle}>
        <span>Item 1</span>
        <span>$10.00</span>
      </div>
      <div style={itemStyle}>
        <span>Item 2</span>
        <span>$20.00</span>
      </div>
      <div style={itemStyle}>
        <span>Item 3</span>
        <span>$15.00</span>
      </div>
      <hr />
      <div style={itemStyle}>
        <span>Total</span>
        <span>$45.00</span>
      </div>
    </div>
  )
}

export default Invoice
