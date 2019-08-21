const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get accounts' });
  }
});

router.post('', async (req, res) => {
  try {
  } catch (error) {}
});

router.put('', async (req, res) => {
  try {
  } catch (error) {}
});

router.delete('', async (req, res) => {
  try {
  } catch (error) {}
});

module.exports = router;
