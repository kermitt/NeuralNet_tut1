"use strict"

var Layer = require("./kantanNN").Layer;
var Input = require("./kantanNN").Input;
var NeuralNet = require("./kantanNN").NeuralNet;


var UnitTest = function() {
    this.setup();
    this.test_inputs_bias();
    this.test_initial_inputs();
    this.test_weights();
    this.test_feedforward();
    this.test_math();
    this.display();
    console.log("The end...");
}


UnitTest.prototype = {

    display: function() {
        console.log(" ----------------------- ");
        for (var x in this.NN.matrix) {
            for (var j = 0; j < this.NN.matrix[x].nodes.length; j++) {
                var v = this.NN.matrix[x].nodes[j];
                var i = this.NN.matrix[x].inputs[j].value;
                console.log(" Layer=" + x + "   depth=" + j + "  node=" + v + " in=" + i);
            }
        }
    },

    test_math: function() {
        var w = [.15, .2, .35];
        var i = [.05, .1, 1];
        var t = 0;
        for (var index in w) {
            var tmp = w[index] * i[index];
            t += tmp;
            //console.log("\t\t" + i[index] + "\tweight " + w[index] + "  result: " + tmp );
        }
        var sig = this.NN.sigmoidGate(t);
        sig = sig.toFixed(3);
        var isOk = sig == 0.593;
        var verdict = isOk ? "PASS" : "FAIL";
        console.log(verdict + "\t" + t + " and sig = " + sig + "\ttest_math");
    },
    setup: function() {
        var inputs = [.05, .1];
        var layers = 4;
        var depth = 2;
        this.NN = new NeuralNet(inputs, layers, depth);

        this.NN.matrix[0].inputs[0].weights[0] = .15;
        this.NN.matrix[0].inputs[0].weights[1] = .2;
        this.NN.matrix[0].inputs[1].weights[0] = .2;
        this.NN.matrix[0].inputs[1].weights[1] = .3;
        this.NN.matrix[0].inputs[2].weights[0] = .35;
        this.NN.matrix[0].inputs[2].weights[1] = .35;

        this.NN.feedforward();
    },
    test_feedforward: function() {
        var isOk = false;

        var expected = 0.593; // after sigmoid
        var actual = this.NN.matrix[0].nodes[0];
        actual = actual.toFixed(3);
        isOk = expected == actual;
        var verdict = isOk ? "PASS" : "FAIL";
        console.log(verdict + "\ttest_feedforward");
        if (!isOk) {
            console.log("\ttest_feedforward expected " + expected + " but got " + actual);
        }

    },
    test_weights: function() {

        var expected = [];
        expected.push(.15);
        expected.push(.2);
        expected.push(.2);
        expected.push(.3);
        expected.push(.35);
        expected.push(.35);
        var total = 0;
        for (var index in expected) {
            total += expected[index];
        }

        var isOk = true;
        var count = 0;
        var l1 = this.NN.matrix[0];
        for (var index in l1.inputs) {
            for (var index2 in l1.inputs[index].weights) {
                var v = l1.inputs[index].weights[index2];
                if (expected[count] == v) {
                    // ok!
                } else {
                    console.log("test_weights b0rK expected " + expected[count] + " but got " + v);
                    isOk = false;
                }
                count++;
            }
        }
        var verdict = isOk ? "PASS" : "FAIL";
        console.log(verdict + "\ttest_weights");
    },
    test_initial_inputs: function() {

        var expected = [0.05, 0.1, 1];
        var isOk = true;
        for (var index in this.NN.matrix[0].inputs) {
            if (expected[index] != this.NN.matrix[0].inputs[index].value) {
                isOk = false;
            }
        }
        var verdict = isOk ? "PASS" : "FAIL";
        console.log(verdict + "\ttest_initial_inputs");
    },

    test_inputs_bias: function() {
        // What does this test?
        // It tests whether the initial inputs size is 
        // given + 1 and _then_ that the layers after that
        // that the inputs size is _last_layer's node size + 1.
        //
        // The +1 is to hold the bias.
        //


        var l1 = this.NN.matrix[0];
        var l2 = this.NN.matrix[1];
        var isOk = l1.inputs.length == 3 &&
            l1.nodes.length == 2 &&
            l2.inputs.length == 3 &&
            l2.nodes.length == 2;
        var verdict = isOk ? "PASS" : "FAIL";

        console.log(verdict + "\ttest_inputs_bias");

        if (!isOk) {
            console.log(" l1.inputs.length expected 3 but got " + l1.inputs.length + " i.e., 1 more than initial input array");
            console.log(" l1.nodes.length expected 2 but got " + l1.nodes.length);
            console.log(" l2.inputs.length expected 3 but got " + l2.inputs.length + " i.e., 1 more than last layers nodes.length() of nodes");
            console.log(" l2.nodes.length expected 2 but got " + l2.nodes.length);
        }
    }
}

var test = new UnitTest();