const express = require('express');
const bodyParser = require('body-parser');
const { handleGetTalker,
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
  handleEditTalker,
  handleDeleteTalker,
  handleSearchTalker,
 } = require('./talkerFile');

 const app = express();
 app.use(bodyParser.json());
 app.use(express.json());
 
 const tokenVerify = require('./middlewares/token');
 
 const HTTP_OK_STATUS = 200;
 const PORT = '3000';
 
 // não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const talker = await handleGetTalker();
  return res.status(200).json(talker);
});

app.get('/talker/search', tokenVerify, async (req, res) => {
  const { q } = req.query;
  const searchResult = await handleSearchTalker(q);
  return res.status(200).json(searchResult);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkerById = await handleGetTalkerById(id);

  if (!talkerById) {
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  }
  return res.status(200).json(talkerById);
});

app.post('/login', emailValidation, passwordValidation, async (_req, res) => {
  const token = await handleCreateToken();
  return res.status(200).json({ token });
});

app.use(tokenVerify);

app.post('/talker', nameValidation,
  ageValidation, talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const newTalker = req.body;
  const updatedTalker = await handleAddTalker(newTalker);
  return res.status(201).json(updatedTalker);
});

app.put('/talker/:id', nameValidation,
ageValidation, talkValidation, watchedAtValidation, rateValidation, async (req, res) => {
  const { id } = req.params;
  const object = req.body;
  const editTalker = await handleEditTalker(id, object);
  return res.status(200).json(editTalker);
});

app.delete('/talker/:id', async (req, res) => {
  const { id } = req.params;
  await handleDeleteTalker(id);
  return res.status(204).end();
});

app.listen(PORT, () => {
  console.log('Online');
});
