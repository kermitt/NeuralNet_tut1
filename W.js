
var weights = []; 
var inputs = [];



function step1_multiply() { 

	var all_results = []; 

	for ( var layer = 0; layer < weights.length; layer++ ) {
		var input_ary = inputs[layer];
		all_results[layer] = [];
		for ( var depth = 0; depth < input_ary.length; depth++ ) {
			var multipliers = weights[layer][depth];
			var result = step2_multiply( input_ary, multipliers);	

			if ( layer < ( weights.length -1 )) {
				// What is happening here?
				//
				// Well... the result is for _this_ layer... 
				// But in the next loop the next layer will need this 
				// result...  ...therefore just push this result up
				// into the next loop
				inputs[layer + 1][depth] = result;
			}
			all_results[layer][depth] = result; 
		}
	}

	// OK, all the calcs are now actually finished but let's place the nodes
	// into their proper next starting values...  ...might be used to 
	// peek into the Neural Net to see what it was thinking about. 
	// Also, will be useful in unittesting. 		
	for ( var layer = 0; layer < weights.length; layer++ ) {
		for ( var depth = 0; depth < input_ary.length; depth++ ) {
			weights[layer][depth] = all_results[layer][depth];
		}
	}
}

function step2_multiply( inputs, multipliers ) { 
	var r = 0;
	for ( var x = 0; x < inputs.length + 1; x++ ) {
		var input = inputs[x];
		if ( inputs[x] == undefined ) {
			input = 1;// set the bias!
		}
		var multiplier = multipliers[x];
		r += input * multiplier;
	}
    return 1 / (1 + Math.exp(-r));
}

function show() { 
	for ( var layer = 0; layer < weights.length; layer++ ) {
		var input_ary = inputs[layer];

		for ( var depth = 0; depth < input_ary.length; depth++ ) {
			console.log( "\t" + layer + "\tD: " + depth + " input? " + input_ary[depth ]); 
			var weights = weights[layer][depth];
			for ( var i = 0; i < weights.length; i++ ) {
				console.log("\t\tW: " + weights[i]);
			}
		}
	}
}

var UnitTest = function( ) {
	this.setup();
	step1_multiply(); 
//	show(); 

	this.check_node_values_are_proper();
}
UnitTest.prototype = {
    setup: function() {
		weights[0] = [];
		weights[1] = [];
		weights[0][0] = [.15,.2,.35	];
		weights[0][1] = [.2,.3,.35];
		weights[1][0] = [.4,.45,.6	];
		weights[1][1] = [.5,.55,.6	];
		inputs[0] = [.05,.1];
		inputs[1] = [-1,-2];
    },
    check_node_values_are_proper: function() {
    	//expected values from 
    	//http://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/
		var expected = [];
		expected.push(0.5932699921071872);
		expected.push(0.5962826992967878);
		expected.push(0.7513144847519958);
		expected.push(0.7728703796871754);
		var count = 0 ; 
		var verdict = "PASS";
		for ( var layer in weights ){ 
			for ( var depth in weights[layer]) {
				var actual = weights[layer][depth];
				var expect = expected[count];
				count++;
				if( actual != expect ) {
					verdict = "FAIL";
				}
				console.log(verdict + " l " + layer + " d " + depth +" actual " + weights[layer][depth ] + " expected " + expect );
			}
		}
    }
};
var test = new UnitTest();