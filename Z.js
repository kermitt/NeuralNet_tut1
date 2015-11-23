"use strict"

var Layer = function() {};

var NeuralNet = function(layers, depth) {
    this.layers = layers;
    this.depth = depth;
    this.weights = [];
    this.inputs = [];

    for (var i = 0; i < this.layers; i++) {
        this.weights[i] = [];
        this.inputs[i] = [];
        for (var d = 0; d < this.depth; d++) {
            this.weights[i][d] = [];
        }
    }
};

NeuralNet.prototype = {
    sigmoidGate: function(x) {
        return 1 / (1 + Math.exp(-x));
    },
    mult : function( layer, depth ) {
        var result = 0;
        for (var k = 0; k < this.weights[layer][depth].length; k++) {
                    var w = this.weights[layer][depth][k];
                    var n = this.inputs[depth][k]; 
                    result += w * n;
                    //console.log("\t\t" + w + "\t\t" + n + "\t\t" + r.toFixed(4));
        }

        return result; 
        
    },
    feedforward : function() {
        for (var i = 0; i < this.nn.layers; i++) {
            for (var d = 0; d < this.nn.depth; d++) {
                var r = 0;
                for (var k = 0; k < this.nn.weights[i][d].length; k++) {
                    var w = this.nn.weights[i][d][k];
                    var n = this.nn.inputs[i][k]; 
                    r += w * n;

                    //console.log("\t\t" + w + "\t\t" + n + "\t\t" + r.toFixed(4));
                }
                results.push( r );
                //console.log(" ..... ");
            }
        }

    }
};
var UnitTest = function() {
    this.nn = new NeuralNet(2, 2);
    this.setup();
    this.multTest();
    this.display_node_values();
    this.display();
};
UnitTest.prototype = {

    multTest : function() {
        var l = 0;
        var d = 0;
        var result = this.nn.mult( l, d);
        var isOk = 0.3775 == result;
        this.log( isOk, "multTest for the 0,0 node is "  + result );
    },
    log: function( verdict, msg ) {
        var v = verdict ? "PASS" : "FAIL";
        console.log( v + "\t" + msg );
    },
    setup: function() {
        // 
        this.nn.inputs[0][0] = 0.05;
        this.nn.inputs[0][1] = 0.1;
        this.nn.inputs[0][2] = 1.0;

        this.nn.inputs[1][0] = 0;
        this.nn.inputs[1][1] = 0;
        this.nn.inputs[1][2] = 1;

        this.nn.weights[0][0][0] = .15;
        this.nn.weights[0][0][1] = .2;
        this.nn.weights[0][0][2] = .35;

        this.nn.weights[0][1][0] = .2;
        this.nn.weights[0][1][1] = .3;
        this.nn.weights[0][1][2] = .35;

        this.nn.weights[1][0][0] = 0.0;
        this.nn.weights[1][0][1] = 0.0;
        this.nn.weights[1][0][2] = 0.0;

        this.nn.weights[1][1][0] = 0.0;
        this.nn.weights[1][1][1] = 0.0;
        this.nn.weights[1][1][2] = 0.0;

    },
    display_node_values: function() {

        var results = []; 
        for (var i = 0; i < this.nn.layers; i++) {
            for (var d = 0; d < this.nn.depth; d++) {
                var r = 0;
                for (var k = 0; k < this.nn.weights[i][d].length; k++) {
                    var w = this.nn.weights[i][d][k];
                    var n = this.nn.inputs[i][k]; 
                    r += w * n;

                    //console.log("\t\t" + w + "\t\t" + n + "\t\t" + r.toFixed(4));
                }
                results.push( r );
                //console.log(" ..... ");
            }
        }
        for ( var i in results ) {
            console.log( i + "\t\t" + results[i].toFixed(4) ); 
        }
        return results;
    },
    display : function() {
        for ( var i = 0 ; i < this.nn.inputs.length; i++ ) {
            for ( var j = 0 ; j < this.nn.inputs[i].length; j++ ) {
                console.log("Display: "+ i + "  " + j + "\t\t" + this.nn.inputs[i][j]);
            }
        }

    }
}
var test = new UnitTest();