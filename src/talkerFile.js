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

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === undefined) {
    return res.status(400).json({ message: 'O campo "email" é obrigatório' });
  }
  if (email.length > 0 && !EMAIL.test(email)) {
    return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  return next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  const MAGICNUMBER = 6;
  if (password === undefined) {
    return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  }
  if (password.length > 0 && password.length < MAGICNUMBER) {
    return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }
  return next();
};

const handleAddTalker = async (newTalker) => {
  let id = 5;
  const talker = await fetchTalker();
  const addedTalker = { id, ...newTalker };
  const updatedTalker = JSON.stringify([...talker, addedTalker]);
  await fs.writeFile(path.resolve(__dirname, '.', 'talker.json'), updatedTalker);
  id += 1;
  return addedTalker;
};

const nameValidation = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (typeof (name) === 'string' && name.length > 2) {
    return next();
  }
  return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
};

const ageValidation = async (req, res, next) => {
  const { age } = req.body;

  if (!age) {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (typeof (age) === 'number' && age > 17) {
    return next();
  }
  return res.status(400).json({ message: 'A pessoa palestrante deve ser maior de idade' });
};

const talkValidation = async (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const watchedAtValidation = async (req, res, next) => {
  const { talk } = req.body;
  const { watchedAt } = talk;
  const dateFormat = /^(\d{2})\/(\d{2})\/(\d{4})$/;

  if (!watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  if (!dateFormat.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const rateValidation = async (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;
  
  if (!rate) {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }
  if (rate < 1 || rate > 5 || !Number.isInteger(rate)) {
    return res.status(400).json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }
  return next();
};

module.exports = { handleGetTalker,
  handleGetTalkerById,
  handleCreateToken,
  emailValidation,
  passwordValidation,
  handleAddTalker,
  nameValidation,
  ageValidation,
  talkValidation,
  watchedAtValidation,
  rateValidation,
};
