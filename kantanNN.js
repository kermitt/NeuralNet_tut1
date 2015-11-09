"use strict"

var Input = function(value) {
    this.value = value;
    this.weights = [];
};

var Layer = function(id, depth) {
    this.id = id;
    this.nodes = [];
    this.inputs = [];
    for (var i = 0; i < depth; i++) {
        this.nodes[i] = 0;
    }
};

Layer.prototype = {
    setInputs: function(ary) {
        ary.push(1);
        for (var index in ary) {
            var input = new Input(ary[index]);
            for (var node_index in this.nodes) {
                input.weights[node_index] = Math.random();
            }
            this.inputs.push(input);
        }
    },
}

var NeuralNet = function(initial_inputs, layer_count, depth_count) {
    this.matrix = [];
    this.depth = depth_count;
    for (var i = 0; i < layer_count; i++) {
        var layer = new Layer(i, depth_count);
        if (i === 0) {
            layer.setInputs(initial_inputs);
        } else {
            var last_nodes = this.matrix[i - 1].nodes;
            var ary = [];
            for (var index in last_nodes) {
                ary.push(last_nodes[index]);
            }
            layer.setInputs(ary);
        }
        this.matrix.push(layer);
    }
};

NeuralNet.prototype = {
    feedforward: function() {
        for (var x in this.matrix) {

            // populate _this_ layer's inputs from last layer's nodes
            if ( x > 0 ) { 
                for (var i = 0; i < this.matrix[x - 1].nodes.length; i++) {
                    var last_node = this.matrix[x - 1].nodes[i];
                    this.matrix[x].inputs[i].value = last_node; 
                    console.log(" last is " + last_node );
                }
            }


            for (var i = 0; i < this.matrix[x].inputs.length; i++) {
                var input = this.matrix[x].inputs[i];
                var v = input.value;
                var node_totals = [];
                // mult inputs by weights
                for (var j = 0; j < input.weights.length; j++) {
                    var weight = input.weights[j];
                    var node = this.matrix[x].nodes[j];
                    var t = input.weights[j] * input.value;

                    this.matrix[x].nodes[j] += t;
                    console.log(x + " " + j + "  in.v=" + input.value + " w " + input.weights[j] + " mult " + t);
                }
            }

            // populate the nodes
            for (var j = 0; j < this.matrix[x].nodes.length; j++) {
                var before = this.matrix[x].nodes[j];
                var after = this.sigmoidGate(before);
                this.matrix[x].nodes[j] = after;
                console.log("Before=" + before + "  After=" + after );
            }
        }
    },
    sigmoidGate: function(x) {
        return 1 / (1 + Math.exp(-x));
    }
};

module.exports.Input = Input;
module.exports.Layer = Layer;
module.exports.NeuralNet = NeuralNet;