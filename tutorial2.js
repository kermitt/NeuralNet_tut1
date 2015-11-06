"use strict"

// tutorial following 
//http://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/

var Node = function( i,j) {
	this.layer = i;
	this.depth = j;
	this.value = 0;
}

var Input = function(  ) {
	this.weights = [];
}

Input.prototype = {
	addWeight : function() {
		this.weights.push( Math.random());
	}
}

var NeuralNet = function(inputs_ary, layers, nodes_per_layer ) {
	this.layers = layers;
	this.inputs_ary = inputs_ary;
	this.nodes_per_layer = nodes_per_layer;
	// --- default the bias to the traditional value 
	this.bias = 1;

	// --- make this.nodes and this.inputs 
	// --- be matrixes ( matrixii? )
	this.nodes = [];
	this.inputs = [];
	for ( var i = 0; i < layers; i++) { 
		this.inputs[i] = [];
		this.nodes[i] = [];

		for ( var j = 0; j < nodes_per_layer; j++) { 
			this.nodes[i][j] = new Node( i, j ); 
		}
	}
	// --- build out the graph which is be the net
	// --- after the feedforward is called.
	this.buildout_graph();
}

NeuralNet.prototype = {
	feedforward : function() {

	},
	buildout_graph : function() { 
		// the input matrix ( slightly 'tricky' because bias( +1 ) and the weights (*2))
		for ( var i = 0; i < this.layers; i++ ) {
			var cipbftl = 0;
			if ( i === 0 ) {
				cipbftl = this.inputs_ary.length + 1;
			} else {	
				cipbftl = this.nodes_per_layer + 1;
			}

			for ( var j = 0; j < cipbftl; j++ ) {
				this.inputs[i][j] = new Input();
				for ( var k = 0; k < this.nodes_per_layer; k++ ) {
					this.inputs[i][j].addWeight();
				}
			}
		}
	},

};

var UnitTests = function( ) {
	this.setup();
	this.test_shape_before_feedforward();
		this.display();

};
UnitTests.prototype = {

	setup : function() { 

		this.inputs = [.05,.1];
		this.layers = 2;
		this.nodes_per_layer = 2; 

		this.NN = new NeuralNet( this.inputs, this.layers, this.nodes_per_layer); 
		// layer 1
		// input1 weight
		this.NN.inputs[0][0].weights[0] = .15;
		this.NN.inputs[0][0].weights[1] = .2;
		// input2 weight
		this.NN.inputs[0][1].weights[0] = .25;
		this.NN.inputs[0][1].weights[1] = .3;
		// input bias weight
		this.NN.inputs[0][2].weights[0] = .35;
		this.NN.inputs[0][2].weights[1] = .35;
		// layer 2
		// input1 weight
		this.NN.inputs[1][0].weights[0] = .40;
		this.NN.inputs[1][0].weights[1] = .45;
		// input2 weight
		this.NN.inputs[1][1].weights[0] = .50;
		this.NN.inputs[1][1].weights[1] = .55;
		// input bias weight
		this.NN.inputs[1][2].weights[0] = .6;
		this.NN.inputs[1][2].weights[1] = .6;


	},

	test_shape_before_feedforward : function() {

		// the +1 issue in this func is to cover the bias

		// ought to have 1 more input than initial inputs
		var expected1 = this.NN.inputs[0].length;
		var actual1 = this.inputs.length;

		// after the firstith input layer then 
		// there ought to be as many inputs-per-layer as
		// nodes-per-layer + 1

		var expected2 = this.NN.inputs[1].length;
		var actual2 = this.NN.nodes[1].length;

		// needed because of the bias
		actual1 += 1;
		actual2 += 1;

		this.assertTrue("bias initial shape", expected1, actual1);
		this.assertTrue("bias shape", expected2, actual2);

	},
	display : function() {

		for ( var i = 0; i < this.layers; i++ ) {
			console.log(" layer " + i ); 
			for ( var j = 0; j < this.NN.inputs[i].length; j++ ) {
				console.log("\tdepth " + j );
				var obj = this.NN.inputs[i][j];
				for ( var k = 0 ; k < obj.weights.length; k++) { 
					console.log("\t\t" + k + "\t" + obj.weights[k]);
				}	
			}
		}
	},

	assertTrue : function(msg, expected, actual ) {
		var verdict = expected === actual ? "PASS" : "FAIL";
		if ( actual === undefined ) {
			verdict = "b0rk!";
		}
		console.log( verdict + "\t" + msg ); 
	}
};



var tests = new UnitTests();