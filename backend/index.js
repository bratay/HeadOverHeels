const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/createProfile', (req, res) => {
    res.sendStatus(200);
});

app.post('/createPreferences', (req, res) => {
    res.sendStatus(200);
});

app.put('/updateProfile', (req, res) => {
  res.sendStatus(200);
});

app.put('/updatePreferences', (req, res) => {
  res.sendStatus(200);
});

app.get('/getRecommendations', (req, res) => {
  const { uid } = req.query;
  // Process the UID here
  res.json({ recommendations: ['person1', 'person2', 'person3'] });
});

app.post('/sendMessage', (req, res) => {
  const { senderUid, receiverUid, message } = req.body;
  // Process the message here
  res.sendStatus(200);
});

app.get('/getLikes', (req, res) => {
  const { uid } = req.query;
  // Process the UID here
  res.json({ likes: ['user1', 'user2', 'user3'] });
});

app.post('/swipe', (req, res) => {
  const { swiperUid, swipeyUid, direction } = req.body;
  // Process the swipe here
  res.json({ match: true });
});

app.get('/getMatches', (req, res) => {
  const { uid } = req.query;
  // Process the UID here
  res.json({ matches: ['match1', 'match2', 'match3'] });
});

app.get('/getMessages', (req, res) => {
  const { uid, receiverUid } = req.query;
  // Process the UIDs here
  res.json({ messages: ['message1', 'message2', 'message3'] });
});

app.post('/blockUser', (req, res) => {
    const { uid, uidToBlock } = req.query;
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
