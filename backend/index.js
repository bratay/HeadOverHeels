const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

app.post('/create-user-profile', (req, res) => {
  res.json(req.body);
});

app.post('/createProfile', (req, res) => {
  res.sendStatus(200);
});

app.put('/updateProfile', (req, res) => {
  res.sendStatus(200);
});

app.put('/updatePreferences', (req, res) => {
  res.sendStatus(200);
});

app.get('/getRecommendations', (req, res) => {
  res.json({ recommendations: ['person1', 'person2', 'person3'] });
});

app.post('/sendMessage', (req, res) => {
  res.sendStatus(200);
});

app.get('/getLikes', (req, res) => {
  res.json({ likes: ['user1', 'user2', 'user3'] });
});

app.post('/swipe', (req, res) => {
  res.json({ match: true });
});

app.get('/getMatches', (req, res) => {
  res.json({ matches: ['match1', 'match2', 'match3'] });
});

app.get('/getMessages', (req, res) => {
  res.json({ messages: ['message1', 'message2', 'message3'] });
});

app.post('/blockUser', (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Backend server running at http://localhost:${port}`);
});
