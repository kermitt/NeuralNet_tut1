"use strict"

var NeuralNet = function(initial_inputs, layer_count, depth_count) {

	this.matrix = []; 
	this.matrix[0] = {};
	// the first one is a little different
	this.matrix[0]["inputs"] = this.buildInputs( initial_inputs.length )
	this.matrix[0]["weights"] = this.buildWeights( initial_inputs.length, depth_count );
	this.matrix[0]["nodes"] = this.buildNodes( depth_count );
	for ( var i in initial_inputs ) {
		this.matrix[0]["inputs"][i] = initial_inputs[i];
	}
	//ok, now for the main show... start i off at '1'
	for ( var i = 1; i < layer_count; i++ ) {
		this.matrix[i] = {};
		this.matrix[i]["inputs"] = this.buildInputs( depth_count )
		this.matrix[i]["weights"] = this.buildWeights( depth_count, depth_count );
		this.matrix[i]["nodes"] = this.buildNodes( depth_count );
	}
};
NeuralNet.prototype = {
	display : function() {
		for ( var layer in this.matrix ) {
			console.log("layer: " + layer );
			var o = this.matrix[layer];
			var in_size = this.matrix[layer]["inputs"].length;
//			var wt_size = this.matrix[layer]["weights"].length;
			var nd_size = this.matrix[layer]["nodes"].length;

			var most = in_size > nd_size ? in_size : nd_size; 

			for ( var i = 0; i < most; i++ ) {
				var out = i + " "; 
				if ( this.matrix[layer]["nodes"][i] !== undefined ) {
					out += " node: " + this.matrix[layer]["nodes"][i].toFixed(3) + "\t";
				} else {
					//out += " node: --.--- ";
					out += " node:        ";
				}
				if ( this.matrix[layer]["inputs"][i] !== undefined ) {

					out += "input: " + this.matrix[layer]["inputs"][i].toFixed(3) + "\t|\t";
					var ary = this.matrix[layer]["weights"][i];
					for ( var j = 0; j < ary.length; j++ ) {
						out += ary[j].toFixed(3) + "\t";
					}
				}
				console.log( out );
			}
		}
	},
	buildInputs : function( inputs_count  ) { 
		inputs_count += 1; // the Bias
		var inputs = [];
		for ( var i = 0; i < inputs_count; i++ ) {
			inputs[i] = -1;
		}
		return inputs;
	},
	buildWeights : function( inputs_count, depth ) {
		var weights = []; 
		inputs_count += 1; // the Bias
		for ( var i = 0; i < inputs_count; i++ ) {
			var weight = [];
			for ( var j = 0; j < depth; j++ ) { 
				weight[j] = Math.random();
			}
			weights[i] = weight;
		}
		return weights;
	},

	buildNodes : function( depth  ) { 
		var nodes = [];
		for ( var i = 0; i < depth; i++ ) {
			nodes[i] = -2;
		}
		return nodes;
	},
};

var UnitTest = function(){
	var ary = [0.05, 0.1]; 
	var layers =  2;
	var depth = 2;
	this.NN = new NeuralNet( ary,layers,depth);
	this.setup();
	this.NN.display();
}

UnitTest.prototype = {
	setup : function() {

		// set the weights to permit testing the results
		// with known inputs

		// layer 1, node 1
		this.NN.matrix[0]["weights"][0][0] = .15;
		this.NN.matrix[0]["weights"][1][0] = .2;
		this.NN.matrix[0]["weights"][2][0] = .35;
		// layer 1, node 2
		this.NN.matrix[0]["weights"][0][1] = .2;
		this.NN.matrix[0]["weights"][1][1] = .3;
		this.NN.matrix[0]["weights"][2][1] = .35;
		// layer 2, node 1
		this.NN.matrix[1]["weights"][0][0] = .4;
		this.NN.matrix[1]["weights"][1][0] = .5;
		this.NN.matrix[1]["weights"][2][0] = .6;
		// layer 2, node 2
		this.NN.matrix[1]["weights"][0][1] = .45;
		this.NN.matrix[1]["weights"][1][1] = .55;
		this.NN.matrix[1]["weights"][2][1] = .6;
		

	}
}

var test = new UnitTest();