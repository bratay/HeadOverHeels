const express = require('express');
const { Pool } = require('pg');
const { dbPassword, dbUserName, dbName, dbPort, dbHost } = require('../src/keys');
const { createProfile } = require('./queries/createProfileQuery');
const { createPreferences } = require('./queries/createPreferencesQuery');
const app = express();
const port = 3001;

// Database connection configuration
const pool = new Pool({
  user: dbUserName,
  host: dbHost,
  database: dbName,
  password: dbPassword,
  port: dbPort,
});

app.use(express.json());

app.listen(port, () => {
  console.log(`HH backend server running at http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello from Head over Heels backend!');
});

app.post('/createProfile', async (req, res) => {
  const profileData = req.body;

  // Log the request body
  console.log(req.body);

  // Validate required fields
  if (!profileData.uid) {
    return res.status(400).send('Missing uid');
  }

  try {
    await createProfile(pool, profileData);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/createPreferences', async (req, res) => {
  const preferencesData = req.body;

  // Log the request body
  console.log(req.body);

  // Validate required fields
  if (!preferencesData.uid) {
    return res.status(400).send('Missing uid');
  }

  try {
    await createPreferences(pool, preferencesData);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.put('/updateProfile', async (req, res) => {
  const { uid, name, age, bio } = req.body;
  try {
    await pool.query('UPDATE profiles SET name = $1, age = $2, bio = $3 WHERE uid = $4', [name, age, bio, uid]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put('/updatePreferences', async (req, res) => {
  const { uid, preferences } = req.body;
  try {
    await pool.query('UPDATE preferences SET preferences = $1 WHERE uid = $2', [preferences, uid]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getRecommendations', async (req, res) => {
  const { uid } = req.query;
  res.json({ recommendations: ['person1', 'person2', 'person3'] });
});

app.post('/sendMessage', async (req, res) => {
  const { senderUid, receiverUid, message } = req.body;
  try {
    await pool.query('INSERT INTO messages (sender_uid, receiver_uid, message) VALUES ($1, $2, $3)', [senderUid, receiverUid, message]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getLikes', async (req, res) => {
  const { uid } = req.query;
  try {
    // 
    const result = await pool.query('SELECT uid FROM likes WHERE swipeyuid = $1', [uid]);
    // TODO: This will be a join, profiles of the users who liked the current user
    req.sendStatus(200); // return list of profiles that liked you 
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/swipe', async (req, res) => {
  const { swiperUid, swipeyUid, direction } = req.body;
  try {
    await pool.query('INSERT INTO swipes (uid, swipeyUid, direction) VALUES ($1, $2, $3)', [swiperUid, swipeyUid, direction]);
    res.json({ match: true });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getMatches', async (req, res) => {
  const { uid } = req.query;
  try {
    // TODO: this will be a join from matches table and profile table
    const result = await pool.query('SELECT matches FROM matches WHERE uid = $1', [uid]);
    res.json({ matches: result.rows });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// TODO: get all the people that you have messaged and have messaged you (conversation you have with people) 
app.get('/getConversations', async (req, res) => {
  const { uid } = req.query;
  try {
    const result = await pool.query('SELECT message, timestamp FROM messages WHERE sender_uid = $1 AND receiver_uid = $2', [uid, receiverUid]);
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getMessages', async (req, res) => {
  const { uid, receiverUid } = req.query;
  try {
    const result = await pool.query('SELECT message, timestamp FROM messages WHERE sender_uid = $1 AND receiver_uid = $2', [uid, receiverUid]);
    res.json({ messages: result.rows });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/blockUser', async (req, res) => {
  const { uid, uidToBlock } = req.query;
  try {
    await pool.query('UPDATE INTO blocks (uid, uid_to_block) VALUES ($1, $2)', [uid, uidToBlock]);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
