const express = require('express');
const db = require('../data/dbConfig.js');

const router = express.Router();

// Gets all acounts, uses /api/accounts as route
router.get('/', async (req, res) => {
  try {
    const accounts = await db('accounts');
    res.status(200).json(accounts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get accounts' });
  }
});

// Gets single account using ID, uses /api/accounts/{id} as route
router.get('/:id', async (req, res) => {
  try {
    const account = await db('accounts')
      .where({ id: req.params.id })
      .then(([account]) => {
        if (account === undefined) {
          res.status(404).json({ message: 'invalid message id' });
        }
        res.json({ account });
      });
    account();
  } catch (error) {
    res.status(500).json({ message: 'account not found using that ID' });
  }
});

// Posts a new account, uses /api/accounts as route
// Name and budget is required, ex: { name: 'account-01', budget: 4000.00 }
router.post('/', async (req, res) => {
  try {
    const post = await db('accounts').insert(req.body, 'id');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed post a new account' });
  }
});

// Updates an account, uses /api/accounts/{id} as route.
// Name and budget is required, ex: { name: 'account-01', budget: 4000.00 }
router.put('/:id', async (req, res) => {
  try {
    const changes = req.body;
    const update = await db('accounts')
      .where({ id: req.params.id })
      .update(changes)
      .then(count => {
        if (count) {
          res.json({ updated: count });
        } else {
          res.status(404).json({ message: 'invalid post id' });
        }
      });
    update();
  } catch (error) {
    res.status(500).json({ message: 'Failed update an account using that ID' });
  }
});

// Deletes an account, uses /api/accounts/{id} as route
router.delete('/:id', async (req, res) => {
  try {
    const DESTROY = await db('accounts')
      .where({ id: req.params.id })
      .del()
      .then(count => {
        if (count) {
          res.status(200).json({ deleted: count });
        } else {
          res.status(404).json({ message: 'invalid post id' });
        }
      });
    DESTROY();
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to deleted an account using that ID' });
  }
});

module.exports = router;
