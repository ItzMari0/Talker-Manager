const fs = require('fs').promises;
const path = require('path');
const token = require('crypto');

const talkerdb = path.resolve(__dirname, '.', 'talker.json');

const fetchTalker = async () => {
  const file = await fs.readFile(talkerdb, 'utf-8');
  return JSON.parse(file);
};

const handleGetTalker = async () => {
  const talker = await fetchTalker();
  return talker;
};

const handleGetTalkerById = async (id) => {
  const talker = await fetchTalker();
  const talkerById = talker.find((person) => person.id === Number(id));
  return talkerById;
};

const handleCreateToken = async () => {
  const generatedToken = token.randomBytes(8).toString('hex');
  return generatedToken;
};

handleCreateToken();
module.exports = { handleGetTalker, handleGetTalkerById, handleCreateToken };
