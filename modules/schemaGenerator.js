var _ = require('lodash')
var fs = require('fs')
var schema = {}


module.exports = function(callback) {
	fs.readFile('./src/recipes.json', function(err, data) {
		var recipes = JSON.parse(data)
		var returnObj

		_.each(recipes, function(recipe, i) {
			_.each(recipe.ingredients, function(ingredient) {
				schema[ingredient.ingredient] = 0
			})
			if (i === recipes.length - 1) {
				console.log("We're done")
				returnObj = JSON.stringify(schema)
				fs.writeFile('./src/schema.json', returnObj)
				callback(returnObj)
			} 
		})
	})
}