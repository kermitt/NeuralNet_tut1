Node = function( i,j) {
	this.layer = i;
	this.depth = j;
	this.value = 0;
}

Input = function(  ) {
	this.weights = [];
}

Input.prototype = {
	addWeight : function() {
		this.weights.push( Math.random());
	}
}

NeuralNet = function(inputs_ary, layers, nodes_per_layer ) {
	//console.log("in " + inputs_ary.length + " l " + layers + " n " + nodes_per_layer); 
	this.layers = layers;
	//this.nodes_per_layer = nodes_per_layer;
	this.inputs_ary = inputs_ary;
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

	buildout_graph : function() { 
		// the input matrix ( slightly 'tricky' because bias( +1 ) and the weights (*2))
		for ( var i = 0; i < this.inputs.length; i++ ) {
			var cipbftl = 0;
			if ( i === 0 ) {
				cipbftl = this.inputs_ary.length + 1;
			} else {	
				cipbftl = this.nodes_per_layer + 1;
			}
console.log("iiii " + i ); 
			for ( var j = 0; j < cipbftl; j++ ) {
				this.inputs[i][j] = new Input();
				for ( var k = 0; k < this.nodes_per_layer; k++ ) {
					this.inputs[i][j].addWeight();
				}
			}
		}

		console.log(" --------- "); 
	}
};

UnitTests = function( ) {
	this.setup();
	this.test_shape_before_feedforward();

};
var count = 0; 
UnitTests.prototype = {

	setup : function() { 


		this.inputs = [.05,.1];
		this.layers = 2;
		this.nodes_per_layer = 2; 

		this.NN = new NeuralNet( this.inputs, this.layers, this.nodes_per_layer); 
		this.NN.inputs[0][0].weights[0] = 1;
		this.NN.inputs[0][1].weights[0] = 2;

	},

	test_shape_before_feedforward : function() {
		
		for ( var layer in this.NN.inputs ) {
				console.log("LAYER: " + layer );

			for ( var depth in this.NN.inputs[layer] ) {
				console.log("DEPTH : " + depth ) ; 

				var input = this.NN.inputs[layer][depth];

				console.log( input.weights.length );

			}

		}

		console.log("initial inputs length " + this.inputs.length );
		console.log("after adding the bias " + this.NN.inputs[0].length ); 
		this.assertTrue("initial bias", (this.inputs.length + 1 ),this.NN.inputs[0].length);

console.log("this.NN.inputs[0].length: " + this.NN.inputs[0].length ); 
console.log("this.NN.nodes[0].length: " + this.NN.nodes[0].length ); 

//		this.assertTrue("correct node size", this.nodes_per_layer
//		this.assertTrue("post inital bias", (this.inputs.length + 1 ),this.NN.inputs[1].length);

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