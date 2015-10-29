

TestLogic = function() {

    this.forwardMultTest();
    this.backPropogationTest();
    this.randomLocalSearchTest();
    this.analyticGradientTest();
    this.forwardCircuitTest();
    this.chainRuleTest();
    this.numericalGradientCheckTest();
};
function log( s ) { 
    console.log( s )
}
function show( verdict, result, func ) { 
    console.log( verdict + "\t" + result + "\t" + func ); 
}

TestLogic.prototype = {

    forwardMultTest : function() {
        var result = forwardMultiplyGate(-2,3);
        var verdict = base.assertEquals(result,-6);
        show( verdict, result.toFixed(4), "forwardMultTest"); 
    },
    backPropogationTest : function() {

        //co nsole.log("//////////// backPropogationTest");
        var x = -2, y = 3;
        var out = forwardMultiplyGate(x, y); // -6
        var h = 0.0001;
 
        // compute derivative with respect to x
        var xph = x + h; // -1.9999
        var out2 = forwardMultiplyGate(xph, y); // -5.9997
        var x_derivative = (out2 - out) / h; // 3.0
 
        // compute derivative with respect to y
        var yph = y + h; // 3.0001
        var out3 = forwardMultiplyGate(x, yph); // -6.0002
        var y_derivative = (out3 - out) / h; // -2.0
 
        //co nsole.log("x_derivative: " + x_derivative + "   y_derivative: " + y_derivative );
 
        var step_size = 0.01;
        //var out = forwardMultiplyGate(x, y); // before: -6
        x = x + step_size * x_derivative; // x becomes -1.97
        var predictedXvalue = -1.97;


        var fuzz = 0.0000001; 
        var verdictX = base.assertCloseEnough(x, predictedXvalue, fuzz);
     y = y + step_size * y_derivative; // y becomes 2.98
        fuzz  = 000001;
        var predictedYvalue = 2.98;
        var verdictY = base.assertCloseEnough(y, predictedYvalue, fuzz);

        var result = forwardMultiplyGate(x, y); // -5.87! exciting.
        var predictedvalue = -5.87;
        var verdict = base.assertCloseEnough(y, predictedYvalue, fuzz);

        show( verdict, result.toFixed(4) + " = " + predictedvalue.toFixed(4) + "~" + fuzz, "\tbackPropogationTest");   
 
    },
    analyticGradientTest : function() {
     //   console.log("//////////// analyticGradientTest");
     
        var x = -2, y = 3;
        var out = forwardMultiplyGate(x, y); // before: -6
        var x_gradient = y; // by our complex mathematical derivation above
        var y_gradient = x;
 
        var step_size = 0.01;
        x += step_size * x_gradient; // -2.03
        y += step_size * y_gradient; // 2.98
        var result = forwardMultiplyGate(x, y); // -5.87. Higher output! Nice.
       var verdict = base.assertEquals(result, -5.8706);
       show(verdict,result,"analyticGradientTest");
    },
 
 
    randomLocalSearchTest : function() {
        /* UGLY! Do not use */

        var x = -2, y = 3; // some input values
 
        // try changing x,y randomly small amounts and keep track of what works best
        var tweak_amount = 0.01;
        var best_out = -Infinity;
        var best_x = x, best_y = y;
        var transition_count = 0;
        for(var k = 0; k < 100; k++) {
            var x_try = x + tweak_amount * (Math.random() * 2 - 1); // tweak x a bit
            var y_try = y + tweak_amount * (Math.random() * 2 - 1); // tweak y a bit
            var out = forwardMultiplyGate(x_try, y_try);
            if(out > best_out) {
                // best improvement yet! Keep track of the x and y
                best_out = out;
                best_x = x_try, best_y = y_try;
                transition_count++;
            }
        }
        var result = forwardMultiplyGate(best_x,best_y);
        var verdict = base.assertCloseEnough(result,-5.9,0.1);
        show( verdict, result.toFixed(4) + " with " + transition_count + " of 100 loops", "randomLocalSearchTest"); 

    },
    forwardCircuitTest : function() {
        var x = -2, y = 5, z = -4;
        var f = forwardCircuit(x, y, z); // output is -12
        var verdict = base.assertEquals(f,-12);
        show(verdict,f,"forwardCircuitTest");
    },
 
    chainRuleTest : function() {
        // initial conditions
        var x = -2, y = 5, z = -4;
        var q = forwardAddGate(x, y); // q is 3
        var f = forwardMultiplyGate(q, z); // output is -12
 
        // gradient of the MULTIPLY gate with respect to its inputs
        // wrt is short for "with respect to"
        var derivative_f_wrt_z = q; // 3
        var derivative_f_wrt_q = z; // -4
 
        // derivative of the ADD gate with respect to its inputs
        var derivative_q_wrt_x = 1.0;
        var derivative_q_wrt_y = 1.0;
 
        // chain rule
        var derivative_f_wrt_x = derivative_q_wrt_x * derivative_f_wrt_q; // -4
        var derivative_f_wrt_y = derivative_q_wrt_y * derivative_f_wrt_q; // -4
        //That's it. We computed the gradient (the forces) and now we can let our
        //inputs respond to it by a bit. Lets add the gradients on top of the inputs.
        //The output value of the circuit better increase, up from -12!
 
        // final gradient, from above: [-4, -4, 3]
        var gradient_f_wrt_xyz = [derivative_f_wrt_x, derivative_f_wrt_y, derivative_f_wrt_z];
 
        // let the inputs respond to the force/tug:
        var step_size = 0.01;
        x = x + step_size * derivative_f_wrt_x; // -2.04
        y = y + step_size * derivative_f_wrt_y; // 4.96
        z = z + step_size * derivative_f_wrt_z; // -3.97
 
        // Our circuit now better give higher output:
        var q = forwardAddGate(x, y); // q becomes 2.92
        var f = forwardMultiplyGate(q, z); // output is -11.5924, up from -12! Nice!
 
//        console.log("Result: " + f );
        var verdict = base.assertEquals(f, -11.5924);
        show(verdict,f + " up from -12!","chainRuleTest" );
    },
 
    numericalGradientCheckTest : function() {
        //Numerical Gradient Check. Before we finish with this section,
        //lets just make sure that the (analytic) gradient we computed
        //by backprop above is correct as a sanity check.
        //Remember that we can do this simply by computing the
        //numerical gradient and making sure that we get [-4, -4, 3]
        //for x,y,z. Here's the code:
       
        // initial conditions
        var x = -2, y = 5, z = -4;
 
        // numerical gradient check
        var h = 0.0001;
        var x_derivative = (forwardCircuit(x+h,y,z) - forwardCircuit(x,y,z)) / h; // -4
        var y_derivative = (forwardCircuit(x,y+h,z) - forwardCircuit(x,y,z)) / h; // -4
        var z_derivative = (forwardCircuit(x,y,z+h) - forwardCircuit(x,y,z)) / h; // 3


        var fuzz = 0.001;
        var verdictX = base.assertCloseEnough(x_derivative,-3.99999,fuzz);
        var verdictY = base.assertCloseEnough(y_derivative,-3.99999,fuzz);
        var verdictZ = base.assertCloseEnough(z_derivative,3.00000,fuzz);
        show( verdictX, "x_derivative: " + x_derivative.toFixed(4), "numericalGradientCheckTest");
        show( verdictY,"y_derivative: " + y_derivative.toFixed(4), "numericalGradientCheckTest");
        show( verdictZ,"z_derivative: " + z_derivative.toFixed(4), "numericalGradientCheckTest");
         /*
        var isOk = true;
        if ( x_derivative.toFixed(0) !== -4 ) {
            isOk = false;
            console.log("\t\tBOO x_derivative: " + x_derivative) ;         
        } else {
            console.log("\t\tYAY x_derivative: " + x_derivative) ;         
        }
        if ( y_derivative !== -4 ) {
            isOk = false;
            console.log("\t\tBOO y_derivative: " + y_derivative) ;         
        } else {
            console.log("\t\tYAY y_derivative: " + y_derivative) ;         
        }
        if ( z_derivative !== 3 ) {
            isOk = false;
            console.log("\t\tBOO z_derivative: " + z_derivative) ;         
        } else{
            console.log("\t\tYAY z_derivative: " + z_derivative) ;         
        }
        var verdict = isOk ? "PASS" : "FAIL";
        console.log("numericalGradientCheckTest " + verdict );
 */
    },
};

////////////// Boiler plate follows /////////

UnitBase = require("./UnitBase").UnitBase;
var base = new UnitBase();
var forwardMultiplyGate = require("./NeuralNet").forwardMultiplyGate;
var forwardAddGate = require("./NeuralNet").forwardAddGate;
var forwardCircuit = require("./NeuralNet").forwardCircuit;


new TestLogic(); // Hit the constructor
