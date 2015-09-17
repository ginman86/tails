var _ = require('lodash')
var brain = require('brain')
var net = new brain.NeuralNetwork()

var trainer = require('./modules/trainer')
var testData = require('./src/test.json')

trainer.train(function(trainingData) {
	var results = []
	net.train(trainingData)

  var test = trainer.classify(testData[testData.length - 2])

  console.log(test)
	console.log(net.run(test))
})
