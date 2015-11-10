"use strict"

var Input = function( value ) {
	this.value = value;
	this.weight = [];
};
Input.prototype = { 
	addWeight : function(  ) { 
		this.weight.push( Math.random() ); 
	},
	display : function() { 

		var out = this.value.toFixed(3) + "|\t"; 
		for ( var index in this.weight ) {
			out += this.weight[index].toFixed(3) + "\t";
		}
		console.log( out );
	}
};
/*
Bluemix local
Innovative Bluemix mobile channelge 
*/
var NeuralNet = function(initial_inputs, layer_count, depth_count) {
	this.depth_count = depth_count;	
	this.inputs_matrix = [];
	this.inputs_matrix[0] = this.buildInputs(initial_inputs);

	this.matrix = []; 
	this.matrix[0] = {}; 
	this.matrix[0]["nodes"] = this.createEmptyArray( depth_count );

};

NeuralNet.prototype = {
	createEmptyArray : function( count ) {
		var ary  = []; 
		for ( var i = 0; i < count; i++ ) {
			ary[i] = -1;
		}
		return ary;
	},

	buildInputs : function( ary  ) {
		var inputs = []; 
		ary.push( 1 );
		for ( var i in ary ) {
			var input = new Input( ary[i] );
			for ( var j = 0; j < this.depth_count; j++ ) { 
				input.addWeight();
			}
			inputs[i] = input;
		}
		return inputs;
	},
	buildout : function(layer_count, depth_count) { 
	},
	display : function() {
		for ( var layer in this.inputs_matrix ) {

			console.log( " .... "); 

			for ( var index in this.inputs_matrix[layer] ) {
				this.inputs_matrix[layer][index].display();
			}


		}
	}
};

var UnitTest = function(){
	var ary = [0.05, 0.1]; 
	var layers = 2;
	var depth = 2;
	this.NN = new NeuralNet( ary,layers,depth);
	this.setup();
}
UnitTest.prototype = {
	setup : function() {
		// layer 1
		this.NN.inputs_matrix[0][0]["weight"][0] = .15;
		this.NN.inputs_matrix[0][1]["weight"][0] = .2;
		this.NN.inputs_matrix[0][2]["weight"][0] = .35;
		this.NN.inputs_matrix[0][0]["weight"][1] = .2;
		this.NN.inputs_matrix[0][1]["weight"][1] = .25;
		this.NN.inputs_matrix[0][2]["weight"][1] = .35;

		// layer 2 

 

		this.NN.display();
	}
}
// 70% of budgets are spent maintaining 
var tests = new UnitTest(); 