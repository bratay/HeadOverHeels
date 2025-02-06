import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MessagesPage = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3001/getMatches', {
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
        setMatches(result);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, []);

  const handleMatchClick = (matchedUid) => {
    navigate(`/messages/${matchedUid}`);
  };

  return (
    <div className="messages-page">
      <div className="content">
        <h2>Your Matches</h2>
        <ul>
          {matches.map((match) => (
            <li key={match.matchedUid} onClick={() => handleMatchClick(match.matchedUid)}>
              {match.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MessagesPage;