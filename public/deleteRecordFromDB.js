const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const deleteRecordFromDB = async (filename) => {
  try {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database,
    });

    // Implement the logic to delete the record with the given filename from the 'queue' table
    await db.run('DELETE FROM queue WHERE filename = ?', filename);

    console.log(`Record with filename ${filename} deleted from the queue.`);
  } catch (error) {
    console.error('Error deleting record from the database:', error);
  }
};

module.exports = { deleteRecordFromDB };