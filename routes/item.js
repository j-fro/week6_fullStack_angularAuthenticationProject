var express = require('express');
var path = require('path');
var router = express.Router();

var Item = require('../models/item');

router.post('/', function(req, res) {
  if(req.isAuthenticated()) {
    var newItem = new Item({
      description: req.body.description,
      image_url: req.body.image,
      user: req.user.username
    });

    Item.create(newItem)
    .then(function(result) {
      console.log(result);
      res.sendStatus(200);
    })
    .catch(function(err) {
      console.log(err);
      res.sendStatus(500);
    });
  } else {
    res.sendStatus(401);
  }
});

router.get('/', function(req, res){
  Item.find()
  .then(function(result){
    res.send(result);
  })
  .catch(function(err){
    console.log('error:', err);
  });
});

module.exports = router;
