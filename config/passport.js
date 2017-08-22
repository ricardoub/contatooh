var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var findorCreate = require('mongoose-findorcreate');
var mongoose = require('mongoose');

module.exports = function() {

  var Usuario = mongoose.model('Usuario');

  passport.use(new GitHubStrategy({
    clientID: '6ede361231ceb09e92e8',
    clientSecret: 'f7c3ca303b1f4c8f235ab0c761a0ddbac39418c1',
    callbackURL: 'http://localhost:3000/auth/github/callback'
  }, function(accessToken, refreshToken, profile, done) {

    Usuario.findOrCreate(
      { "login" : profile.username },
      { "nome" : profile.username },
      function(erro, usuario) {
        if(erro) {
          console.log(erro);
          return done(erro);
        }
        return done(null, usuario);
      }
    );

  }));

  passport.serializeUser(function(usuario, done){
    done(null, usuario._id);
  });

  passport.deserializeUser(function(id, done) {
    Usuario.findById(id).exec()
      .then(function(usuario){
        done(null, usuario);
      });
  });
  
}