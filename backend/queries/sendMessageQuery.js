async function sendMessage(pool, messageData) {
  const { senderUid, receiverUid, message } = messageData;

  await pool.query(
    `INSERT INTO messages (sender_uid, receiver_uid, message)
     VALUES ($1, $2, $3)`,
    [senderUid, receiverUid, message]
  );
}

module.exports = {
  sendMessage,
};