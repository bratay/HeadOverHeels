async function sendMessage(pool, messageData) {
  const { uid, receiverUid, message, read } = messageData;
  console.log('sendMessage message: ', message);
  console.log('sendMessage read: ', read);
  console.log('sendMessage uid: ', uid);
  console.log('sendMessage receiverUid: ', receiverUid);

  await pool.query(
    `INSERT INTO messages (uid, receiverUid, message, "read")
     VALUES ($1, $2, $3, $4)`,
    [uid, receiverUid, message, read]
  );
}

module.exports = {
  sendMessage,
};