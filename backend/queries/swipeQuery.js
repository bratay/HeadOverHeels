async function swipe(pool, swipeData) {
  const { uid, swipeyUid, direction } = swipeData;

  const client = await pool.connect();

  try {
    await client.query('BEGIN');
    let match = false;

    const insertSwipeQuery = `
      INSERT INTO swipes (uid, swipeyUid, direction)
      VALUES ($1, $2, $3);
    `;
    const insertSwipeValues = [uid, swipeyUid, direction];

    if (direction) {
      const checkMutualSwipeQuery = `
        SELECT * FROM swipes
        WHERE uid = $2 AND swipeyUid = $1 AND direction = true;
      `;
      const checkMutualSwipeValues = [uid, swipeyUid];
      const mutualSwipeResult = await client.query(checkMutualSwipeQuery, checkMutualSwipeValues);

      if (mutualSwipeResult.rowCount > 0) {
        match = true;
        const deleteSwipeQuery = `
          DELETE FROM swipes
          WHERE uid = $2 AND swipeyUid = $1;
        `;
        await client.query(deleteSwipeQuery, checkMutualSwipeValues);

        const insertMatchQuery = `
          INSERT INTO Matches (uid, matchedUid, status)
          VALUES ($1, $2, 'matched'), ($2, $1, 'matched')
          ON CONFLICT DO NOTHING;
        `;
        await client.query(insertMatchQuery, checkMutualSwipeValues);
      }
    }

    if (!match) {
      await client.query(insertSwipeQuery, insertSwipeValues);
    }

    await client.query('COMMIT');
    return { match };
  } catch (err) {
    await client.query('ROLLBACK');
    throw new Error('Error processing swipe: ' + err.message);
  } finally {
    client.release();
  }
}

module.exports = { swipe };
