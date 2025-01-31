async function getConversations(pool, uid) {
  const query = `
    SELECT DISTINCT p.uid, p.name, MAX(m.timestamp) AS last_message_timestamp
    FROM messages m
    JOIN profiles p ON (m.uid = p.uid OR m.receiverUid = p.uid)
    WHERE (m.uid = $1 OR m.receiverUid = $1) AND p.uid != $1
    GROUP BY p.uid, p.name
    ORDER BY last_message_timestamp DESC;
  `;
  const values = [uid];

  try {
    const result = await pool.query(query, values);
    return result.rows;
  } catch (err) {
    throw new Error('Error retrieving conversations: ' + err.message);
  }
}

module.exports = { getConversations };
