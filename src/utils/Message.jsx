import React, { useState, useEffect } from 'react';
import "./Message.css";

const Message = ({ response }) => {
    const [showMessage, setShowMessage] = useState(false);
    const [isError, setIsError] = useState(false);
    const [message, setMessage] = useState('');
    useEffect(() => {
        if (response && response.message && response.status) {
          setShowMessage(true);
          setMessage(response.message);
          setIsError(response.status !== 'success');
      
          setTimeout(() => {
            const messageElement = document.querySelector(".message");
            messageElement.classList.add("show");
          }, 0);
      
          // Hide the message after 5 seconds
          setTimeout(() => {
            handleClose();
          }, 5000);
        }
      }, [response]);
      

    
      function handleClose() {
        setShowMessage(false);
      }

  return (
    <>
      {showMessage && (
        <div
          className={`message ${isError ? 'error' : 'success'}`}
          onClick={handleClose}
        >
          {message}
          <button className="close-button" onClick={handleClose}>
            X
          </button>
        </div>
      )}
    </>
  )
}

export default Message ;