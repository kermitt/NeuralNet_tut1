
console.log("Currently the only way to 'setup' this NeuralNet is to run its Test");

var NeuralNet = function() {
    this.weights = [];
    this.inputs = [];
}
NeuralNet.prototype = {

    step1_multiply: function() {

        var all_results = [];

        for (var layer = 0; layer < this.weights.length; layer++) {
            var input_ary = this.inputs[layer];
            all_results[layer] = [];
            for (var depth = 0; depth < input_ary.length; depth++) {
                var multipliers = this.weights[layer][depth];
                var result = this.step2_multiply(input_ary, multipliers);

                if (layer < (this.weights.length - 1)) {
                    // What is happening here?
                    //
                    // Well... the result is for _this_ layer... 
                    // But in the next loop the next layer will need this 
                    // result...  ...therefore just push this result up
                    // into the next loop
                    this.inputs[layer + 1][depth] = result;
                }
                all_results[layer][depth] = result;
            }
        }

        // OK, all the calcs are now actually finished but let's place the nodes
        // into their proper next starting values...  ...might be used to 
        // peek into the Neural Net to see what it was thinking about. 
        // Also, will be useful in unittesting. 		
        for (var layer = 0; layer < this.weights.length; layer++) {
            for (var depth = 0; depth < input_ary.length; depth++) {
                this.inputs[layer][depth] = all_results[layer][depth];
            }
        }
    },

    step2_multiply: function(inputs, multipliers) {
        var r = 0;
        for (var x = 0; x < inputs.length + 1; x++) {
            var input = inputs[x];
            if (inputs[x] == undefined) {
                input = 1; // set the bias!
            }
            var multiplier = multipliers[x];
            r += input * multiplier;
        }
        return 1 / (1 + Math.exp(-r));
    }

};

module.exports.NeuralNet = NeuralNet;