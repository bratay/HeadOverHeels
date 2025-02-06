import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MainPage.css';

const MessageDetailPage = () => {
  const { matchedUid } = useParams();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getMessages?uid=12&receiverUid=${matchedUid}`, {
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
        setMessages(result);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [matchedUid]);

  return (
    <div className="message-detail-page">
      <div className="content">
        <h2>Messages with {matchedUid}</h2>
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <strong>{message.senderUid === '12' ? 'You' : 'Them'}:</strong> {message.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessageDetailPage;
