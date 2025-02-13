async function getMessages(pool, uid, receiverUid) {
  const query = `
    SELECT * FROM messages
    WHERE (uid = $1 AND receiverUid = $2)
       OR (uid = $2 AND receiverUid = $1)
    ORDER BY timestamp;
  `;
  const values = [uid, receiverUid];
  console.log('ids: ', values);

  try {
    const result = await pool.query(query, values);
    console.log('messages: ', result.rows);
    return result.rows;
  } catch (err) {
    throw new Error('Error retrieving messages: ' + err.message);
  }
}

module.exports = { getMessages };
