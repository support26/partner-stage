import React, { useEffect, useState, useRef } from "react";
import { read, write } from "./test";
import "./styles.css";

const ChatContainer = (props) => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const selectedId = props.ticketId;
  const selectedMail = props.mail;
  const timestamp = new Date().toLocaleString();
  const adminEmail = localStorage.getItem('user_email');
  const userName = localStorage.getItem('employee_name');
  const chatMessageRef = useRef(null);

  useEffect(() => {
    read((data) => {
      if (data && data.Tickets && data.Tickets[selectedId] && data.Tickets[selectedId].Chat) {
        const chatMessages = Object.values(data.Tickets[selectedId].Chat);
        setMessages(chatMessages);
      }
    });
  }, []);


  const scrollToBottom = () =>{
    chatMessageRef.current.scrollTop = chatMessageRef.current.scrollHeight;
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const handleSendMessage = () => {
    if (!inputText.trim()) {
      return;
    }
    write(inputText, selectedId, adminEmail, userName);
    setInputText('');
    scrollToBottom();
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    //const date = new Date(timestamp);
    return date.toLocaleString(undefined);
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
      e.preventDefault(); 
    }
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <div className="chat-container" ref={chatMessageRef}>
        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.messageId}
              className={`message ${message.senderNumber !== adminEmail ? "user-message" : "admin-message"}`}
            >
              {/*{message.senderNumber === "support24@anaxee.com" ? (
                <img
                  className="bot-photo"
                  src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                  alt="Bot Photo"
                />
              ) : (
                <img
                  className="user-photo"
                  src="https://static.vecteezy.com/system/resources/previews/000/439/863/original/vector-users-icon.jpg"
                  alt="User Photo"
                />
              )}*/}
              <div className="message-content">
                <div style={{ backgroundColor: 'white', padding: "5px", borderRadius: '6px', marginTop: '8px' }}>
                  <p style={{ fontSize: '12px', color: "gray", marginBottom: "2px" }}>{message.senderNumber !== adminEmail ? message.senderName : ""}</p>
                  <p style={{ marginLeft: "5px", fontSize:"18px" }}>{message.message}</p>
                </div>
                <p style={{ fontSize: '12px', color: "gray", marginTop: "2px" }}>{formatDate(message.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="input-area">
        <input type="text" placeholder="Type your message" value={inputText} onChange={(e) => setInputText(e.target.value)} required onKeyPress={handleKeyPress}/>
        <a onClick={handleSendMessage}>Send</a>
      </div>
    </div>
  );
};

export default ChatContainer;
