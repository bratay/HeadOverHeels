const express = require('express');
const cors = require('cors'); // Import the cors package
const { Pool } = require('pg');
const { dbPassword, dbUserName, dbName, dbPort, dbHost } = require('../src/keys');
const { createProfile } = require('./queries/createProfileQuery');
const { createPreferences } = require('./queries/createPreferencesQuery');
const { updateProfile } = require('./queries/updateProfileQuery');
const { updatePreferences } = require('./queries/updatePreferencesQuery');
const { sendMessage } = require('./queries/sendMessageQuery');
const { getLikes } = require('./queries/getLikesQuery');
const { swipe } = require('./queries/swipeQuery');
const { getMatches } = require('./queries/getMatchesQuery');
const { getConversations } = require('./queries/getConversationsQuery');
const { getMessages } = require('./queries/getMessagesQuery');
const { blockUser } = require('./queries/blockUserQuery');
const { getUserID } = require('./queries/getUserIDQuery');
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

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

  try {
    const newUid = await createProfile(pool, profileData);
    res.json(newUid);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/createPreferences', async (req, res) => {
  const preferencesData = req.body;

  // Log the request body
  console.log(req.body);

  // Validate required fields
  if (!preferencesData.uid) {
    return res.status(400).json({ error: 'Missing uid' });
  }

  try {
    await createPreferences(pool, preferencesData);
    res.status(200).json({ message: 'Preferences created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/updateProfile', async (req, res) => {
  const profileData = req.body;
  console.log(req.body);

  try {
    await updateProfile(pool, profileData);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put('/updatePreferences', async (req, res) => {
  const preferencesData = req.body;

  try {
    await updatePreferences(pool, preferencesData);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// TODO: design and build recommendations endpoint
app.get('/getRecommendations', async (req, res) => {
  const { uid } = req.query;
  res.json({ recommendations: ['person1', 'person2', 'person3'] });
});

app.post('/sendMessage', async (req, res) => {
  const messageData = req.body;

  try {
    await sendMessage(pool, messageData);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getLikes', async (req, res) => {
  const { uid } = req.query; // Change from req.body to req.query
  console.log(req.query); // Log the query parameters

  try {
    const result = await getLikes(pool, uid);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post('/swipe', async (req, res) => {
  const swipeData = req.body;

  try {
    const result = await swipe(pool, swipeData);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getMatches', async (req, res) => {
  const { uid } = req.query; // Change from req.body to req.query

  try {
    const result = await getMatches(pool, uid);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

// TODO: This query is wrong
app.get('/getConversations', async (req, res) => {
  const { uid } = req.query; // Change from req.body to req.query

  try {
    const result = await getConversations(pool, uid);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getMessages', async (req, res) => {
  const { uid, receiverUid } = req.body;

  try {
    const result = await getMessages(pool, uid, receiverUid);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put('/blockUser', async (req, res) => {
  const { uid, uidToBlock } = req.body;

  try {
    await blockUser(pool, uid, uidToBlock);
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/getUserID', async (req, res) => {
  const { googleClientId } = req.query;
  console.log("body: " + req.body);
  console.log("query: " + req.query);

  try {
    const uid = await getUserID(pool, googleClientId);
    res.json({ uid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});
