var mongoose = require('mongoose');
var User = mongoose.model('User');
var passport = require('passport');

module.exports.createUser = function (req, res) {
  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;
  user.role = "ADMIN_ROLE";
  user.setPassword(req.body.password);
  user.created = new Date();

  user.save(function (err) {
    if(err)
      return res.status(500).json(err)
    res.status(201).json({"message": "user created."});
  })
};

module.exports.login = function (req, res) {
  passport.authenticate('local', function (err, user, info) {
    var token;
    if(err)
      return res.status(404).json(err);
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token": token
      })
    }else{
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports.findAllUsers = function (req, res) {
  User.find({}, function (err, users) {
    if(err)
      return res.status(500).send(err);
    res.json(users);
  })
};

module.exports.findUserById = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err)
      return res.status(500).send(err);
    res.json(user);
  })
};

module.exports.updateUser = function (req, res) {

  if(req.body.password)
    user.setPassword(req.body.password);

  User.findOneAndUpdate({email: req.body.email}, req.body, function(err, user){
    if(err)
      return res.status(500).send(err);
    res.json({"message": "user updated!"});
  });
};

module.exports.deleteUser = function (req, res) {
  User.findByIdAndRemove(req.query.id, function (err) {
    if(err)
      return res.send(500).send(err);
    res.status(200).json({
      "message": "Successful delete user."
    })
  })
};