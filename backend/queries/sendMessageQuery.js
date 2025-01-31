async function sendMessage(pool, messageData) {
  const { uid, receiverUid, message, read } = messageData;

  await pool.query(
    `INSERT INTO messages (uid, receiverUid, message, "read")
     VALUES ($1, $2, $3, $4)`,
    [uid, receiverUid, message, read]
  );
}

module.exports = {
  sendMessage,
};