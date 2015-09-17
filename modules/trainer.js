var _ = require('lodash')

var schema = require('../src/schema.json')
var recipes = require('../src/train.json')


function rate (recipe) {
  var ratedRecipe = classify(recipe)
  return { input: ratedRecipe, output: recipe.output }
}

function classify(recipe) {
  var ratedRecipe = _.extend({}, schema)
  var totalCl = 0

  _.each(recipe.ingredients, function(ingredient) {
    if (ingredient.cl !== undefined) totalCl += ingredient.cl    
  })

  _.each(recipe.ingredients, function(ingredient) {
    ratedRecipe[ingredient.ingredient] = ingredient.cl / totalCl
  })

  return ratedRecipe
}

module.exports = {
  train: function(callback) {
  	var trainer = []

  	_.each(recipes, function (recipe, i) {
  	  trainer.push(rate(recipe))
  	  if (i === recipes.length - 1) {
  	  	callback(trainer)
  	  }
  	})
  },
  rate: rate,
  classify: classify
}
