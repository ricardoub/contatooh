module.exports = function(app) {

  var Contato = app.models.contato;
  
  var controller = {};
  
  controller.listaContatos = function(req, res) {
    Contato.find().exec()
      .then(function(){
        res.json(contatos);
      },
        function(erro) {
          console.error(erro);
          res.status(500).json(erro);
        }
      )
  };

  controller.obtemContato = function(req, res) {};

  controller.removeContato = function(req, res) {};

  controller.salvaContato = function(req, res) {};

  return controller;
};