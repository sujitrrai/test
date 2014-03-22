

 var alerts = require('../data/alerts')
 , active = require('../data/active')
 , completed = require('../data/completed')
 , bees = require('../data/bees');


exports.index = function(req, res){
  res.render('layout', { 'title': 'Location Feed','idname': 'TrackPrem','alerts':alerts,'active':active,'completed':completed,'bees':bees
                          })
};
