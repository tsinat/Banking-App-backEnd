'use strict';

var express = require('express');
var router = express.Router();

var Balance = require('../models/balance');

//   /api/balances
router.route('/')
  .get((req, res) => {
    //   console.log('api/balances: working!!');
    Balance.findAll((err, balances) => {
      if(err) {
        return res.status(400).send(err);
      }
    //   console.log('balances:', balances);
      res.send(balances);
    });
  })
  .post((req, res) => {
    // console.log('req.body:', req.body);
    Balance.create(req.body, (err, newBalance) => {
      if(err) {
        return res.status(400).send(err);
      }
      res.send(newBalance);
    });
  });

router.put('/:id', (req, res) => {
  console.log('req.body:', req.body);
  Balance.edit(req.params.id,req.body, (err, newValue) => {
      console.log('err: ', err);
      console.log('newValue: ', newValue);
    if(err) {
      return res.status(400).send(err);
    }
    res.send({newValue: newValue});
  });
});

router.delete('/:id', (req, res) => {
  Balance.delete(req.params.id, err => {
    res.status(err ? 400 : 200).send(err);
  });
});

module.exports = router;
