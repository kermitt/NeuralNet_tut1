var NeuralNet = require("./NeuralNet").NeuralNet;

var UnitTest = function() {
    this.nn = new NeuralNet();
    this.setup();
    this.nn.step1_multiply();
    //show(); 
    this.check_node_values_are_proper();
    this.show();
}
UnitTest.prototype = {
    setup: function() {
        this.nn.weights[0] = [];
        this.nn.weights[1] = [];
        this.nn.weights[0][0] = [.15, .2, .35];
        this.nn.weights[0][1] = [.2, .3, .35];
        this.nn.weights[1][0] = [.4, .45, .6];
        this.nn.weights[1][1] = [.5, .55, .6];
        this.nn.inputs[0] = [.05, .1];
        this.nn.inputs[1] = [-1, -2];
    },
    check_node_values_are_proper: function() {
        console.log("\nCheck that calculated nodes have the proper values")
        //expected values from 
        //http://mattmazur.com/2015/03/17/a-step-by-step-backpropagation-example/
        var expected = [];
        expected.push(0.5932699921071872);
        expected.push(0.5962826992967878);
        expected.push(0.7513144847519958);
        expected.push(0.7728703796871754);
        var count = 0;
        var verdict = "PASS";
        for (var layer in this.nn.inputs) {
            for (var depth in this.nn.inputs[layer]) {
                var actual = this.nn.inputs[layer][depth];
                var expect = expected[count];
                count++;
                if (actual != expect) {
                    verdict = "FAIL";
                }
                console.log(verdict + " l " + layer + " d " + depth + " actual " + this.nn.inputs   [layer][depth] + " expected " + expect);
            }
        }
    },
    show: function() {
        console.log("\nShow the unrolled matrix!"); 
        for (var layer = 0; layer < this.nn.weights.length; layer++) {
            var input_ary = this.nn.inputs[layer];
            for (var depth = 0; depth < input_ary.length; depth++) {
                console.log("Layer: " + layer + " Depth: " + depth + " NodeValue: " + input_ary[depth]);
                var multipliers_ary = this.nn.weights[layer][depth];
                for ( var mult_layer in multipliers_ary ) {
                    console.log("\t" + multipliers_ary[mult_layer]);
                }
            }
        }
    },
};
var test = new UnitTest();