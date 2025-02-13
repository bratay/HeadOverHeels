import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';

const MessagesPage = () => {
  const [matches, setMatches] = useState([]);
  const navigate = useNavigate();
  const userUid = sessionStorage.getItem('userUID');

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`http://localhost:3001/getMatches?uid=${userUid}`, {
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
        console.log('Matches:', result);
        setMatches(result);
      } catch (error) {
        console.error('Error fetching matches:', error);
      }
    };

    fetchMatches();
  }, [userUid]);

  const handleMatchClick = (matchedUid) => {
    console.log('Match clicked:', matchedUid);
    navigate(`/messages/${matchedUid}`);
  };

  return (
    <div className="messages-page">
      <div className="content">
        <h2>Your Matches</h2>
        <div className="matches-container">
          {matches.map((match) => (
            <div key={match.matcheduid} className="match-card" onClick={() => handleMatchClick(match.matcheduid)}>
              <div className="match-name">{match.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MessagesPage;