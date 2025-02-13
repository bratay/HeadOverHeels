import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MainPage.css';

const formatMessageTime = (timestamp) => {
  const messageDate = new Date(timestamp);
  const now = new Date();
  
  const isToday = messageDate.toDateString() === now.toDateString();
  const isThisYear = messageDate.getFullYear() === now.getFullYear();
  
  if (isToday) {
    return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (isThisYear) {
    return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric' }) + 
           ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else {
    return messageDate.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' }) +
           ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
};

const MessageDetailPage = () => {
  const { matchedUid } = useParams();
  const userUid = sessionStorage.getItem('userUID');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  console.log('User UID:', userUid);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        console.log('Fetching messages for user:', userUid, 'and matched user:', matchedUid);
        const response = await fetch(`http://localhost:3001/getMessages?uid=${userUid}&receiverUid=${matchedUid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Network response was not ok:', response.status, errorText);
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log('Messages:', result);
        setMessages(result);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [userUid, matchedUid]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    console.log('uid:', userUid, 'receiverUid:', matchedUid, 'message:', newMessage);

    try {
      const response = await fetch('http://localhost:3001/sendMessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: userUid, 
          receiverUid: matchedUid,
          message: newMessage,
          read: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server error:', errorText); 
        throw new Error('Failed to send message');
      }

      // Refresh messages after sending
      const fetchMessagesResponse = await fetch(`http://localhost:3001/getMessages?uid=${userUid}&receiverUid=${matchedUid}`);
      const result = await fetchMessagesResponse.json();
      setMessages(result);
      setNewMessage(''); // Clear input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="message-detail-page">
      <div className="content">
        <h2>{matchedUid}</h2>
        <div className="messages-container">
          {messages.map((message) => (
            <div 
              key={message.mid} 
              className={`message-item ${message.uid == userUid ? 'message-sent' : 'message-received'}`}
            >
              <div className="message-content">
                <span className="message-text">{message.message}</span>
              </div>
              <div className="message-timestamp">
                {formatMessageTime(message.timestamp)}
              </div>
            </div>
          ))}
        </div>
        <div className="message-input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default MessageDetailPage;
