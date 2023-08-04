const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');

const insertScreenshot = async (data) => {
  try {
    const db = await open({
      filename: 'database.db',
      driver: sqlite3.Database,
    });

    const id = Number(data.id);
    const createdAt = new Date(data.createdAt).toISOString();
    const filename = path.basename(data.filename); 

   

    await db.run('INSERT INTO queue (id, createdAt, filename) VALUES (?, ?, ?)', id, createdAt, filename);

    console.log('Filename saved to database:', filename);
  } catch (error) {
    console.error('Error saving filename to database:', error);
  }
};

module.exports = {
  insertScreenshot,
};

