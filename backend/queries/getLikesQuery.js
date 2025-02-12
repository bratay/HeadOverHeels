async function getLikes(pool, uid) {
  const query = `
    SELECT s.uid, p.name, s.timestamp
    FROM swipes s
    JOIN profiles p ON s.uid = p.uid
    WHERE s.swipeyuid = $1 AND s.direction = true
    ORDER BY s.timestamp DESC;
  `;
  const values = [uid];

  try {
    console.log('Getting likes for:', uid);
    const result = await pool.query(query, values);
    console.log(result.rows);
    return result.rows;
  } catch (err) {
    throw new Error('Error retrieving likes: ' + err.message);
  }
}

module.exports = { getLikes };
