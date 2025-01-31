async function getMessages(pool, uid, receiverUid) {
  const query = `
    SELECT * FROM messages
    WHERE (sender_id = $1 AND receiver_id = $2)
       OR (sender_id = $2 AND receiver_id = $1)
    ORDER BY timestamp;
  `;
  const values = [uid, receiverUid];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw new Error('Error retrieving messages: ' + err.message);
  }
}

module.exports = { getMessages };
